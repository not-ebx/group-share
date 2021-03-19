import { Field, ObjectType, Int } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";


@ObjectType()
@Entity()
export class LocalAuth {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({nullable: false})
    password!: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}