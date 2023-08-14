/**
 * Class to manage theme switching functionality.
 */
class ThemeSwitcher {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * Get the user's saved theme or fallback to the system's theme.
     * @type {boolean}
     * @private
     */
    this.prefersDark =
      localStorage.getItem('theme') === 'dark'
        ? true
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.setupEventListeners();
  }

  /**
   * Set the theme and save the preference to localStorage.
   *
   * @param {boolean} isDark - Flag indicating if the theme is dark.
   */
  setTheme(isDark) {
    this.prefersDark = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.toggleTheme();
  }

  /**
   * Toggles between dark and light themes.
   * @private
   */
  toggleTheme() {
    document.body.classList.toggle('dark-theme', this.prefersDark);
    document.body.classList.toggle('light-theme', !this.prefersDark);
  }

  /**
   * Set the initial position for theme switches based on the current theme.
   * @private
   */
  initialPos() {
    this.checkboxes.forEach((checkbox) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = this.prefersDark;
    });
  }

  /**
   * Adds event listeners for theme switches to ensure consistency across switches.
   * @private
   */
  addCheckboxListeners() {
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

  /**
   * Initializes checkboxes, applies the initial theme, and sets up event listeners.
   * @private
   */
  setupEventListeners() {
    this.checkboxes = Array.from(
      document.querySelectorAll('.theme-switch input[type="checkbox"]'),
    );
    this.toggleTheme();
    this.initialPos();
    this.addCheckboxListeners();
  }
}

export default ThemeSwitcher;
