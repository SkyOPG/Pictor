import { event, Events } from '../utils/index.js';

export default event(Events.InteractionCreate, async ({ log }, interaction) => {
    if(!interaction.isAnySelectMenu()) return;

})