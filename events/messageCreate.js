const fs = require('node:fs');
const path = require('node:path');
const { toModel, insertNew, registerUser } = require('../mongoose.js');
const { userSchema } = require('../schemas/user-schema.js');
const { adminEmbed } = require('../embeds/admin-embed.js');

module.exports = {
	name: 'messageCreate',
	execute(message) {
        const { tokensPerMessage } = require('../json/config.json');
        registerUser(message.author.id).then((user) => {
            user.tokens += Number(tokensPerMessage);
            user.save();
        });
        const commands = [];
        const commandsPath = path.join(process.cwd(), 'basic-commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const commandFile of commandFiles) {
            const commandName = commandFile.split('.')[0];
            if (message.content.startsWith(`admin ${commandName}`)) {
                const { command } = require(path.join(commandsPath, commandFile));
                (async () => {
                    try {
                        await command(message);
                    } catch (error) {
                        console.log(error);
                    }
                })();
            } else if (message.content == `admin`) {
                message.channel.send({ embeds: [adminEmbed] }).catch(error => {console.log(error)});
                break;
            }
        }
	},
};