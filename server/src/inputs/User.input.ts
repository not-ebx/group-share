import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInput {
    @Field({nullable: false})
    username!: string;

    @Field({nullable: false})
    email!: string;

    @Field({nullable: false})
    password!: string;
}

@InputType()
export class UserLoginInput {
    @Field({nullable: false})
    loginid!: string;

    @Field({nullable: false})
    password!: string;
}