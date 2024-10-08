const {Prefixo} = require("./settings.json")


exports.ExtrairMenssagens = (messageDetails)=>{
  const extendedTextMessage = messageDetails?.message?.extendedTextMessage?.text;
  const textConversation = messageDetails?.message?.conversation;
  
  const finalMessageText = extendedTextMessage || textConversation;
  
  const from = messageDetails?.key?.remoteJid;
  
  const isCommand = finalMessageText?.startsWith(Prefixo) ?? false;
  
  const commandName = isCommand ? finalMessageText.slice(1).trim().split(/ +/).shift().toLowerCase(): "";
  
  const args = isCommand ? finalMessageText.trim().split(/ +/).slice(1).join(""): "";
  
  const userName = messageDetails ? messageDetails.pushName: ""
  
  return{
    finalMessageText,
    from,
    isCommand,
    commandName,
    args,
    userName,
  }
}