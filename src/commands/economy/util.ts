import { QueryWithHelpers, EnforceDocument } from "mongoose";
import { ErrorEmbed } from "../../utils/errors.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
type model = QueryWithHelpers<EnforceDocument<unknown, {}> | null, EnforceDocument<unknown, {}>, {}, unknown>

export function handleEconomyErrors(model: model, commandName: string){
	if(!model)
		return ErrorEmbed("ECO403", "Unauthorized, please create an account first!")
	/*
	switch(commandName){
		default:
		break;
	}*/
}

export function registerButton(){
	const ActionRow = new ActionRowBuilder<ButtonBuilder>();

	const button = new ButtonBuilder()
		.setCustomId("eco-register")
		.setEmoji("🚪")
		.setLabel("Start!")
		.setStyle(ButtonStyle.Secondary);
	
	ActionRow.addComponents(button);

	return ActionRow;
}