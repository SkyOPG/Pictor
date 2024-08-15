import {
    EmbedBuilder,
    ButtonBuilder, 
    ButtonStyle, 
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    BaseInteraction,
    StringSelectMenuInteraction,
    ButtonInteraction,
    Message,
    APIEmbedField,
    Client
} from 'discord.js';
import file from './index.js';
import { getPageValues, Pagination } from '../utils/pagination.js';
import { SelectMenu } from '../utils/selectmenu.js';
import axios from 'axios';

function LoadCommands(file: any){
    const arr: APIEmbedField[] = [];
    file.commands.map((value, index, array) => {
        console.log(value)
        const btest = {name: `${value.name !== "" ? value.name : "NA"}`, value: `> Aliases: \`${value.aliases.length !== 0 ? value.aliases.join(", ") : "none"}\`\n> Permissions: \`${value.permissions.length !== 0 ? value.permissions.join(", ") : "none"}\``, inline: true}
        arr.push(btest);
    })
    return arr;
}

function HelpMenu(item: number){
    const items = [
        new StringSelectMenuOptionBuilder()
            .setEmoji("🏠")
            .setLabel("Home")
            .setDescription("The help main menu.")
            .setValue("home"),
        new StringSelectMenuOptionBuilder()
            .setEmoji("📃")
            .setLabel("All Commands")
            .setDescription("A list of all the commands")
            .setValue("all")
    ];

    return SelectMenu(items, items[item], { customId: "helpmenu", placeholder: "Choose something.", disabled: false })
}

export default {
    name: 'help',
    aliases: ['h'],
    permissions: ["SendMessages"],
    enabled: true,
    owner: false,
    async execute(client: Client<true>, message: Message<true>, args: string[]){
        const githubApiBaseUrl = 'https://api.github.com';
        const repo = 'SkyOPG/Pictor';
        const response = await axios.get(`${githubApiBaseUrl}/repos/${repo}`);
        const { stargazers_count } = response.data;
        if(args[0]){
            const command = args[0];
            let thing = file.commands.get(command);
            if(!thing){
                const alias = file.aliases.get(command);
                if(!alias)
                    return message.reply("No command found with name: "+command);
                thing = alias;
            }
            if(thing.subcommands)
                return;

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `${thing.name}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setDescription(`${thing.description}`)
                .addFields(
                    { name: "Cooldown", value: `> ${thing.cooldown ? thing.cooldown : 3}s` },
                    { name: "Permissions", value: `> ${thing.permissions.length > 0 ? thing.permissions.join("\n> ") : "none"}` },
                    { name: "Aliases", value: `> ${thing.aliases.length > 0 ? thing.aliases.join("\n> ") : "none"}` },
                    { name: "Category", value: `> ${thing.category}` }
                )
                .setColor("DarkAqua");
            
            return message.reply({
                embeds: [embed]
            });
        }
        const arr: APIEmbedField[] = LoadCommands(file);
        
        let page = 1;
        let currentlyAt = 0;

        const ovr = new EmbedBuilder()
        .setAuthor({
            name: "Help",
            iconURL: client.user.displayAvatarURL()
        })
        .setColor("DarkAqua")
        .setDescription("Hello! I'm Pictor, a multipurpose discord bot with the goal of being a cool, clean and useful bot for every type of server in this platform, i'm currently at a public test phase!"
            +"\n\n**Stats**\n"
            +`> Commands: \`${file.commands.size}\`\n`
            +`> Aliases: \`${file.aliases.size}\`\n`
            +`> Users: \`${client.users.cache.size}\`\n`
            +`> Servers: \`${client.guilds.cache.size}\`\n`
            +`> NodeJS: \`${process.version}\`\n`
            +`> Stars: \`${stargazers_count}\`\n`)
        .setFooter({
            text: "Made with 🤍 using Discord.JS",
            iconURL: "https://cdn.discordapp.com/attachments/1128839554447716382/1129221123024900096/javascript-g698e8f30f_640.png"
        });
		const msg: Message<true> = await message.channel.send({
			embeds: [ovr],
            components: [HelpMenu(0)]
		});
        const collector = msg.createMessageComponentCollector({ 
            filter: (i) => i.user && i.message.author.id == client.user.id,
            time: 180e3 
        });
        collector.on("collect", async (b: BaseInteraction) => {
            if(b.isStringSelectMenu())
                switch(b.values[0]){
                    case "home":
                        currentlyAt = 0;
                        await msg.channel.messages.cache.get(msg.id)!.edit({ embeds: [ovr], components: [HelpMenu(currentlyAt)]}).catch(() => {});
                        b.deferUpdate().catch(() => {});
                    break;
                    case "all":
                        currentlyAt = 1;
                        await msg.edit({ embeds: [new EmbedBuilder().setAuthor({ name: "All Commands", iconURL: client.user.displayAvatarURL() })
                            .addFields(getPageValues(arr, page, 6))
                            .setColor("DarkAqua")], components: [HelpMenu(currentlyAt), Pagination(page, Math.ceil(arr.length / 6))]}).catch(() => {})
                        b.deferUpdate().catch(console.error);
                    break;
                }
            if(b.isButton())
                switch(b.customId){
                    case "forth":
                        if(page + 1 > Math.ceil(arr.length / 6)){
                            b.reply({
                                content: "You can't go further, sorry.",
                                ephemeral: true
                            })
                            break;
                        }
                        page++;
                        
                        await msg.edit({ embeds: [new EmbedBuilder()
                            .setAuthor({ name: "All Commands", iconURL: client.user.displayAvatarURL() })
                            .addFields(getPageValues(arr, page, 6))
                            .setColor("DarkAqua")], components: [HelpMenu(currentlyAt), Pagination(page, Math.ceil(arr.length / 6))]}).catch(() => {})
                        b.deferUpdate().catch(() => {});
                    break;
                    case "back":
                        if(page - 1 < 1){
                            b.reply({
                                content: "You can't go further, sorry.",
                                ephemeral: true
                            })
                            break;
                        }
                        page--;

                        await msg.edit({ embeds: [new EmbedBuilder()
                            .setAuthor({ name: "All Commands", iconURL: client.user.displayAvatarURL() })
                            .addFields(getPageValues(arr, page, 6))
                            .setColor("DarkAqua")], components: [HelpMenu(currentlyAt), Pagination(page, Math.ceil(arr.length / 6))]}).catch(() => {})
                        b.deferUpdate().catch(() => {});
                    break;
                }
            return;
        });
}       
    }