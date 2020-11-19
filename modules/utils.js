const moment = require("moment")
require("moment-duration-format")
const momenttz = require("moment-timezone")
const MessageAdd = require("./db/message_add.js")

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> 명령어를 수행할 관리자 권한을 소지하고 있지않습니다.`)
    return true
  } else {
    return false
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str
  limitLen -= tmp.length

  for (let i = 0; i < limitLen; i++) {
    tmp += " "
  }

  return tmp
}

function getEmbedFields(message, modify = false) {
  if (message.content == "" && message.embeds.length > 0) {
    let e = message.embeds[0].fields
    let a = []

    for (let i = 0; i < e.length; i++) {
      a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`)
    }

    return a.join("")
  } else if (modify) {
    return message.author.lastMessage.content
  } else {
    return message.content
  }
}



module.exports.checkPermission = checkPermission
module.exports.changeCommandStringLength = changeCommandStringLength
module.exports.getEmbedFields = getEmbedFields
