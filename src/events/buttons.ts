import { ButtonInteraction } from 'discord.js';
import { event, Events } from '../utils/index.js';
import schema from '../utils/Schemas/files.js';

async function ecoRegister(interaction: ButtonInteraction){

}

export default event(Events.InteractionCreate, async ({ log }, interaction) => {
    if(!interaction.isButton()) return;

	const { customId } = interaction;

	switch(customId){
		case "eco-register":
			await ecoRegister(interaction);
		break;
		default:
			await interaction.reply("No code for this button (yet).");
		break;
	}
})