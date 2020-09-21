const YouTube = require('youtube-node');

// Teste arquivo de key(fake) do Youtube
const config = require('./yt-config');

const youtube = new YouTube();
youtube.setKey(config.key);

// search(Texto procurado, Qtd resultados, Function Callback)
function searchVideoURL(message, queryText){
    return new Promise((resolve , reject) => {
        youtube.search(`Exercício em casa para bíceps ${queryText}`, 2, function(err, result){
            if(!err){
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
                //console.log(JSON.stringify(result, null, 2));
            }else{
                reject('Erro encontrado durante execução do programa');
               //console.log('Erro detectado!');
            }
        });
    })
};

module.exports.searchVideoURL = searchVideoURL;