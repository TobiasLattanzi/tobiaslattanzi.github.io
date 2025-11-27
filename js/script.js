const typewriter = document.getElementById('typewriter');
let typingTimeout = null;
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTypingPrefix = true;
let prefixIndex = 0;

function getTypewriterData() {
  const lang = localStorage.getItem('language') || 'es';
  return {
    prefix: translations[lang].typewriterPrefix || "¡Hola! Soy ",
    phrases: translations[lang].typewriterPhrases || ["Tobias Lattanzi", "estudiante de Sistemas"]
  };
}

function startTypewriter() {
  // Limpiar timeout anterior si existe
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  // Resetear variables
  phraseIndex = 0;
  charIndex = 0;
  isDeleting = false;
  isTypingPrefix = true;
  prefixIndex = 0;
  typewriter.textContent = "";

  const data = getTypewriterData();
  const prefix = data.prefix;
  const phrases = data.phrases;

  function type() {
    if (isTypingPrefix) {
      if (prefixIndex < prefix.length) {
        typewriter.textContent += prefix[prefixIndex];
        prefixIndex++;
        typingTimeout = setTimeout(type, 150);
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
        typingTimeout = setTimeout(type, 150);
      } else {
        isDeleting = true;
        typingTimeout = setTimeout(type, 2000);
      }
    } else {
      if (charIndex > 0) {
        typewriter.textContent = prefix + currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingTimeout = setTimeout(type, 75);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingTimeout = setTimeout(type, 500);
      }
    }
  }

  type();
}

function copyToClipboard() {
  const texto = document.getElementById("textoACopiar").innerText;

  navigator.clipboard.writeText(texto)
    .then(() => {

    })
    .catch((err) => {
      console.error("Error al copiar al portapapeles:", err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(startTypewriter, 500);
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