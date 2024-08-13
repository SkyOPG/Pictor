import type { Client, Message } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export default {
    name: "antispam",
    aliases: ["as"],
    owner: false,
    enabled: true,
    permissions: ["ManageMessages"],
    category: "moderation",
    execute: async (client: Client<boolean>, message: Message<true>, args: string[]) => {
        
        const { guild } = message;
        const rule = await guild.autoModerationRules.create(
            {
                name: `Prevent Spam messages by ${client.user?.username}`,
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetadata:
                {

                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            durationSeconds: 10,
                            customMessage: `This message was prevented by ${client.user?.username} moderation`
                        }
                    }
                ]

            }).catch(async err => {
                 await message.reply("your automod rule already exists!"); 
                })

        const embed = new EmbedBuilder()
          
        .setAuthor({name: `${message.guild?.name}`, iconURL: message.guild.iconURL() ?? ""})
        .setColor('#5865F2')
        .setFooter({text: `Created by: ${message.author.id}`})
        .setTimestamp();

      
            if (!rule) return;
          return await message.reply({ embeds: [embed] })
    }
}