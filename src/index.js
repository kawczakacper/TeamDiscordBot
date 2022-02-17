const Discord = require("discord.js")
const { token, prefix } = require("./config.js")
const client = new Discord.Client()
var randomWords = require('random-words');
const log = console.log
let admin = [
  "350975506163695617",
  "273487492185980929"
];
let que = 0;
let czylosowac = false;
let losowo = 0;
let kapitan = 0;
let oddalem = []
let quetabid = [
];
let TeamA = [];
let TeamB = [];
let quetab = [];
client.on("ready", () => {
  log((`Zalogowano jako ${client.user.tag}!`))
})
client.on("message", (msg) => {
  const { author, guild, channel } = msg
  if (author.bot || !guild) {
    return
  }
  if (!msg.content.startsWith(prefix)) return
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)
  const cmd = args.shift();
  if (cmd === "q") {
    if (que < 6) {
      if (quetab.includes(author.username)) {
        const quefail = new Discord.MessageEmbed()
          .setColor('#ec2a2a')
          .setTitle(` ${author.username}`)
          .setDescription('Jesteś już w kolejce')
        channel.send(quefail)
      } else {
        que = que + 1;
        quetab.push(author.username)
        quetabid.push(author.id)
        let quetosend = []
        quetabid.forEach(e => {
          quetosend.push(`<@${e}>`)
        })
        const joinque = new Discord.MessageEmbed()
          .setColor('#ec2a2a')
          .setTitle(`${author.username}`)
          .setDescription(`Dołączył do kolejki 
  Oto gracze w kolejce: ${quetosend}`)
        channel.send(joinque);
        console.log(que)
        console.log(`${author.username} Dopisany do tablicy`)
        if (cmd === "q") {
          if (que === 6) {
            czylosowac = true;
            const helpque = new Discord.MessageEmbed()
              .setColor('#ec2a2a')
              .setTitle(`Dobieranie zakończone.`)
              .setDescription(`oto gracze: ${quetab}

  Wpisz .c jezeli chcesz wybrac kapitana
  Wpisz .r jezeli ma być randomowe losowanie druzyn`)
            channel.send(helpque);
          }
        }
      }
    }
    else {
      const failjoinque = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(`${author.username}`)
        .setDescription('Nie znalazło się dla ciebie miejsce...')
        .setFooter(`Oto gracze w kolejce: ${quetab}`);
      channel.send(failjoinque);
    }
  }
  if (cmd === "r") {
    if (czylosowac) {
      if (oddalem.includes(author.id)) {
        const votevote = new Discord.MessageEmbed()
          .setColor('#ec2a2a')
          .setTitle(`${author.username}`)
          .setDescription('Oddałeś już głos.');
        channel.send(votevote);
      } else {
        losowo = losowo + 1;
        oddalem.push(author.id);
      }
    } else {
      const failvote = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(`${author.username}`)
        .setDescription('Aktualnie nie możesz głosować.')
      channel.send(failvote);
    }
  }


  if (cmd === "c") {
    if (czylosowac) {
      if (oddalem.includes(author.id)) {
        const votevote = new Discord.MessageEmbed()
          .setColor('#ec2a2a')
          .setTitle(`${author.username}`)
          .setDescription('Oddałeś już głos.')
        channel.send(votevote)
      } else {
        kapitan = kapitan + 1
        oddalem.push(author.id)
      }
    } else {
      const failvote = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(`${author.username}`)
        .setDescription('Aktualnie nie możesz głosować.')
      channel.send(failvote)
    }
  }


  if (kapitan === 3) {

    var capitan1 = quetab[Math.floor(Math.random() * quetab.length)];
    quetab.splice(quetab.indexOf(capitan1), 1);
    var capitan2 = quetab[Math.floor(Math.random() * quetab.length)];
    quetab.splice(quetab.indexOf(capitan2), 1);
    var randomItem = quetab[Math.floor(Math.random() * quetab.length)];
    var randomNumber = Math.floor((Math.random() * 1000) + 1);

    console.log(randomItem);
    quetab.forEach(function (item, index, arry) {
    })

    let login = randomWords();
    let loginnumber = Math.floor((Math.random() * 1000) + 1);
    let passwd = randomWords();

    // Losowanie przez dm

    const capitandm = new Discord.MessageEmbed()
      .setColor('#ec2a2a')
      .setTitle(`Kapitanami są: ${capitan1} oraz ${capitan2}`)
      .setDescription('Sprawdź wiadomość prywatną!')
    channel.send(capitandm)

    const createservermsg = new Discord.MessageEmbed()
      .setColor('#ec2a2a')
      .setTitle(`Serwer tworzy:${randomItem}`)
      .setDescription(`Login to: ${login}${loginnumber} Hasło:${passwd}`);

    quetabid.forEach(e => client.users.cache.get(e).send(createservermsg))

    quetabid = [];
    czylosowac = false;
    kapitan = 0;
    oddalem = [];
    quetab = [];
    que = 0;
  }
  if (losowo === 3) {

    let login = randomWords();
    let loginnumber = Math.floor((Math.random() * 1000) + 1);
    let passwd = randomWords();

    var randomItem = quetab[Math.floor(Math.random() * quetab.length)];
    // channel.send(`Serwer tworzy ${randomItem} jego login to: ${randomWords()}${randomNumber} hasło: ${randomWords()}`)

    const randommessagelosuj = new Discord.MessageEmbed()
      .setColor('#ec2a2a')
      .setTitle(`Serwer tworzy: ${randomItem}`)
      .setDescription(`Login to: ${login}${loginnumber} Hasło: ${passwd}`)

    quetabid.forEach(e => client.users.cache.get(e).send(randommessagelosuj))

    // quetabid.forEach(e => client.users.cache.get(e).send(`Serwer tworzy ${randomItem} jego Login to: ${login}${loginnumber} Hasło:${passwd}`))
    console.log(randomItem);
    quetab.forEach(function (item, index, arry) {
      quetabid = [];
      czylosowac = false;
      kapitan = 0;
      oddalem = [];
      que = 0;
    })



    //Losowanie teamu A

    for (let i = 3; i > 0; i--) {
      var randomItem = quetab[Math.floor(Math.random() * quetab.length)];
      TeamA.push(randomItem)
      quetab.splice(quetab.indexOf(randomItem), 1);
    }

    // Losowanie teamu B

    for (let i = 3; i > 0; i--) {
      var randomItem = quetab[Math.floor(Math.random() * quetab.length)];
      TeamB.push(randomItem)
      quetab.splice(quetab.indexOf(randomItem), 1);
    }

    // Wypisanie teamów
    const teamysend = new Discord.MessageEmbed()
      .setColor('#ec2a2a')
      .setTitle(`Oto teamy:`)
      .setDescription(`Team A: ${TeamA}
  Team B: ${TeamB}`)

    channel.send(teamysend)
    quetab = []
    que = 0;
    quetabid = [];
    czylosowac = false
    losowo = 0;
  }
  // Wychodzenie z que.
  if (cmd === "leave") {
    if (quetab.includes(author.username)) {
      if (que === 6) {
        channel.send(`nie możesz wyjść, gra trwa!`)
      } else {
        quetab.splice(quetab.indexOf(author.username), 1);
        quetabid.splice(quetabid.indexOf(author.id), 1);
        const leaveque = new Discord.MessageEmbed()
          .setColor('#ec2a2a')
          .setTitle(` ${author.username}`)
          .setDescription('Wyszedł z kolejki...')
        channel.send(leaveque)
        que = que - 1;
      }

    } else {
      const leavequefail = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(` ${author.username}`)
        .setDescription('Pojebie, nie ma cie w kolejce.')
      channel.send(leavequefail)
    }
  }
  // Resetuje que
  if (cmd === "reset") {
    if (admin.includes(author.id)) {
      const resetok = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(` ${author.username}`)
        .setDescription('Gra zresetowana przez administratora')
      channel.send(resetok)
      que = 0;
      quetab = [];
      quetabid = [];
      kapitan = 0;
      losowo = 0;
      czylosowac = false;
      let oddalem = [];
      console.log(`${que} ${quetab}`);
    } else {
      const resetfail = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(` ${author.username}`)
        .setDescription('Nie masz uprawnień.')
      channel.send(resetfail);
    }
  }
  // Teamy są tutaj tworzą.
  if (cmd === "kolejka") {
    let quetosend = [];
    quetabid.forEach(e => {
      quetosend.push(`<@${e}>`);
    })
    const resetfail = new Discord.MessageEmbed()
      .setColor('#ec2a2a')
      .setTitle(`Aktualna kolejka`)
      .setDescription(`Aktualna kolejka: ${quetosend}`);
    channel.send(resetfail);
  }
  if (cmd === "logi") {
    if (admin.includes(author.id)) {
      channel.send(`${quetabid} Oto id graczy`);
      channel.send(`${quetab} Oto nazwy graczy`);
      channel.send(`${czylosowac} Czy losować`);
      channel.send(`${losowo} Ilość głosów na losowo`);
      channel.send(`${kapitan} ilość głosów na kapitanów.`);
    } else {
      const resetfail = new Discord.MessageEmbed()
        .setColor('#ec2a2a')
        .setTitle(` ${author.username}`)
        .setDescription('Nie masz uprawnień.')
      channel.send(resetfail);
    }
  };
  if (cmd === "adminhelp") {
    const adminhelp = new Discord.MessageEmbed()
      .setColor('#ec2a2a')
      .setTitle(`Spis komend administratora.`)
      .setDescription(`
  .reset Resetuję gre
  .logi wypisuje status aplikacji, aktualny status.
  `);
    channel.send(adminhelp);
  }
})
client.login(token);

