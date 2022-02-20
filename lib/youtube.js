const { LiveChat } = require("youtube-chat")

class Youtube {
  constructor(parent) {
    this.parent = parent
    this.client = new LiveChat({ channelId: this.settings.channel_id })
    this.init()
  }

  get settings() {
    return this.parent.settings.get("youtube")
  }

  // rejoin() {
  //   // client更新する
  //   let channel = this.client.getChannels()[0]
  //   this.client.part(channel).then(() => {
  //     this.client.join(this.settings.channel_name).then(res => {
  //       console.log(`Connected to ${this.settings.channel_name} channel`)
  //     }).catch(err => {
  //       console.log(`Coudln't connect to ${this.settings.channel_name} channel`)
  //     })
  //   }).catch(err => {
  //     console.log(`Couldn't leave ${channel}
  //         ${err}`)
  //   })
  // }

  async init() {
    const ok = await this.client.start()
    if(!ok) {
      console.log("NOT OK YOUTUBE")
      this.client.stop()
    }

    this.client.on("start", (liveId) => {
      console.log(`Connected to ${liveId} channel`)
    })

    this.client.on("end", (reason) => {
      /* Your code here! */
      console.log(`connect end`)
    })

    this.client.on("chat", (chatItem) => {
      console.log("chat")
      console.log(chatItem.author.name)
      console.log(chatItem.message[0].text)

      // if (userstate["msg-id"] == "highlighted-message" && this.settings["highlighted-message"].enabled) {//special case
      //   let noita = this.parent.noita
      //   if (!noita) return
      //   let msg = this.interpolate(
      //     this.settings["highlighted-message"].func,
      //     {
      //       name: userstate["display-name"],
      //       message: message.replace(/"|'/g, "")
      //     })
      //   noita.toGame(msg)
      // }
    })

    // Emit when an error occurs
    // err: Error or any
    this.client.on("error", (err) => {
      /* Your code here! */
      console.log("Youtube Error")
    })

    // //raid
    // this.client.on("raided", (ch, username, viewers) => {
    //   console.log(`${username} is raiding with ${viewers} viewers`)
    // })

    // //host
    // this.client.on("hosted", (ch, username, viewers, autohost) => {
    //   console.log(`${username} is ${autohost ? "autohosting" : "hosting"} with ${viewers} viewers`)
    // });

    // //bits
    // this.client.on("cheer", (ch, userstate, message) => {
    //   let bits = userstate.bits
    //   console.log(`${userstate["display-name"]} threw ${bits} bits.`)
    // })

    // //subs
    // this.client.on("subscription", (ch, username, method, message, userstate) => {
    //   console.log(`${username} has subscribed to the channel`)
    //   this.noitaSub({ username })
    // })

    // this.client.on("resub", (ch, username, months, message, userstate, methods) => {
    //   let cumulativeMonths = ~~userstate["msg-param-cumulative-months"]
    //   console.log(`${username} has resubbed ${cumulativeMonths ? "for " + cumulativeMonths + " months" : ""}`)
    //   this.noitaSub({ username, cumulativeMonths })
    // })

    // this.client.on("subgift", (ch, username, streakMonths, recipient, methods, userstate) => {
    //   let senderCount = ~~userstate["msg-param-sender-count"]
    //   console.log(`${username} is gifting a sub to ${recipient} for their ${streakMonths} month, ${username} has gifted ${senderCount} subs in this channel.`)
    //   this.noitaSub({ username, recipient, gift: true })
    // })

    // this.client.on("submysterygift", (ch, username, numbOfSubs, methods, userstate) => {
    //   let senderCount = ~~userstate["msg-param-sender-count"]
    //   console.log(`${username} is gifting ${numbOfSubs} subs in the channel, they have gifted ${senderCount} subs in this channel.`)
    //   this.noitaSub({ username, numbOfSubs, gift: true, mystery: true })
    // })

    // this.client.on("anongiftpaidupgrade", (ch, username, userstate) => {
    //   console.log(`${username} is continuing the sub they got from anonymous`)
    //   this.noitaSub({ username, gift: true, upgrade: true, anon: true })
    // })

    // this.client.on("giftpaidupgrade", (ch, username, sender, userstate) => {
    //   console.log(`${username} is continuing the sub they got from ${sender}`)
    //   this.noitaSub({ sender, username, gift: true, upgrade: true })
    // })
  }

  // customReward(id, userstate, message) {
  //   let reward = this.settings["custom-rewards"][id]
  //   if (!reward) {
  //     console.log(`Unknown reward id: "${id}", message: ${userstate["display-name"]}: ${message}`)
  //     return
  //   }

  //   if (!reward.enabled) return
  //   let noita = this.parent.noita
  //   if (!noita) return
  //   let func = this.interpolate(
  //     reward.func,
  //     {
  //       name: userstate["display-name"],
  //       message: message.replace(/"|'/g, "")
  //     })
  //   if (this.settings.show_user_msg) {
  //     let msg = this.interpolate(`GamePrintImportant("${reward.msg_head}","${reward.msg_body}")`, {
  //       name: userstate["display-name"],
  //       message: message.replace(/"|'/g, "")
  //     })
  //     if (reward.msg_head == "" && reward.msg_body == "") { msg = "" }
  //     func = msg + "\n" + func
  //   }
  //   noita.toGame(func)
  // }

  // noitaSub({ mystery, gift, anon, upgrade, username, sender, recipient, numbOfSubs, cumulativeMonths } = {}) {
  //   if (!this.settings["ingame-subs"]) { return }
  //   let noita = this.parent.noita
  //   let msg = ``
  //   if (!noita) return

  //   if (gift) {
  //     if (anon && upgrade) {
  //       msg = `${username} is continuing the sub they got from anonymous.`
  //     }
  //     else if (upgrade) {
  //       msg = `${username} is continuing the sub they got from ${sender}.`
  //     }
  //     else if (mystery) {
  //       msg = `${username} is gifting ${numbOfSubs} subs in the channel.`
  //     }
  //     else {
  //       msg = `${username} is gifting a sub to ${recipient}.`
  //     }
  //   }
  //   else {
  //     if (~~cumulativeMonths > 0) {
  //       msg = `${username} has resubbed ${cumulativeMonths ? "for " + cumulativeMonths + " months" : ""}`
  //     }
  //     else {
  //       msg = `${username} has subscribed to the channel`
  //     }
  //   }

  //   if (msg) {
  //     msg = `GamePrintImportant("${msg}", "");`
  //     msg += '\nspawn_twitch_stuff("badge_1", 15)'
  //     noita.toGame(msg)
  //   }
  // }

  // getObjPath(objPath, obj, fallback = '') {
  //   return objPath.split('.').reduce((res, key) => res[key] || fallback, obj);
  // }

  // interpolate(template, variables, fallback) {
  //   const regex = /\${[^{]+}/g
  //   return template.replace(regex, (match) => {
  //     const objPath = match.slice(2, -1).trim();
  //     return this.getObjPath(objPath, variables, fallback);
  //   })
  // }
}

module.exports = Youtube