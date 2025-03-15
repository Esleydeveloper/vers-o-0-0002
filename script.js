let currentIndex = 0;
const images = document.querySelectorAll('#carrossel .carousel-container img');

function showImage(index) {
  images.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

showImage(currentIndex);
setInterval(nextImage, 3000);

// Função para o botão de "Curtir" com contador
const likeButtons = document.querySelectorAll('button.curtir');
likeButtons.forEach((btn) => {
  let contadorCurtidas = 0;

  btn.addEventListener('click', () => {
    const contadorElement = btn.nextElementSibling;

    if (btn.classList.contains('liked')) {
      btn.classList.remove('liked');
      btn.textContent = 'Curtir';
      contadorCurtidas--;
    } else {
      btn.classList.add('liked');
      btn.textContent = 'Descurtir';
      contadorCurtidas++;
    }

    contadorElement.textContent = contadorCurtidas;
  });
});

// Lógica para comentários
const enviarComentarioButtons = document.querySelectorAll('.enviar-comentario');
enviarComentarioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const comentarioContainer = button.parentElement;
    const listaComentarios = comentarioContainer.querySelector('#lista-comentarios');
    const novoComentarioInput = comentarioContainer.querySelector('#novo-comentario');
    const novoComentarioTexto = novoComentarioInput.value.trim();

    if (novoComentarioTexto) {
      const nomeUsuario = "Usuário Anônimo"; // Você pode implementar um sistema de login para obter o nome do usuário
      const dataHora = new Date().toLocaleString();

      const novoComentarioElement = document.createElement('div');
      novoComentarioElement.classList.add('comentario');
      novoComentarioElement.innerHTML = `
        <p><strong>${nomeUsuario}</strong> - ${dataHora}</p>
        <p>${novoComentarioTexto}</p>
        <button class="curtir-comentario">Curtir</button>
        <span class="contador-curtidas-comentario">0</span>
      `;

      listaComentarios.appendChild(novoComentarioElement);
      novoComentarioInput.value = '';

      // Lógica para curtir comentários
      const curtirComentarioButton = novoComentarioElement.querySelector('.curtir-comentario');
      const contadorCurtidasComentario = novoComentarioElement.querySelector('.contador-curtidas-comentario');
      let curtidas = 0;

      curtirComentarioButton.addEventListener('click', () => {
        if (curtirComentarioButton.classList.contains('liked')) {
          curtirComentarioButton.classList.remove('liked');
          curtirComentarioButton.textContent = 'Curtir';
          curtidas--;
        } else {
          curtirComentarioButton.classList.add('liked');
          curtirComentarioButton.textContent = 'Descurtir';
          curtidas++;
        }
        contadorCurtidasComentario.textContent = curtidas;
      });
    }
  });
});
