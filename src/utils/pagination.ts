import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"

export function Pagination(page: number, maxPages: number){
	const ActionRow = new ActionRowBuilder<ButtonBuilder>();
	const stats = new ButtonBuilder()
        .setLabel(`${page}/${maxPages}`)
        .setCustomId("none")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true) 
    const back = new ButtonBuilder()
        .setEmoji("⏪")
        .setCustomId("back")
        .setStyle(ButtonStyle.Secondary)

    const forth = new ButtonBuilder()
		.setCustomId("forth")
		.setStyle(ButtonStyle.Secondary)
		.setEmoji("⏩")

	ActionRow.addComponents(back, stats, forth);

	return ActionRow;
}

export function getPageValues(paginationArray: any[], page: number, itemsPerPage: number) {
    const totalItems = paginationArray.length;
    const startIndex = (page - 1) * itemsPerPage; 
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems); 

    const pageItems = paginationArray.slice(startIndex, endIndex); 

    return pageItems;
}
