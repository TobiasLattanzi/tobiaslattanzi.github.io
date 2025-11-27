class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    this.updateToggleState();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme(this.currentTheme);
    this.updateToggleState();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  updateToggleState() {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    if (themeToggle) {
      if (this.currentTheme === 'dark') {
        themeToggle.classList.remove('light');
        if (moonIcon) moonIcon.style.opacity = '1';
        if (sunIcon) sunIcon.style.opacity = '0';
      } else {
        themeToggle.classList.add('light');
        if (moonIcon) moonIcon.style.opacity = '0';
        if (sunIcon) sunIcon.style.opacity = '1';
      }
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitcher = new ThemeSwitcher();
});
