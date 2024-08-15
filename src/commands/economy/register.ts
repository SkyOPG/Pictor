import economy from '../../utils/Schemas/economy.js';
import { Client, EmbedBuilder, Message } from 'discord.js';
import { handleEconomyErrors, registerButton } from './util.js';

export default {
    name: 'register',
    description: "register an account for star economy",
    aliases: ['signup', 'reg'],
    owner: false,
    permissions: ["SendMessages"],
    enabled: true,
    category: "economy",
    async execute(client: Client<true>, message: Message<true>, args: string[]){
        const embed = new EmbedBuilder()
        .setColor('DarkAqua')
		.setAuthor({
			name: "Registration",
			iconURL: client.user.displayAvatarURL()
		})
		.setDescription("Please click the button below to start the signup process!")
		const button = registerButton();

        message.channel.send({ embeds: [embed], components: [button] });
    }
}