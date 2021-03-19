import { Field, ObjectType, Int } from "type-graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group.entity";
import { User } from "./User.entity";


@ObjectType()
@Entity()
export class GroupType {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({nullable: false})
    providerName!: string; // Discord, Telegram, Whatsapp, Signal, Facebook, Slack

    @Field(() => String)
    @Column({nullable: true})
    regex: string;

    @OneToMany(() => Group, group => group.type)
    groups: Group[];

}