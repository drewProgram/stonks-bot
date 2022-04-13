const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Um dia vai tocar música'),
    async execute(interaction)
    {
        await interaction.reply('Pong!');
    },
};
