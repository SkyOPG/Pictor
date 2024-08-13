import { ErrorEmbed } from '../utils/errors.js';
import economy from '../utils/Schemas/economy.js';
import { EmbedBuilder } from 'discord.js';

export default {
    name: 'stars',
    description: "Shows your Star Economy stats",
    aliases: ['bal', 'balance'],
    owner: false,
    permissions: ["SendMessages"],
    enabled: true,
    category: "economy",
    async execute(client, message, args){
        let user;
         user = message.author
        const data: any = await economy.model.findOne({ User: user.id })
        const error = ErrorEmbed(client, "ECO403", "Unauthorized, please create an account first!");
        if(!data) return message.channel.send({ embeds: [error] })

        const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s Balance`)
        .addFields({ name: 'Stars', value: `\`\`\`\n${data.Stars}\n\`\`\`` },
                   { name: 'Tokens', value: `\`\`\`\n${data.Tokens}\n\`\`\`` },
                   { name: 'Power', value: `\`\`\`\n${data.Power}\n\`\`\`` },
                   { name: 'Hunger', value: `\`\`\`\n${data.Food}\n\`\`\`` })
        .setColor('Blue')

        message.channel.send({ embeds: [embed] })
    }
}