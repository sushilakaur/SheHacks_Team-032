//-----required-------
require('dotenv').config();
const Discord = require("discord.js");
const bot = new Discord.Client();
var Filter = require('bad-words');
const { prefix } = require('./config.json')

//------getting started---------
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


const command = require('./command')
filter = new Filter();

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



var unirest = require("unirest");

command(bot,'uplift-mood',(message)=> {
     
  if (!message.content.startsWith(prefix) || message.author.bot) return;

     message.reply("Hey there! Don't Worry! We'll fix you're mood. Reply with <!mood-music> if you want to get music list. Reply with <!quote> if you want to get a quote ");

//-----------MUSIC-------------
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

//-----------Quotes-------------------
command(bot,'quote',(message) =>{
   
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    message.channel.send("Cheer up, Here's a quote for you!")

    var req = unirest("GET", "https://quotes15.p.rapidapi.com/quotes/random/");
    req.headers({
      "x-rapidapi-key": "4073fea9f6mshf06574363cc0648p1d54f5jsn669aab4abae2",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "useQueryString": true
    });
    

    req.end(async (res) =>{
      try{
        console.log(res.body); 
         message.channel.send(res.body)

      }
      catch(e)
      {
        console.log(e.message);
      }
      

    });
});

})








  
