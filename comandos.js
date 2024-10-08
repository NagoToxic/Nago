const { ExtrairMenssagens } = require("./ExtrairMenssagens.js")
const {setupMessagingServices} = require("./messagingServices/setupMessagingServices.js")
const {menuCaption} = require("./features/menuCaption.js")

//MODULOS
const fs = require("fs")
const moment = require("moment-timezone");

















//importacoes///

const axios = require('axios');
async function getBuffer(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}




exports.comandos = async (sock) =>{
  sock.ev.on("messages.upsert", async ({ messages })=>{
    
    const messageDetails = messages[0];
    
    if(!messageDetails.message) return
    
    try{
      
      const { finalMessageText, from, isCommand, commandName, args, userName} = ExtrairMenssagens(messageDetails);
      const { enviarAudioGravacao, enviarImagem, enviarMensagem } = setupMessagingServices(sock, from, messageDetails)
      
      switch(commandName){
        
        case "menu":
        enviarImagem("assets/fotos/menu.jpg", menuCaption(userName))
        
      break
      
      
      
      




case "movie":
  const apiKey = "764e543ea97faa690c9ebbef593958b9";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  if (args.length == 0) return await enviarMensagem(`Cadê o nome do filme o qual você deseja ver informações?`)

  const movieName = Array.isArray(args) ? args.join(" ") : args;
  const urlCompleta = url + encodeURIComponent(movieName) + "&language=pt";

  axios.get(urlCompleta)
    .then((response) => {
      const dados = response.data;
      const resultados = dados.results;

      if (resultados.length > 0) {
        const filme = resultados[0];
        const ImageMovieLink = `https://image.tmdb.org/t/p/original${filme.backdrop_path}`;
        getBuffer(ImageMovieLink)
          .then((fotoFilme) => {
            sock.sendMessage(from, {
              image: fotoFilme,
              caption: `*Nome do Filme:* ${filme.title}\n*Nome original:* ${filme.original_title}\n*Data de Lançamento:* ${filme.release_date}\n*Avaliações:* ${filme.vote_average} - (${filme.vote_count} Votos)\n*Popularidade:* ${filme.popularity.toFixed(1)}%\n*Classificação adulta?* ${filme.adult ? 'Sim.' : 'Não.'}\n*Linguagem oficial:* ${filme.original_language}\n\n*Sinopse:* ${filme.overview}`
            });
          })
          .catch((e) => {
            console.log(e)
            return (msg_erro)
          });
      } else {
        return enviarMensagem(`Nenhum resultado encontrado para "${movieName}"`);
      }
    })
    .catch((error) => {
      sock.sendMessag(from, { text: `Erro ao pesquisar filmes: ${error.message}`});
    });
  break;
  
  
  
  
  


//sistena de coins///



  


















  
  
  
  
  
  
  
  
  
  
  
  case "reiniciar":
    sock.sendMessage(from, { text: `Reiniciando o bot...` })
    setTimeout(() => {
        process.exit(1)
    }, 1000) // wait 1 second before exiting
    break
  
      
      
      
      
      
      
      
      
    }
      
    }catch(error){
      console.log("Ocorreu um erro:" , error)
    }
    
    
  })
}