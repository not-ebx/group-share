import { Field, ObjectType, Int } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group.entity";
import { User } from "./User.entity";


@ObjectType()
@Entity()
export class Tag {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({nullable: false, unique:true})
    label!: string; // Discord, Telegram, Whatsapp, Signal, Facebook, Slack

}