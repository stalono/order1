const { SlashCommandBuilder } = require('@discordjs/builders');
const { getTokens, removeTokens, addTokens } = require('../mongoose.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Удвойте свою ставку с 50/50 шансом.')
        .addIntegerOption(option =>
            option.setName('ставка')
                .setDescription('Сумма ставки.')
                .setRequired(true)),
	async execute(interaction) {
		const bet = interaction.options.getInteger('ставка');
        const user = interaction.user;
        const userTokens = await getTokens(user.id);
        if (bet > userTokens) {
            await interaction.reply({content: '**У вас недостаточно токенов.**', ephemeral: true}).catch(error => {console.log(error)});
        } else {
            const random = Math.floor(Math.random() * 2);
            if (random === 0) {
                removeTokens(user.id, bet);
                const winEmbed = new MessageEmbed()
                    .setTitle('Вы проиграли!')
                    .setThumbnail('https://i.imgur.com/xpE3I8t.png')
                    .setColor('0x992d22')
                await interaction.reply({ embeds: [winEmbed], ephemeral: true }).catch(error => {console.log(error)});
            } else {
                addTokens(user.id, bet);
                const winEmbed = new MessageEmbed()
                    .setTitle('Вы выиграли!')
                    .setThumbnail('https://i.imgur.com/RPRy7Ts.png')
                    .setColor('0x2ecc71')
                await interaction.reply({ embeds: [winEmbed], ephemeral: true }).catch(error => {console.log(error)});
            }
        }
	},
};