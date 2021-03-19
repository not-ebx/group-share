import { Field, ObjectType, Int } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group.entity";


@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({nullable: false, unique:true})
    username!: string;

    @Field(() => String)
    @Column({nullable: false, unique:true})
    email!: string;

    @Field(() => String)
    @CreateDateColumn()
    joinDate!: Date;

    @Field(() => String)
    @CreateDateColumn()
    lastLogin!: Date;

    @OneToMany(() => Group, group => group.owner)
    groups: Group[];

}