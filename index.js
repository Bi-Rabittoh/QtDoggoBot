const Telegraf = require('telegraf');
const Keyboard = require('telegraf-keyboard');
const bot = new Telegraf("1127736283:AAGO0Ir_YMSTHgjdrI-y-9mJkjlq9xMcu1s");
const axios = require('axios');

var shownKeyboard = false;

//set start message
bot.start((message) => {
    console.log(message.from.id + " started");
    const options = {
        inline: false,
        duplicates: false,
        newline: false
    };
    const keyboard = new Keyboard(options);
    keyboard
    .add('I feel happy c:', 'A little bit sad :c')
    //.add("I feel happy in a new line")

    if(shownKeyboard == false){
        shownKeyboard = true;
        return message.reply("Howdy, how are you feeling today?", keyboard.draw());
    } else {
        return message.reply("Huh? Again? How are you feeling?");
    }
});

//set text listener
bot.on('text', message => {
    const text = message.message.text;

    if(text.toLowerCase().includes("sad")){
        //get request
        axios
            .get('https://random.dog/woof.json')
            .then(res => {
                console.log(res.data.url + " => " + message.from.id)
                message.reply(res.data.url);
                message.reply("How are you feeling now?");
                return;
            })
    }

    if(text.toLowerCase().includes("happy")){
        return message.reply("Good for you :3");
    }
});

//start polling
console.log("The bot is polling!");
bot.startPolling();