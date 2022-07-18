const { SlashCommandBuilder } = require('@discordjs/builders');
const { helpEmbed } = require('../embeds/help-embed.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Команды бота.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed], ephemeral: true }).catch(error => {console.log(error)});
	},
};