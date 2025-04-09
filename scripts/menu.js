import { carregarPagina } from "./router.js";

async function carregarMenu() {
  try {
    const response = await fetch("http://192.168.18.18:3000/menu");
    if (!response.ok) {
      throw new Error(`Erro HTTP! Código: ${response.status}`);
    }

    const arquivos = await response.json();
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    function criarMenuItens(items, parent, caminhoPai = "") {
      items.forEach((item) => {
        const li = document.createElement("li");

        if (item.tipo === "pasta") {
          const pastaDiv = document.createElement("div");
   

          if (!caminhoPai) {
            const imagemPasta = document.createElement("img");
            imagemPasta.src = item.imagem || "/images/imgMenu/veplex-logo.png";
            imagemPasta.alt = `Ícone da pasta ${item.nome}`;
            imagemPasta.className = "imagem_menu";
            imagemPasta.style.filter = "invert(100%)";
            pastaDiv.appendChild(imagemPasta);
          }

          pastaDiv.appendChild(document.createElement("br"));

          const pastaLink = document.createElement("span");
          pastaLink.textContent = formatarNomePasta(item.nome);
          pastaDiv.appendChild(pastaLink);

          li.appendChild(pastaDiv);

          const subMenu = document.createElement("ul");
          subMenu.classList.add("submenu");
          li.appendChild(subMenu);

          pastaDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            const isVisible = subMenu.style.display === "block";
            subMenu.style.display = isVisible ? "none" : "block";
          });

          criarMenuItens(item.conteudo, subMenu, `${caminhoPai}/${item.nome}`);
        }

        else if (item.tipo === "arquivo") {
          const link = document.createElement("a");
          link.className = "arquivo_a";
          link.href = "#";
          link.textContent = formatarNomePasta(item.nome.replace(".html", ""));

          const caminho = `/Menus${caminhoPai}/${item.nome}`;
          link.addEventListener("click", (e) => {
            e.preventDefault();
            carregarPagina(caminho);
          });

          if (caminhoPai === "") {
            const imagemArquivo = document.createElement("img");
            const nomeImagem = item.nome.replace(".html", "") + ".png";
            imagemArquivo.src = `/images/imgMenu/${nomeImagem}`;
            imagemArquivo.onerror = () => {
              imagemArquivo.src = "/images/imgMenu/veplex-logo.png";
            };
            imagemArquivo.alt = `Ícone do arquivo ${item.nome}`;
            imagemArquivo.className = "imagem_menu";
            imagemArquivo.style.filter = "invert(100%)";

            const arquivoDiv = document.createElement("div");
            arquivoDiv.appendChild(imagemArquivo);
            arquivoDiv.appendChild(link);
          
            li.appendChild(arquivoDiv);
            li.appendChild(document.createElement("br"));
          } else {
            li.appendChild(link);
          }
        }

        parent.appendChild(li);
      });
    }

    function formatarNomePasta(nome) {
      const texto = nome.substring(nome.indexOf(".") + 1);
      const palavras = texto.split("_").map((palavra, index) => {
        if (index > 0 && ["de", "da", "do"].includes(palavra)) return palavra;
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      });
      return palavras.join(" ");
    }

    criarMenuItens(arquivos, menu);
  } catch (error) {
    console.error("Erro ao carregar menu:", error);
    alert("Ocorreu um erro ao carregar o menu. Veja o console para detalhes.");
  }


  
}
window.addEventListener("DOMContentLoaded", () => {
  carregarMenu();

  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("mousemove",() => {
      document.body.classList.toggle("sidebar-fechado");
    });
  } else {
    console.warn("Botão ou sidebar não encontrado.");
  }
});


window.onload = carregarMenu;
