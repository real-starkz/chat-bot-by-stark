const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express()
const port = 3000
const chat = require("./chat");
let chatty = [];
client.on('ready', () => {
      console.log('Bot is Online')
});
app.get('/', (req, res) => {
  res.send('Bot is Online')
})

app.listen(port, () => {
  console.log(`bot is listening at http://localhost:${port}`)
})
client.on("message", message => {
let channel = (process.env.channel_id);
if (!message.author.bot && message.channel.id == channel) {
if(message.author.id === client.user.id) return;
    let msg = message.content || "Hi";
    message.channel.startTyping();
    chat(msg, chatty).then(reply => {
      message.channel.stopTyping();
      message.channel.send(`${reply}`);

      chatty.push(msg);
      chatty.push(reply);
    });
  }
});
client.login(process.env.TOKEN);