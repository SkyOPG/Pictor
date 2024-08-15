import { EmbedBuilder } from "discord.js";
import client from '../structs/client.js';

export function ErrorEmbed(name: string, reason: string){
	return new EmbedBuilder()
		.setAuthor({
			name: "Error",
			iconURL: client.user!.displayAvatarURL()
		})
		.setDescription(`Error \`${name}\`: ${reason}`)
		.setColor("Red");
}