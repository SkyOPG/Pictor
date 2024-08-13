import { EmbedBuilder } from 'discord.js';
const answers: string[] = ["yes", "no", "maybe"];

export default {
    name: "8ball",
    owner: false,
    permissions: [],
    aliases: [],
    enabled: true,
    category: "fun",
    async execute(client, message, args) {
        const randomPick = answers[Math.floor(Math.random() * answers.length)];
        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('8ball')
                    .setDescription(`you asked for: \`${args.join(" ").replace("8ball ", "")}\`\nthe answer: ||${randomPick}||`)
                    .setColor('Random')
            ]
        });
    }
}