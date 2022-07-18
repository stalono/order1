const fs = require('node:fs');
const path = require('node:path');
const { configEmbed } = require('../embeds/config-embed.js');

async function command(message) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
        if (message.content.split(' ').length === 4) {
            const parameter = message.content.split(' ')[2];
            const value = message.content.split(' ')[3];
            if (parameter && value) {
                const config = require('../json/config.json');
                if (Object.keys(config).includes(parameter)) {
                    config[parameter] = value;
                    fs.writeFileSync(path.join(process.cwd(), 'json', 'config.json'), JSON.stringify(config));
                    await message.channel.send(`**Значение ${parameter} изменено на ${value}**`);
                } else {
                    await message.channel.send('**Параметр не найден**');
                }
            }
        } else {
            await message.channel.send({ embeds: [configEmbed] }).catch(error => {console.log(error)});
        }
    } else {
        const { adminNoRulesMesssage } = require('../json/config.json');
        await message.reply({content: adminNoRulesMesssage, ephemeral: true }).catch(error => {console.log(error)});
    }
}

module.exports = { command };