/* 
By OuoMen
	OuoMen.IR	
	GitHub.com/MobinOuO
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
    GatewayIntentBits.GuildMessages,
  ]
})
client.on('ready', async () => {
  console.log(`Bot Connect Shod Ba Username : ${client.user.tag}!`);
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
  const setBotStatus = async () => {
    try {
      const onlinePlayers = await getOnlinePlayers();
      client.user.setActivity(`${onlinePlayers} Bazikon Dar Server Ast`);
    } catch (error) {
      console.log('Khata:', error);
    }
  };
  setInterval(setBotStatus, 1000); // 1sec
});
client.login(config.BOT_TOKEN);