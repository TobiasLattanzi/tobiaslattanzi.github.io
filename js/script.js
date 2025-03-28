const prefix = "Hola, soy ";
const phrases = ["Tobias Lattanzi", "estudiante de Sistemas"];
const typewriter = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTypingPrefix = true;
let prefixIndex = 0;

typewriter.textContent = "";

function type() {
  if (isTypingPrefix) {
    if (prefixIndex < prefix.length) {
      typewriter.textContent += prefix[prefixIndex];
      prefixIndex++;
      setTimeout(type, 150);
      return;
    } else {
      isTypingPrefix = false;
    }
  }

  const currentPhrase = phrases[phraseIndex];
  
  if (!isDeleting) {
    if (charIndex < currentPhrase.length) {
      typewriter.textContent = prefix + currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, 150);
    } else {
      isDeleting = true;
      setTimeout(type, 2000);
    }
  } else {
    if (charIndex > 0) {
      typewriter.textContent = prefix + currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 75);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    }
  }
}

function copyToClipboard(text) {
            // Selecciona el contenido del elemento que queremos copiar
            const texto = document.getElementById("textoACopiar").innerText;

            // Usa navigator.clipboard para copiar al portapapeles
            navigator.clipboard.writeText(texto)
                .then(() => {
                    
                })
                .catch((err) => {
                    console.error("Error al copiar al portapapeles:", err);
                });
        }

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 500);
});

document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', async function() {
    if (this.classList.contains('animating')) return;
    
    const value = this.dataset.value;
    await navigator.clipboard.writeText(value);
    
    this.classList.add('animating');
    const originalClass = Array.from(this.classList).find(cls => cls.startsWith('fa-') && cls !== 'fas' && cls !== 'fab');
    const container = this.closest('.icon-container');
    
    // Add copied class to show "¡Copiado!" tooltip
    container.classList.add('copied');
    
    // Start rotation
    this.classList.add('rotate-first-half');
    
    // Change to checkmark halfway through
    setTimeout(() => {
      this.classList.remove(originalClass);
      this.classList.add('fa-check');
      this.classList.remove('rotate-first-half');
      this.classList.add('rotate-second-half');
    }, 250);
    
    // Reset everything
    setTimeout(() => {
      this.classList.remove('rotate-second-half');
      this.classList.remove('fa-check');
      this.classList.add(originalClass);
      this.classList.remove('animating');
      container.classList.remove('copied');
    }, 1500);
  });
});