import { Event } from '../utils/index.js';
import ready from './ready.js';
import message from './message.js';
import slash from './slash.js';
import buttons from './buttons.js';
import modals from './modals.js';
import menus from './menus.js';

export default [
    ready,
    message,
    slash,
    buttons,
    modals,
    menus
] as Event[];