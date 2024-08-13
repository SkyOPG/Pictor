import { Client, EmbedBuilder, Message } from "discord.js";

export default {
    name: "eval",
    description: "Evaluates given expressions, OWNER ONLY",
    owner: true,
    aliases: [],
    permissions: [],
    enabled: true,
    async execute(client: Client<true>, message: Message<true>, args: string[]){
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "Evaluation",
                iconURL: client.user.displayAvatarURL()
            });
        try {
            const evaluation = eval(args.join(" "));

            embed.addFields(
                { name: "Input", value: `\`\`\`js\n${args.join(" ")}\n\`\`\`` },
                { name: "Output", value: `\`\`\`js\n${evaluation}\n\`\`\`` }
            )
            .setColor("DarkAqua");
            return message.channel.send({
                embeds: [embed]
            });
        } catch(e) {
            embed.addFields(
                { name: "Input", value: `\`\`\`js\n${args.join(" ")}\n\`\`\`` },
                { name: "Error", value: `\`\`\`js\n${e}\n\`\`\`` }
            )
            .setColor("Red");
            return message.channel.send({
                embeds: [embed]
            })
        }
    }
}