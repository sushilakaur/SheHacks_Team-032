require('dotenv').config();
const Discord = require("discord.js");
const bot = new Discord.Client();
var Filter = require('bad-words');
const { prefix } = require('./config.json')

const command = require('./command')
filter = new Filter();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on('ready',() => {
     console.log(`logged in as ${bot.user.tag}!`);
});

bot.on('message',msg =>{
   if(msg.content === 'ping')
   {
      msg.reply('pong');
      console.log("successfully replied");
   }

});
bot.on('message',msg =>{
    console.log(filter.isProfane(msg.content));
    if(filter.isProfane(msg.content )){
        msg.delete().then(msg =>{
            msg.channel.send(`Hey there ${msg.author} please refrain from such language`);
        })
        
        
    }
  });
  //Command to report
  command(bot, 'report', (message) => {
    const { member, mentions } = message
    message.author.send(`Hey! ${message.author} please provide us a detailed report on what's wrong.`)
    message.author.send("https://forms.gle/MwJu533zcRWZ7vgN6");
  })