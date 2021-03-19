import { Group } from "../entities/Group.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { GroupResponse } from "../responses/Group.response";
import { GroupInput } from "../inputs/Group.input";
import { ContextType } from "../types/types";
import { GroupType } from "../entities/GroupType.entity";
import { FieldError } from "../responses/FieldError";
import { User } from "../entities/User.entity";


@Resolver()
export class GroupResolver {
    @Query(() => [Group], {nullable: true})
    async getMyGroups(
        @Ctx() {req} : ContextType
    ) : Promise<Group[] | null>{
        if(!req.session.userId){
            return null;
        }

        const myGroups = await getConnection()
                            .createQueryBuilder()
                            .select("group")
                            .from(Group, "group")
                            .where("group.ownerId = :id", {id: req.session.userId})
                            .getMany()

        return myGroups ? myGroups : null;
    }


    @Query(() => [Group], {nullable:true})
    async getLatest() : Promise<Group[]> {
        const groups = await getConnection()
                        .createQueryBuilder()
                        .select("group")
                        .from(Group, "group")
                        .orderBy("group.creationDate")
                        .limit(50)
                        .getMany()

        return groups;
    }

    @Query(() => Group)
    async getGroup(
        @Arg('uuid') uuid : string
    ) : Promise<Group | null > {

        const group = await getConnection()
                        .createQueryBuilder(Group, "group")
                        .leftJoinAndSelect("group.type", "type")
                        //.select("group")
                        //.from(Group, "group")
                        .where("group.uuid = :uuid", {uuid : uuid})
                        .getOne();

        console.log(group);

        return group !== undefined ? group : null;
    }

    @Mutation(() => GroupResponse)
    async addGroup(
        @Arg('groupdata') groupdata : GroupInput,
        @Ctx() {req} : ContextType
    ) : Promise<GroupResponse | null>{
        if(!req.session.userId){
            return null;
        }

        const errors : FieldError[] = [];

        // Check if the GroupType is correct.
        const groupType = await getConnection()
                            .getRepository(GroupType)
                            .createQueryBuilder("grouptype")
                            .where(
                                "grouptype.id = :typeid",{typeid: groupdata.type}
                            )
                            .getOne();
        if(groupType === undefined){
            return {
                errors: [{
                    field: "type",
                    message:"That chat app does NOT exist"
                }]
            }
        }

        if(groupdata.name === undefined || !(groupdata.name.length > 3 && groupdata.name.length < 26)){
            errors.push({
                field: "name",
                message:"The group name must be over 3 characters and under 26"
            })
        }

        if(groupdata.inviteLink === undefined || groupdata.inviteLink.length < 3){
            // TODO: add regex
            errors.push({
                field: "inviteLink",
                message:"Please enter a valid invitation link"
            })
        }

        if(groupdata.description === undefined ||
            (groupdata.description.length < 10 || groupdata.description.length > 500)){
            errors.push({
                field: "description",
                message:"Description must be over 10 characters and under 500"
            })
        }

        if(groupdata.nsfw === undefined){
            errors.push({
                field: "nsfw",
                message:"Select if your group accepts or not nsfw content"
            })
        }

        if(errors.length > 0){
            return {
                errors: errors
            };
        }

        // Get the user...
        const user      = await getConnection()
                            .getRepository(User)
                            .createQueryBuilder("user")
                            .where(
                                "user.id = :id",{id: req.session.userId}
                            )
                            .getOne()
        if(user === undefined){
            return null;
        }

        // We now check the data :)
        const group = await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(Group)
                        .values(
                            {
                                name: groupdata.name,
                                inviteLink: groupdata.inviteLink,
                                description: groupdata.description,
                                groupImageUrl: groupdata.groupImageUrl,
                                nsfw: groupdata.nsfw,
                                type: groupType,
                                owner: user
                            }
                        
                        )
                        .returning("*")
                        .execute();
                            
        // We got the group
        if(group !== undefined){
            return{
                group: group.raw[0]
            };
        }

        return{
            errors: [{
                field:"name",
                message:"There was an error adding the group"
            }]
        };
                            
    }


}