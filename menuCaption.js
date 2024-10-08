const { Prefixo, BotNome, Dono } = require('/storage/emulated/0/nago/settings.json');

exports.menuCaption = (userName) => {
  return `
╭━════════════════════⊷
┃❖╭───────────────────
┃❖│⪧ Dono: ${BotNome}
┃❖│⪧ Prefixo:  ${Prefixo}
┃❖│⪧ Status: Online
┃❖│⪧ Usuário: ${userName}
┃❖│⪧ Ping: 0.1
┃❖╰───────────────────
╰━════════════════════⊷
`;
};