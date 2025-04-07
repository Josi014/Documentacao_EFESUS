const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const menuDir = path.join(__dirname, '..', 'Menus');

app.use('/Menus', express.static(menuDir));
app.use('/images/imgMenu', express.static(path.join(__dirname, '..', 'public', 'images', 'imgMenu')));

app.use(express.static(path.join(__dirname, '..')));

app.get('/favicon.ico', (req, res) => res.status(204).end());

function listarConteudo(diretorio) {
  return fs.readdirSync(diretorio).map((item) => {
    const caminho = path.join(diretorio, item);
    const stats = fs.statSync(caminho);

    if (stats.isDirectory()) {
      const imagem = `/images/imgMenu/${item}.png`;  
      console.log(`Imagem para a pasta ${item}: ${imagem}`);
      return {
        tipo: 'pasta',
        nome: item,
        imagem: imagem, 
        conteudo: listarConteudo(caminho),
      };
    } else if (item.endsWith('.html')) {
      return {
        tipo: 'arquivo',
        nome: item,
      };
    }
  }).filter(item => item !== undefined);
}


app.get(['/menu', '/menu/'], (req, res) => {
  const conteudoMenu = listarConteudo(menuDir);
  res.json(conteudoMenu);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
