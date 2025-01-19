const { Events, PermissionsBitField } = require('discord.js');
const rhymes = require('rhymes');

const messageCreate = {
	name: Events.MessageCreate,
	once: false,
	async execute(message) {
		try {
			if (message.author.bot) return;

			if (message.content.length === 4) {
				const lastLetter = message.content[3];
				if (message.content.toLowerCase().endsWith(`in${lastLetter.toLowerCase()}`)) {
					await message.channel.send(`${message.content[0]}on${lastLetter}`);
					return;
				} else if (message.content.toLowerCase().endsWith(`on${lastLetter.toLowerCase()}`)) {
					await message.channel.send(`${message.content[0]}in${lastLetter}`);
					return;
				}
			}

			if (message.content.split(' ').length === 1 && message.channel.id === '1070812701728710758') {
				const rhymingWords = rhymes(message.content);

				if (rhymingWords.length != 0) {
					await message.channel.send(rhymingWords[0].word);
				}
			}

			if (
				message.content.toLowerCase() === '/done'
				// and if user is has permission to manager the server (Admin/Board Member)
				&& message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
				&& message.channel.parentId === '1070529903369400420'
			) {
				// guild.channels.delete({ parent: '1070529903369400420' })
				await message.reply('This channel will be deleted in 3 seconds.');

				setTimeout(async () => {
					// how does it know which channel to delete? It deletes the channel message was sent in under the tutoring category only
					await message.channel.delete();
					console.log('Tutoring channel deleted.');
				}, 3000)// 3000 is 3 seconds
			}
		} catch (error) {
			console.log(error);
		}
	}
};

module.exports = messageCreate;
