import { ActionRowBuilder, APISelectMenuOption, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export function SelectMenu(items: StringSelectMenuOptionBuilder[], currentOption: StringSelectMenuOptionBuilder | null, Data: Record<string, any>){
	const ActionRow = new ActionRowBuilder<StringSelectMenuBuilder>();
	const optionData = currentOption?.toJSON();
	const stuff: StringSelectMenuOptionBuilder[] = [];
	items.forEach(v => {
		const json = v.toJSON();
		if(json.value === optionData?.value)
			v.setDefault(true);
		stuff.push(v);
	})
	const SelectMenu = new StringSelectMenuBuilder()
		.setCustomId(Data.customId)
		.setDisabled(Data.disabled)
		.setPlaceholder(Data.placeholder)
		.setOptions(stuff);
	
	ActionRow.addComponents(SelectMenu);

	return ActionRow;
}