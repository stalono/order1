const { addTokens } = require('../mongoose.js');

async function command(message) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
        const memberMention = message.content.split(' ')[2];
        const tokens = message.content.split(' ')[3];
        const member = await message.guild.members.fetch(memberMention.replace(/[<@>]/g, ''));
        if (tokens && !isNaN(tokens) && member.user) {
            addTokens(Number(member.user.id), tokens);
            await message.channel.send(`**Пользователь ${member.user.username} получил ${tokens} токенов**`);
        } else {
            await message.channel.send('**Вы не указали количество токенов**');
        }
    } else {
        const { adminNoRulesMesssage } = require('../json/config.json');
        await message.reply({content: adminNoRulesMesssage, ephemeral: true }).catch(error => {console.log(error)});
    }
}

module.exports = { command };