const cap = require("../../util/cap");
const exec = require("child_process").exec;
const Util = require('util');
const execPromise = Util.promisify(exec);

const Config = require('../../../config.json');
const MiscConfigs = require('../../../config/misc-configs.js');

exports.description = "Updates the bot from GitHub. Locked to Bot Administrators.";

/**
 * Update the bot from GitHub.
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array} args
 * @returns void
 */
exports.run = async (client, message, args) => {

    // Checks if the user has the Bot Administrator Role.
    if (!message.member.roles.cache.find((r) => r.id === Config.DiscordBot.Roles.BotAdmin)) return;

    console.log("Updating the bot from GitHub.");

        //Automatic GitHub Update (30 seconds intervals).
        setInterval(async () => {
            try {
                const { stdout } = await execPromise('git pull');
                    
                if (!stdout.includes("Already up to date.")) {
                    await client.channels.cache
                        .get(MiscConfigs.github)
                        .send(
                            `<t:${Math.floor(Date.now() / 1000)}:f> Automatic update from GitHub, pulling files.\n\`\`\`${stdout}\`\`\``,
                        );

                    await message.reply("Pulling files from GitHub.");

                    setTimeout(() => {
                        process.exit();
                    }, 1000);
                }
            } catch (error) {
                console.error(`Error with git pull: ${error.message}`);
            }
        }, 30000);
};
