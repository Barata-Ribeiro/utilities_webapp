class ThemeSwitcher {
  constructor() {
    // Get the user's saved theme or the system's theme
    const savedTheme = localStorage.getItem('theme');
    this.prefersDark = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.setupEventListeners();
  }

  // Set the theme and save it to localStorage
  setTheme(isDark) {
    this.prefersDark = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.toggleTheme();
  }

  // Set the initial theme based on system theme
  toggleTheme() {
    document.body.classList.toggle('dark-theme', this.prefersDark);
    document.body.classList.toggle('light-theme', !this.prefersDark);
  }

  // Set the switch initial position based on the initial theme
  initialPos() {
    this.checkboxes.forEach((checkbox) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = this.prefersDark;
    });
  }

  // Listen for a change
  EventListener() {
    this.checkboxes.forEach((outerCheckbox) =>
      outerCheckbox.addEventListener('change', (e) => {
        const { checked } = e.target;
        this.checkboxes.forEach((innerCheckbox) => {
          if (innerCheckbox !== outerCheckbox) {
            // eslint-disable-next-line no-param-reassign
            innerCheckbox.checked = checked;
          }
        });
        this.setTheme(checked);
      }),
    );
  }

  setupEventListeners() {
    this.checkboxes = Array.from(
      document.querySelectorAll('.theme-switch input[type="checkbox"]'),
    );
    this.toggleTheme();
    this.initialPos();
    this.EventListener();
  }
}

export default ThemeSwitcher;
