class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'es';
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        this.switchLanguage(lang);
      });
    });

    this.updateActiveButton();
  }

  switchLanguage(lang) {
    if (lang !== this.currentLang) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      this.applyLanguage(lang);
      this.updateActiveButton();

      if (typeof startTypewriter === 'function') {
        startTypewriter();
      }
    }
  }

  applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    document.documentElement.lang = lang;
  }

  updateActiveButton() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  getCurrentLanguage() {
    return this.currentLang;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.langSwitcher = new LanguageSwitcher();
});
