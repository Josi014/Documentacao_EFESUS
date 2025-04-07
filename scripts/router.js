import { inicializarZoom } from './zoom.js';

async function carregarPagina(caminho) {
  try {
    const resposta = await fetch(caminho);
    if (!resposta.ok) throw new Error(`Erro ao carregar: ${resposta.status}`);

    const html = await resposta.text();
    const conteudoDiv = document.getElementById("pagina");
    conteudoDiv.innerHTML = html;

    // Espera o DOM atualizar
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Inicializa zoom se necessário
    if (conteudoDiv.querySelector(".magnifying_img")) {
      inicializarZoom();
    }

  } catch (erro) {
    console.error("Erro ao carregar a página:", erro);
    document.getElementById("pagina").innerHTML = "<p>Erro ao carregar página.</p>";
  }
}

window.carregarPagina = carregarPagina;
export { carregarPagina };
