const { MessageEmbed } = require('discord.js')

const configEmbed = new MessageEmbed()
    .setTitle('Конфигурация бота')
    .addFields(
        { name: 'tokensPerMessage', value: 'Токены за сообщение' },
        { name: 'Используйте: ', value: 'admin config параметр значение' },
        { name: 'Например: ', value: 'admin config tokensPerMessage 10' },
    )
    .setColor('0x95a5a6');

module.exports = { configEmbed };