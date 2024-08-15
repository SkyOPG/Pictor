import { Snake } from 'discord-gamecord';
import { EmbedBuilder, Message } from 'discord.js';
import { Command } from '../utils/types.js';
const foods = ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'];
function makeSnakeObject(message: Message<true>, slash: boolean, foods: string[]){
	return {
		message: message,
		isSlashGame: slash,
		embed: {
			title: "Snake",
			overTitle: "Dead",
			color: "DarkAqua",
			pfp: message.client.user.displayAvatarURL()
		},
		emojis: {
			board: '⬛',
			food: '🍎',
			up: '⬆️', 
			down: '⬇️',
			left: '⬅️',
			right: '➡️',
		},
		stopButton: "⏹️",
		timeoutTime: 60000,
		snake: { head: '👀', body: '🟩', tail: '🟢', over: '💀' },
		playerOnlyMessage: 'Only {player} can use these buttons.',
		foods
	}
}

function setupSnakeGame(options: Record<string, any>){
	return new Snake(options)
}

function handleDeath(result, client){
	return new EmbedBuilder() 
		.setAuthor({
			name: "Game Over",
			iconURL: client.user.displayAvatarURL()
		})
		.addFields({ name: "score", value: `\`\`\`\n${result.score}\n\`\`\`` })
		.setColor("DarkAqua") 
}

export default {
	name: "snake",
	aliases: [],
	owner: false,
	enabled: true,
	permissions: ["SendMessages"],
	cooldown: 60,
	async execute(client, message, args) {
		const options = makeSnakeObject(message, false, foods);
		const game = setupSnakeGame(options);
		
		game.startGame();
		game.on('gameOver', result => handleDeath(result, client));

		return {};
	},
} as Command;