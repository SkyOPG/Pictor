import { ChatInputCommandInteraction } from 'discord.js';
import { event, Events } from '../utils/index.js';

export default event(Events.InteractionCreate, async ({ log }, interaction) => {
    if(!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

})