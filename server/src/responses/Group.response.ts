import { Group } from "../entities/Group.entity";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class GroupResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => Group, {nullable: true})
    group?: Group;
}