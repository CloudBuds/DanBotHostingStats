const Discord = require("discord.js");
exports.run = (client, message, args) => {
    if (!message.member.roles.cache.find((r) => r.id === "898041751099539497")) {
        return message.reply(`🚧 | You do not have permission to use this command.`);
    }

    let prefix = config.DiscordBot.prefix;

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} | Purge`, client.user.avatarURL())
        .addField(`❓ | Usage:`, `> ${prefix}purge <amount> <@someone>`)
        .addField(`💡 | Example:`, `> ${prefix}purge 20 @user`)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp();

    if (!args[0]) return message.reply(embed);

    let user = message.mentions.users.first();
    let amount = !!parseInt(message.content.split(" ")[2])
        ? parseInt(message.content.split(" ")[2])
        : parseInt(message.content.split(" ")[1]);

    if (!amount) return message.reply(embed);
    if (isNaN(amount)) return message.reply(embed);
    if (!amount && !user) return message.reply(embed);

    if (amount < 1 || amount > 99) return message.reply(`💡 | Specify a **number** between **1-99** to delete.`);

    message.channel.messages.fetch({ limit: amount }).then((messages) => {
        if (user) {
            const filterBy = user ? user.id : client.user.id;
            messages = messages
                .filter((m) => m.author.id === filterBy)
                .array()
                .slice(0, amount + 1);
        }

        message.channel.bulkDelete(messages, true).catch((error) => {
            return message.reply(`\`\`\`js\n${error}\`\`\``);
        });
        message.reply(`✅ | Succesfully purged **${amount}** messages.`);

        const success = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} | Purge`, client.user.avatarURL())
            .addField(
                `💡 | Info:`,
                `> Moderator: **${message.author.tag}**\n> Amount: **${amount}**\n> Channel: ${message.channel}`
            )
            .setThumbnail("https://cdn.discordapp.com/emojis/860696522659463199.png?v=1")
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp();
        return client.channels.cache.get(config.DiscordBot.modLogs).send({ embed: success });
    });
};
