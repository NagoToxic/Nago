const path =require("path")
const pino = require("pino");
const readline = require("readline");
const axios = require("axios")
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const {comandos } = require ("./comandos.js")


const question = (string) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(string, resolve));
};

exports.connection = async () => {
  const { version } = await fetchLatestBaileysVersion();

  const { state, saveCreds } = await useMultiFileAuthState("./assets/qrCode");

  const sock = makeWASocket({
    printQrInTerminal: false,
    auth: state,
    version,
    logger: pino({ level: "silent" }),
    markOnlineOnConnect: true,
  });

  if (!sock.authState.creds.registered) {
    let phoneNumber = await question("Informe seu número: ");
    if (!phoneNumber) {
      console.log("Número incorreto!");
    }

    const codigo = await sock.requestPairingCode(phoneNumber);

    console.log(`O seu código é: ${codigo}`);
  }

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("Conexão fechada devido ao erro:", shouldReconnect);
      if (shouldReconnect) {
        exports.connection();
      }
    } else if (connection === "open") {
      console.log("Conectado com sucesso!");
    }
  });

  sock.ev.on("creds.update", saveCreds);

await comandos(sock)
  return sock;
};

exports.connection();