import Discord from 'discord.js';
import dotenv from 'dotenv';

import config from './config.js';

import initMessages from './messages.js';

dotenv.config();
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

initMessages(client);

client.login(process.env.TOKEN);
