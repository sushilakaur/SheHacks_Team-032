require('dotenv').config();
const Discord = require("discord.js");
const bot = new Discord.Client();
var Filter = require('bad-words');
const { prefix } = require('./config.json')


//MUSIC
var unirest = require("unirest");


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

  //Command to list music tracks
  command(bot,'mood-music',(message) =>{
    var lst=[];
    // client.on('message', message => {
     
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
message.channel.send("music soon")
var req = unirest("GET", "https://shazam.p.rapidapi.com/songs/list-recommendations");
message.channel.send(`Here is ${args} a  music list for you!!!`);
req.query({
	"key": "484129036",
	"locale": "en-US"
});

req.headers({
	"x-rapidapi-key": "fb31ae1b9bmsh02d85f7094a7dd0p1a15dbjsne615da4b83d2",
	"x-rapidapi-host": "shazam.p.rapidapi.com",
	"useQueryString": true
});

req.end(async (res) =>{
  try{
    
    //console.log(res.body);
    var tracks = await (res.body.tracks);
    
    for (var i = 0; i < tracks.length; i++){
      
    //message.send.channel(`${tracks[i].title}`);
    lst.push(tracks[i].title);
    //console.log(tracks[i].title);
    }
    console.log(lst); 
    message.channel.send(lst)

  }
  catch(e)
  {
     console.log(e.message);
  }
	
	
});
console.log(lst);
/*for (var i = 0; i < lst.length; i++){
  message.channel.send(`${lst[i]}`)
  //console.log(lst[i]);
}*/
});

