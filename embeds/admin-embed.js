const { MessageEmbed } = require('discord.js');

const adminEmbed = new MessageEmbed()
    .setTitle('Админ команды')
    .addFields(
        { name: 'add_tokens (игрок) (количество)', value: 'Выдать токены игроку' },
        { name: 'remove_tokens (игрок) (количество)', value: 'Удалить токены у игрока' },
        { name: 'config (параметр) (значение)', value: 'Изменить конфигурацию бота' },
        { name: 'config', value: 'Получить список доступных параметров' },
        { name: 'Админ команды используются через admin', value: 'admin (команда) (параметры)' },
        { name: 'Например: ', value: 'admin add_tokens @Игрок 100\nadmin remove_tokens @Игрок 100' },
    )
    .setColor('0x992d22');

module.exports = { adminEmbed };