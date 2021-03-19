import argon2 from "argon2";
import { LocalAuth } from "../entities/LocalAuth.entity";
import { User } from "../entities/User.entity";
import { UserLoginInput, UserRegisterInput } from "../inputs/User.input";
import { UserResponse } from "../responses/User.response";
import { verifyEmail, verifyUsername } from "../utils/UserVerify";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { ContextType } from "../types/types";
import { error } from "node:console";


@Resolver()
export class LocalAuthResolver {
    // Get the user's data
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req }: ContextType
    ) : Promise<User | null>{

        if(!req.session.userId){
            return null;
        }

        // There's an ID !!
        const user = await getConnection()
                        .createQueryBuilder()
                        .select("user")
                        .from(User, "user")
                        .where("user.id = :id", {id: req.session.userId})
                        .getOne();

        return user === undefined ? null : user;
    }



    @Mutation(() => UserResponse)
    async register(
        @Arg('userdata') userdata : UserRegisterInput,
        @Ctx() {req} : ContextType
    ) : Promise<UserResponse> {

        // First, verify the data.
        if(!verifyUsername(userdata.username) && userdata.username.length < 4){
            return{
                errors: [{
                    field:"username",
                    message:"Username may contain letters, numbers and underscores at the middle"
                }]
            };
        }

        if(!verifyEmail(userdata.email)){
            return{
                errors: [{
                    field:"email",
                    message:"E-mail is not correct. Use an actual email please."
                }]
            };
        }

        // Password should be longer than 5 characters
        if(userdata.password.length < 5) {
            return{
                errors: [{
                    field:"password",
                    message:"Password should be more than 5 characters"
                }]
            };
        }


        // Now, we begin to execute the data.
        // Check if the username exists
        const user = await getConnection()
                        .createQueryBuilder()
                        .select("user")
                        .from(User, "user")
                        .where("user.username = :newUser", {newUser: userdata.username})
                        .getOne();

        const userEmail = await getConnection()
                        .createQueryBuilder()
                        .select("user")
                        .from(User, "user")
                        .where("user.email = :newUser", {newUser: userdata.email})
                        .getOne();

        if(user !== undefined){
             return{
                errors: [{
                    field:"username",
                    message:"That username already exists"
                }]
            };           
        }
        if(userEmail !== undefined){
             return{
                errors: [{
                    field:"email",
                    message:"That E-mail already exists"
                }]
            };           
        }

        // Now, finally the registration phase.
        const hashedPassword = await argon2.hash(userdata.password);

        // First add the user, then the login.
        const newUser = await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(User)
                        .values({
                            username: userdata.username,
                            email: userdata.email
                        })
                        .returning("*")
                        .execute();

        if(newUser.raw.length > 0 && newUser.raw[0] !== undefined){
            // If it got created..
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(LocalAuth)
                .values({
                    password: hashedPassword,
                    user: newUser.raw[0]
                })
                .execute(); // -_-

            // When completed!
            req.session.userId = newUser.raw[0].id
            return {
                user: newUser.raw[0]
            };
        }
        else {
            return {
                errors: [{
                    field:"username",
                    message:"There was an error with the registration"
                }]
            }
        }

    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("userdata") userdata: UserLoginInput,
        @Ctx() {req}: ContextType
    ) : Promise<UserResponse> {
        const user = await getConnection()
                        .createQueryBuilder()
                        .select("user")
                        .from(User, "user")
                        .where(
                            (verifyEmail(userdata.loginid)
                            ? "user.email = :loginid"
                            : "user.username = :loginid"),
                            {loginid: userdata.loginid}
                        )
                        .getOne();


        if(user === undefined){
            return {
                errors: [{
                    field: "loginid",
                    message: "E-mail, username or password is incorrect"
                }]
            }
        }

        // Let's check the password!
        const authData = await getConnection()
                            .createQueryBuilder()
                            .select("login")
                            .from(LocalAuth, "login")
                            .where(
                                "login.userId = :id" , {id : user.id}
                            )
                            .getOne();

        if(authData !== undefined && await argon2.verify(authData.password, userdata.password)){
            // If the password is correct..
            req.session.userId = user.id;
            return {
                user: user,
            }
        }

        console.log(authData);
        
        return {
            errors: [{
                field: "loginid",
                message: "E-mail, username or password is incorrect"
            }]
        }
                            
    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() {req, res}: ContextType
    ){
        return new Promise( (resolver) =>
            req.session.destroy(
                (err) => {
                    res.clearCookie("sid");
                    if (err){
                        resolver(false)
                        return;
                    }
                    else{
                        resolver(true);
                        return;
                    }
                }
            )
        );
    }
    

}