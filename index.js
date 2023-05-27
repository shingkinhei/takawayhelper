

// https://api.telegram.org/bot6249768743:AAFzuQMmhE5RJxfnGdiAoTc4Xn8cyiEoOHM/setWebhook?url=https://whatsapp-bot-test.onrender.com
// https://api.telegram.org/bot6249768743:AAFzuQMmhE5RJxfnGdiAoTc4Xn8cyiEoOHM/getWebhookInfo

const TelegramBot = require("node-telegram-bot-api");
// replace the value below with the Telegram token you receive from @BotFather
const token = "6249768743:AAFzuQMmhE5RJxfnGdiAoTc4Xn8cyiEoOHM";
const options = {
  webHook: {
    port: 443,
  },
};
const url =
  "https://api.telegram.org";
const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

const knex = require("knex");
const config = require("./knexfile");

const db = knex(config.development);
// sample for select 
db.select()
  .from("public.restaurants")
  .then((rows) => {
    console.log(rows);
  });

let restaurantOptions = [];

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  //start the bot
  bot.sendMessage(chatId, "Hello world");
  //start picking restaurant on 11:00 am
  timer = setInterval(() => {
    if (
      (new Date().getDay() === 1 ||
        new Date().getDay() === 2 ||
        new Date().getDay() === 3 ||
        new Date().getDay() === 4 ||
        new Date().getDay() === 6) &&
      new Date().getHours() === 10 &&
      new Date().getMinutes() === 51 &&
      new Date().getSeconds() === 40
    ) {
        db
          .select("name")
          .from("public.restaurants")
          .then((rows) => {
            restaurantOptions = rows.map((row) => row.name);
            console.log(restaurantOptions);
          }).catch;
        bot.sendMessage(chatId, restaurantOptions);
 

        // bot.sendPoll(chatId, "夠鐘揀餐廳！", restaurantOptions, {
        //   is_anonymous: false,
        // });
    }
  }, 1000);

  //confirm restaurant and select food and drink on 11:15 am
  timer = setInterval(() => {
    if (
      (new Date().getDay() === 1 ||
        new Date().getDay() === 2 ||
        new Date().getDay() === 3 ||
        new Date().getDay() === 4 ||
        new Date().getDay() === 5) &&
      new Date().getHours() === 11 &&
      new Date().getMinutes() === 15 &&
      new Date().getSeconds() === 0
    ) {
      bot.sendMessage(chatId, `我地今日食依間：${"餐廳1"}`);
    }
  }, 1000);
  //confirm order on 12:00nn
})

bot.onText(/\/stop/, (message) => {
  clearInterval(timer);
});