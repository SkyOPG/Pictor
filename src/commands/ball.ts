import { Client, EmbedBuilder, Message } from 'discord.js';
import { ErrorEmbed } from '../utils/errors.js';
const answers: string[] = ["yes", "no", "maybe", "possibly", "possibly not", "probably", "probably not", "ask another time", "uhh, my head hurts", "do i have to answer.."];

export default {
    name: "8ball",
    description: "A *totally* aware and wise 8 ball answers your questions",
    owner: false,
    permissions: [],
    aliases: [],
    enabled: true,
    category: "fun",
    async execute(client: Client<true>, message: Message<true>, args: string[]) {
        const error = ErrorEmbed("PIC422", "Field 'question' cannot be empty.")
        const randomPick = answers[Math.floor(Math.random() * answers.length)];
        if(!args[0])
            return message.channel.send({
                embeds: [error]
            })
        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: "8ball",
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setDescription(`you asked for: \`${args.join(" ").replace("8ball ", "")}\`\nthe answer: ||${randomPick}||`)
                    .setColor('DarkAqua')
            ]
        });
    }
}