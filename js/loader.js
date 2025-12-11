// Control de la pantalla de carga
document.addEventListener('DOMContentLoaded', function() {
  const loaderScreen = document.getElementById('loader-screen');

  // Esperar a que la animación termine (3 segundos de la animación + 0.5s de fade)
  setTimeout(() => {
    loaderScreen.classList.add('hidden');

    // Remover el elemento del DOM después de la transición
    setTimeout(() => {
      loaderScreen.remove();
    }, 500);
  }, 3000);
});
