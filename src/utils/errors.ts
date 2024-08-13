import { Client, EmbedBuilder } from "discord.js";

export function ErrorEmbed(client: Client<true>, name: string, reason: string){
	return new EmbedBuilder()
		.setAuthor({
			name: "Error",
			iconURL: client.user.displayAvatarURL()
		})
		.setDescription(`Error \`${name}\`: ${reason}`)
		.setColor("Red");
}