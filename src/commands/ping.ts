import { EmbedBuilder, type Client, type Message } from 'discord.js';
import mongo from 'mongoose';

async function checkLatency() {
    const startTime = Date.now();
    await mongo.connection.db.command({ ping: 1 });
    const latency = Date.now() - startTime;
    return latency;
}

export default {
    name: "ping",
    aliases: ["p"],
    description: "Replies with pong",
    owner: false,
    enabled: true,
    permissions: [],
    category: "general",
    execute: async (client: Client<boolean>, message: Message<boolean>, _args: string[]) => {
        const ping = client.ws.ping;
        const dbPing = await checkLatency();
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "Ping",
                iconURL: client.user?.displayAvatarURL()
            })
            .setColor("DarkAqua")
            .addFields(
                { name: "Websocket", value: `\`${ping}ms\``, inline: true },
                { name: "Database", value: `\`${dbPing}ms\``, inline: true }
            );
        return message.channel.send({
            embeds: [embed]
        });
    }
}