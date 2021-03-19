import { Field, InputType } from "type-graphql";

@InputType()
export class GroupInput {
    @Field({nullable: false})
    name: string;

    @Field({nullable: false})
    inviteLink: string;

    @Field({nullable: false})
    description: string;

    @Field({nullable: true})
    groupImageUrl?: string;

    @Field({nullable: false})
    nsfw: boolean

    @Field({nullable: false}) // 1 - Telegram; 2- WhatsApp; 3 - Signal
    type: number;
}    