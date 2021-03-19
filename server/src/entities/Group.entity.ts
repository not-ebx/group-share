import { Field, ObjectType, Int } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { GroupType } from "./GroupType.entity";
import { Tag } from "./Tag.entity";
import { User } from "./User.entity";


@ObjectType()
@Entity()
export class Group {
    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    uuid!: number;

    @Field(() => String)
    @Column({nullable: false, unique:false})
    name!: string;

    @Field(() => String)
    @Column({nullable: false, unique:true})
    inviteLink!: string;

    @Field(() => String)
    @Column({nullable: false, unique:false})
    description: string;

    @Field(() => String)
    @Column({default:"https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"})
    groupImageUrl: string;

    // you need to be 18+ to enter, a warning.
    @Field(() => Boolean)
    @Column({nullable: false})
    nsfw: boolean;

    @Field(() => Boolean)
    @Column({nullable: false, default:true})
    listed: boolean;

    @Field(() => String)
    @CreateDateColumn()
    creationDate!: Date;

    @Field(() => String)
    @CreateDateColumn()
    lastEditDate!: Date

    // People that have clicked the invitation. Can be farmed if not checked (IP Check ?)
    
    // Relationship
    @ManyToOne(() => User, user => user.groups)
    owner : User;

    @ManyToOne(() => GroupType, gtype => gtype.groups)
    @Field(() => GroupType)
    type: GroupType;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];

}