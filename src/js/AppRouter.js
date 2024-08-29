/**
 * Class that represents the application router.
 */
class AppRouter {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /**
     * @property {string} urlPageTitle - The title prefix for all routes.
     */
    this.urlPageTitle = 'Utilities App';
    this.currentUtility = null;

    /**
     * @property {string} loadingHTML - The loading HTML content.
     */
    this.loadingHTML = `
      <div id="loading" class="loading__container">
        <div class="loading__loader"></div>
      </div>
    `;

    /**
     * @property {Object} urlRoutes - Mapping of routes to their details.
     */
    this.urlRoutes = {
      404: {
        route: '/routes/404.html',
        title: `404 | ${this.urlPageTitle}`,
        description: 'Oops! The page you’re looking for cannot be found.',
        Utility: null,
      },
      '/': {
        route: '/routes/home.html',
        title: `Home | ${this.urlPageTitle}`,
        description:
          'Welcome to our homepage. Explore our range of tools and utilities.',
        Utility: () => import('./modules/Home'),
      },
      '/styleguide': {
        route: '/routes/styleguide.html',
        title: `Styleguide | ${this.urlPageTitle}`,
        description: 'Discover our design principles and visual guidelines.',
        Utility: null,
      },
      '/utilities/calculator': {
        route: '/routes/utilities/calculator.html',
        title: `Calculator | ${this.urlPageTitle}`,
        description:
          'Solve mathematical problems with our easy-to-use calculator.',
        Utility: () => import('./modules/utilities/Calculator'),
      },
      '/utilities/charactercounter': {
        route: '/routes/utilities/characterCounter.html',
        title: `Character Counter | ${this.urlPageTitle}`,
        description:
          'Count characters, words, and paragraphs for precise content creation.',
        Utility: () => import('./modules/utilities/CharacterCounter'),
      },
      '/utilities/passwordgenerator': {
        route: '/routes/utilities/passwordGenerator.html',
        title: `Password Generator | ${this.urlPageTitle}`,
        description:
          'Create strong, secure passwords with our advanced generator tool.',
        Utility: () => import('./modules/utilities/PasswordGenerator'),
      },
      '/utilities/romanconverter': {
        route: '/routes/utilities/romanConverter.html',
        title: `Roman Converter | ${this.urlPageTitle}`,
        description: 'Convert numbers to and from Roman numerals with ease.',
        Utility: () => import('./modules/utilities/RomanConverter'),
      },
      '/converters/temperature': {
        route: '/routes/converters/temperatureConverter.html',
        title: `Temperature Converter | ${this.urlPageTitle}`,
        description:
          'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
        Utility: () => import('./modules/converters/TempConverter'),
      },
      '/converters/length': {
        route: '/routes/converters/lengthConverter.html',
        title: `Length Converter | ${this.urlPageTitle}`,
        description: 'Convert measurements of length across various units.',
        Utility: () => import('./modules/converters/LengthConverter'),
      },
      '/converters/mass': {
        route: '/routes/converters/massConverter.html',
        title: `Mass Converter | ${this.urlPageTitle}`,
        description: 'Effortlessly convert between different mass units.',
        Utility: () => import('./modules/converters/MassConverter'),
      },
      '/converters/speed': {
        route: '/routes/converters/speedConverter.html',
        title: `Speed Converter | ${this.urlPageTitle}`,
        description:
          'Convert speed measurements across miles per hour, kilometers per hour, and more.',
        Utility: () => import('./modules/converters/SpeedConverter'),
      },
      '/converters/time': {
        route: '/routes/converters/timeConverter.html',
        title: `Time Converter | ${this.urlPageTitle}`,
        description: 'Easily convert between various time units.',
        Utility: () => import('./modules/converters/TimeConverter'),
      },
      '/calculators/bmi': {
        route: '/routes/calculators/bmi.html',
        title: `BMI Calculator | ${this.urlPageTitle}`,
        description:
          'Determine your Body Mass Index and understand your health metrics.',
        Utility: () => import('./modules/calculators/BmiCalculator'),
      },
      '/calculators/percentage': {
        route: '/routes/calculators/percentage.html',
        title: `Percentage Calculator | ${this.urlPageTitle}`,
        description:
          'Calculate proportions quickly with the Percentage calculator.',
        Utility: () => import('./modules/calculators/Percentage'),
      },
      '/calculators/ruleofthree': {
        route: '/routes/calculators/ruleOfThree.html',
        title: `Rule of Three | ${this.urlPageTitle}`,
        description:
          'Calculate proportions quickly with the Rule of Three calculator.',
        Utility: () => import('./modules/calculators/RuleOfThree'),
      },
      // Other routes go here...
    };

