const Jimp = require("jimp");
const fs = require('fs');
const imagens = fs.readdirSync('./Develop/img');

imagens.forEach(function(arquivo) {
  Jimp.read('Develop/img/' + arquivo).then(function(imagem) {
    imagem
    .cover(400, 400)
    .write('Product/img/' + arquivo);
  }).catch(function(err) {
    console.error(err);
  });
});