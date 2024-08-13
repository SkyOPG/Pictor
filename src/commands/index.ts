import { Collection } from 'discord.js';
import ping from './ping.js';
import cookie from './cookie.js';
import bal from './bal.js';
import ball from './ball.js';
import evalcmd from './eval.js';
import filecmd from './file.js';
import help from './help.js';
import hangman from './hangman.js';
import snake from './snake.js';

const arr: Array<any> = [
    ping,
    cookie,
    bal,
    ball,
    evalcmd,
    filecmd,
    help,
    snake,
    hangman
]

const file: any = {
    commands: new Collection(),
    aliases: new Collection(),
    cooldowns: new Collection(),
    information: new Collection()
} 

arr.forEach((val) => {
    const information = {
        name: val.name,
        aliases: val.aliases,
        permissions: val.permissions
    };
    if(!file.information.get(val.name))
        file.information.set(val.name, information);
    if(!file.commands.get(val.name))
        file.commands.set(val.name, val);
    val.aliases.forEach((element: any) => {
        if(!file.aliases.get(element))
            file.aliases.set(element, val)
        if(!file.information.get(element))
            file.information.set(element, information);
    });
});

export default file;