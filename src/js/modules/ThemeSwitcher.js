/**
 * Class to manage theme switching functionality.
 */
class ThemeSwitcher {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * Flag indicating if the user prefers the dark theme.
     * Will check the user's saved preference or fallback to the system's theme.
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
   * Set the theme based on user preference and save this preference to localStorage.
   *
   * @param {boolean} isDark - Flag indicating if the theme should be set to dark.
   */
  setTheme(isDark) {
    this.prefersDark = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.toggleTheme();
  }

  /**
   * Toggle the theme classes based on the `prefersDark` property.
   * @private
   */
  toggleTheme() {
    document.body.classList.toggle('dark-theme', this.prefersDark);
    document.body.classList.toggle('light-theme', !this.prefersDark);
  }

  /**
   * Set the initial position for theme switches based on the `prefersDark` property.
   * @private
   */
  initialPos() {
    this.checkboxes.forEach((checkbox) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = this.prefersDark;
    });
  }

  /**
   * Attach event listeners to the checkboxes ensuring consistent theme switching.
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
   * Initialize checkboxes, apply the initial theme, and set up checkbox event listeners.
   * @private
   */
  setupEventListeners() {
    /**
     * Collection of all theme switch checkboxes.
     * @type {HTMLElement[]}
     * @private
     */
    this.checkboxes = Array.from(
      document.querySelectorAll('.theme-switch input[type="checkbox"]'),
    );
    this.toggleTheme();
    this.initialPos();
    this.addCheckboxListeners();
  }
}

export default ThemeSwitcher;
