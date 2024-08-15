import { ModalSubmitInteraction } from 'discord.js';
import { event, Events } from '../utils/index.js';
import schema from '../utils/Schemas/files.js';
import { handleEconomyErrors } from '../commands/economy/util.js';

async function fileModal(interaction: ModalSubmitInteraction){
	const code = interaction.fields.getTextInputValue('code');
	const file = interaction.fields.getTextInputValue('file');
	const data: any = await schema.model.findOne({ Filename: file, Owner: interaction.user.id });
	const errors = handleEconomyErrors(data, "file-edit");
	if(errors) return await interaction.reply({ embeds: [errors], ephemeral: true })
	data.FileData.Code = code;
    await data.save();
	await interaction.reply({ content: "Saved!", ephemeral: true });		
}

export default event(Events.InteractionCreate, async ({ log }, interaction) => {
    if(!interaction.isModalSubmit()) return
	switch(interaction.customId){
		case "modal-edit-file":
			await fileModal(interaction);
		break;
		default:
			await interaction.reply("No code for this modal (yet).");
		break;
	}
})