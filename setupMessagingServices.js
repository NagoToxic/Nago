const fs = require("fs")

exports.setupMessagingServices = (sock, from, messageDetails) =>{
  
  const enviarAudioGravacao = async (arquivo) =>{
    await sock.sendMessage(from,{ audio: fs.readFileSync(arquivo), mimetype: "audio/mp4", ptt:true}, {quoted:messageDetails})
  }
  
  const enviarImagem = async(arquivo, text) =>{
    await sock.sendMessage(from, { image: fs.readFileSync(arquivo), caption: text },{quoted: messageDetails})
  }
  
  const enviarMensagem = async (text, mention) =>{
    await sock.sendMessage(from, { text, mentions: [mention] }, {quoted: messageDetails})
  }
  
  const reagir = async (emoji, mention) => {
  await sock.sendMessage(from, { react: { text: emoji, key: messageDetails } }, { quoted: messageDetails });
};
  
  const isGroup = (m) => {
  return m.key.remoteJid.endsWith('@g.us');
};

const isGroupAdmins = (m, client) => {
  const groupMetadata = sock.groupMetadata(m.key.remoteJid);
  const admins = groupMetadata.participants.filter((p) => p.isAdmin);
  return admins.some((admin) => admin.id === sock.user.id);
};
  
  return{
    enviarAudioGravacao,
    enviarImagem,
    enviarMensagem,
    isGroup,
    isGroupAdmins,
    reagir,
  }
}