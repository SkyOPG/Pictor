import economy from '../../utils/Schemas/economy.js';
import { Client, EmbedBuilder, Message } from 'discord.js';
import { handleEconomyErrors } from './util.js';

export default {
    name: 'stars',
    description: "Shows your Star Economy stats",
    aliases: ['bal', 'balance'],
    owner: false,
    permissions: ["SendMessages"],
    enabled: true,
    category: "economy",
    async execute(client: Client<true>, message: Message<true>, args: string[]){
        let user = message.author || message.mentions.users.first();
        const data: any = await economy.model.findOne({ User: user.id })
        const error = handleEconomyErrors(data, "stars");
        if(error) return message.channel.send({ embeds: [error] })

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

