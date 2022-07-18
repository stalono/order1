const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getTokens } = require('../mongoose.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tokens')
		.setDescription('Количество ваших токенов.')
		.addUserOption(option =>
			option.setName('пользователь')
				.setDescription('Пользователь которому вы желаете отправить токены.')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('пользователь');
		const id = user ? user.id : interaction.user.id;
		await getTokens(id).then(tokens => {
			interaction.reply({ embeds: [
				new MessageEmbed()
					.setTitle(`На вашем балансе:  ${tokens} токена(-ов) 🙂`)
					.setColor('0x2ecc71')
			], ephemeral: true }).catch(error => {console.log(error)});
		});
	},
};