    // Event listeners
    document
      .querySelector('#app')
      .addEventListener('click', this.urlRoute.bind(this));
    document
      .querySelector('#app')
      .addEventListener('click', this.hamburgerUrlRoute.bind(this));
    window.onpopstate = this.urlLocationHandler.bind(this);
    window.route = this.urlRoute.bind(this);

    // Initial url handler
    this.urlLocationHandler().then((r) => r);
  }

  /**
   * Fetches the HTML content for a given route.
   *
   * @param {Object} route - The route object.
   * @returns {Promise<string>} The HTML content.
   */
  async getHtmlContent(route) {
    try {
      const response = await fetch(route.route);
      return response.text();
    } catch (error) {
      console.error('Error fetching route:', error);
      return `<div>Error loading content.</div>`;
    }
  }

  /**
   * Handles URL changes and updates the content accordingly.
   */
  async urlLocationHandler() {
    document.querySelector('#app #content').innerHTML = this.loadingHTML;

    let location = window.location.pathname;
    if (location.length === 0) location = '/';

    const route = this.urlRoutes[location] || this.urlRoutes['404'];
    const html = await this.getHtmlContent(route);

    // Remove event listeners for current utility if it exists
    if (
      this.currentUtility &&
      typeof this.currentUtility.removeEventListeners === 'function'
    ) {
      this.currentUtility.removeEventListeners();
      this.currentUtility = null;
    }

    // Remove active class from all sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar__nav__link');
    sidebarLinks.forEach((link) => link.classList.remove('active-link'));

    // Adds active class to the selected sidebar link
    const activeLink = [...sidebarLinks].find(
      (link) => link.pathname === location,
    );
    if (activeLink) activeLink.classList.add('active-link');

    // Display the html content
    document.querySelector('#app #content').innerHTML = html;

    // Initialize utility if utility class is defined in the route
    if (route.Utility) {
      route.Utility().then((UtilityModule) => {
        const UtilityClass = UtilityModule.default;
        this.currentUtility = new UtilityClass();
      });
    }

    // Sets the Head title and meta description for the current route
    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', route.description);
  }

  /**
   * Changes the URL route and set the state in the history api.
   *
   * @param {string} href - The new URL route.
   */
  changeRoute(href) {
    if (window.location.pathname === href) {
      window.history.replaceState({}, '', href);
    } else {
      window.history.pushState({}, '', href);
    }
    this.urlLocationHandler().then((r) => r);
  }

  /**
   * Handles the state and routes of the hamburger menu.
   *
   * @param {Event} event - The click event.
   */
  hamburgerUrlRoute(event) {
    const linkElement = event.target.closest('.hamburger__menu__nav__link');
    if (!linkElement) return;

    event.preventDefault();
    event.stopPropagation();

    this.changeRoute(linkElement.href);

    // Close the hamburger menu
    const menuMobile = document.querySelector('.hamburger__menu__nav');
    menuMobile.classList.remove('active');
  }

  /**
   * Handles URL route changes via the sidebar.
   *
   * @param {Event} event - The click event.
   */
  urlRoute(event) {
    const linkElement = event.target.closest('.sidebar__nav__link');
    if (!linkElement) return;

    event.preventDefault();
    event.stopPropagation();

    this.changeRoute(linkElement.href);
  }
}

export default AppRouter;
