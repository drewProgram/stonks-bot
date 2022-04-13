const { Client, Intents, Collection } = require('discord.js');
const fs = require('node:fs');
const dotenv = require('dotenv');
const path = require('node:path');

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', c => {
    console.log(`Logged in as ${c.user.tag}`);
});

// Collection extends JS' native Map class
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const command = require(path.join(__dirname, 'commands', file));
    // Set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try
    {
        await command.execute(interaction);
    }
    catch (error)
    {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
