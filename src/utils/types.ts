import { Client, Message } from "discord.js";

export interface Command {
    name: string;
    description: string;
    aliases: string[] | never[];
    owner: boolean;
    permissions: string[];
    enabled: boolean;
    category: string;
    cooldown: number;
    execute: (client: Client<true>, message: Message<true>, args: string[]) => Promise<Message<true>>;
}