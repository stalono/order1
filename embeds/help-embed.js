const { MessageEmbed } = require('discord.js');

const helpEmbed = new MessageEmbed()
    .setTitle('Команды бота')
    .addFields(
        { name: '/tokens', value: 'Количество токенов на ваше балансе' },
        { name: '/flip', value: 'Подкинуть монетку' },
        { name: '/roulet', value: 'Сыграть в рулетку' },
        { name: '/sendtokens', value: 'Перевсти токены другому игроку' },
    )
    .setColor('0xe91e63');

module.exports = { helpEmbed };