/* 
By OuoMen {
	OuoMen.IR	
	GitHub.com/MobinOuO
}
*/
const Discord = require("discord.js");
const config = require("./config.json");
const query = require('samp-query');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const serverOptions = {
  host: config.IP
};
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
})
let status = false; 
client.on('ready', async () => {
  console.log(`Bot Connect Shod Ba Username: ${client.user.tag}!`);
  const guildID = client.guilds.cache.first().id;
  // Register Slash Command
  try {
    const commands = await client.guilds.cache.get(guildID)?.commands.set([
      {
        name: 'help',
        description: 'Rahnamaye Kamel Bot'
      },
      {
        name: 'listplayers',
        description: 'List Tamam Bazikonan Online'
      },
	    {
        name: 'activity',
        description: 'ON va OFF kardan Activity Bot'
      }

    ]);
  }	catch (error) {
      await interaction.reply('Error');
    }
  const getOnlinePlayers = () => {
    return new Promise((resolve, reject) => {
      query(serverOptions, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.online);
        }
      });
    });
  };
const getAllPlyaers = () => {
  return new Promise((resolve, reject) => {
    query(serverOptions, (error, response) => {
      if (error) {
        reject(error);
      } else {
        const players = response.players.map((player) => ({
          name: player.name,
          id: player.id,
          ping: player.ping,
          score: player.score
        }));
        resolve(players);
      }
    });
  });
};
  const setBotStatus = async () => {
    try {
      const onlinePlayers = await getOnlinePlayers();
     client.user.setActivity(` Online Players :  ${onlinePlayers}`);
    } catch (error) {
      console.log('Khata:', error);
    }
  };
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
// Handel Slash Command
  if (commandName === 'listplayers') {
    try {
      const players = await getAllPlyaers();
      if (players != ""){
      let output = "ID - Name - Ping - Score\n";
      players.forEach((player) => {
        output += "`" + `${player.id} - ${player.name} - ${player.ping} - ${player.score}\n` + "`";
      });
      await interaction.reply(output);
    } else {
      await interaction.reply("Hich Playeri Dar Server Nist!!!");
    }
    } catch (error) {
      await interaction.reply('Error');
    }
  }
if (commandName === 'activity') {
  try {
    if (status == "undefined" || status == false) {
      setInterval(setBotStatus, 1000);
      await interaction.reply('Activity On Shod');
      status = true;
    } else {
      await client.user.setActivity(null);
      await interaction.reply('Activity OFF Shod');
      status = false; 
    }
  } catch (error) {
    await interaction.reply('Error');
  }
}
if (commandName === 'help') {
  try {
    await interaction.reply("Baraye Daryaft List Kamel Bazikon Ha Az `/onlineplayers` Estefadeh Konid \n\nBaraye Khamosh Va Roshan Kardan Tedad Bazikonan Online Dar Activity Bot Az `/activity` Estefadeh Konid.\n\n-1.2 Version By https://Ouomen.ir");
  } catch (error) {
    await interaction.reply('Error');
  }
}
});
});
client.login(config.BOT_TOKEN);
