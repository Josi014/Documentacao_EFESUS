export function inicializarZoom() {
  const magnifying_areas = document.querySelectorAll(".magnifying_area");
  const magnifying_imgs = document.querySelectorAll(".magnifying_img");

  magnifying_areas.forEach((area, index) => {
    const img = magnifying_imgs[index];

    area.addEventListener("mousemove", (event) => {
      const rect = area.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const percentX = x / rect.width;
      const percentY = y / rect.height;

      const zoom = 2;

      const offsetX = percentX * rect.width * (zoom - 1);
      const offsetY = percentY * rect.height * (zoom - 1);

      img.style.transform = `scale(${zoom}) translate(${-offsetX / zoom}px, ${-offsetY / zoom}px)`;
    });

    area.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) translate(0, 0)";
    });
  });
}
document.addEventListener("scroll", () => {
  const textos = document.querySelectorAll(".scroll-text");
  const tela = window.innerHeight;

  textos.forEach(texto => {
    const posicao = texto.getBoundingClientRect().top;

    if (posicao < tela - 100) {
      texto.classList.add("visible");
    }
  });
});
