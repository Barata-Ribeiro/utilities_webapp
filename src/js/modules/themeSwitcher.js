class ThemeSwitcher {
  constructor() {
    // Get the system's theme
    this.prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    this.toggleTheme();
    this.initialPos();
    this.EventListener();
  }

  // Set the initial theme based on system theme
  toggleTheme() {
    document.body.classList.toggle('dark-theme', this.prefersDark);
    document.body.classList.toggle('light-theme', !this.prefersDark);
  }

  // Set the switch initial position based on the initial theme
  initialPos() {
    document.getElementById('theme-switch__checkbox').checked =
      this.prefersDark;
  }

  // Listen for a change
  EventListener() {
    document
      .getElementById('theme-switch__checkbox')
      .addEventListener('change', (e) => {
        document.body.classList.toggle('dark-theme', e.target.checked);
        document.body.classList.toggle('light-theme', !e.target.checked);
      });
  }
}

export default ThemeSwitcher;
