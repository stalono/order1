const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { userSchema } = require('../schemas/user-schema.js');
const { getTokens, removeTokens, addTokens } = require('../mongoose.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendtokens')
		.setDescription('Отправить токены другому пользователю.')
		.addUserOption(option =>
			option.setName('пользователь')
				.setDescription('Пользователь которому вы желаете отправить токены.')
				.setRequired(true))
        .addIntegerOption(option =>
            option.setName('количество')
                .setDescription('Количество токенов которое вы хотите отправить.')
                .setRequired(true)),
	async execute(interaction) {
        const sender = interaction.user;
        const amount = interaction.options.getInteger('количество');
        const receiver = interaction.options.getUser('пользователь');
        const senderTokens = await getTokens(sender.id);
        if (senderTokens < amount) {
            await interaction.reply('**У вас недостаточно токенов.**', ephemeral = true).catch(error => {console.log(error)});
        } else {
            removeTokens(sender.id, amount);
            addTokens(receiver.id, amount);
            interaction.reply({content: `**Вы усмешно отправили ${amount} токенов пользователю ${receiver.username}**`, ephemeral: true}).catch(error => {console.log(error)});
        }
	},
};