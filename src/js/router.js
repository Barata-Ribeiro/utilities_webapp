class AppRouter {
  constructor() {
    this.urlPageTitle = 'Utilities App';
    this.currentUtility = null;

    // Loading
    this.loadingHTML = `
      <div id="loading" class="loading__container">
        <div class="loading__loader"></div>
      </div>
    `;

    // Routes
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
        Utility: () => import('./modules/home'),
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
        Utility: () => import('./modules/utilities/calculator'),
      },
      '/utilities/charactercounter': {
        route: '/routes/utilities/characterCounter.html',
        title: `Character Counter | ${this.urlPageTitle}`,
        description:
          'Count characters, words, and paragraphs for precise content creation.',
        Utility: () => import('./modules/utilities/characterCounter'),
      },
      '/utilities/passwordgenerator': {
        route: '/routes/utilities/passwordGenerator.html',
        title: `Password Generator | ${this.urlPageTitle}`,
        description:
          'Create strong, secure passwords with our advanced generator tool.',
        Utility: () => import('./modules/utilities/passwordGenerator'),
      },
      '/utilities/roman_converter': {
        route: '/routes/utilities/romanConverter.html',
        title: `Roman Converter | ${this.urlPageTitle}`,
        description: 'Convert numbers to and from Roman numerals with ease.',
        Utility: () => import('./modules/utilities/romanConverter'),
      },
      '/converters/temperature': {
        route: '/routes/converters/temperatureConverter.html',
        title: `Temperature Converter | ${this.urlPageTitle}`,
        description:
          'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
        Utility: () => import('./modules/converters/tempConverter'),
      },
      '/converters/length': {
        route: '/routes/converters/lengthConverter.html',
        title: `Length Converter | ${this.urlPageTitle}`,
        description: 'Convert measurements of length across various units.',
        Utility: () => import('./modules/converters/lengthConverter'),
      },
      '/converters/mass': {
        route: '/routes/converters/massConverter.html',
        title: `Mass Converter | ${this.urlPageTitle}`,
        description: 'Effortlessly convert between different mass units.',
        Utility: () => import('./modules/converters/massConverter'),
      },
      '/converters/speed': {
        route: '/routes/converters/speedConverter.html',
        title: `Speed Converter | ${this.urlPageTitle}`,
        description:
          'Convert speed measurements across miles per hour, kilometers per hour, and more.',
        Utility: () => import('./modules/converters/speedConverter'),
      },
      '/converters/time': {
        route: '/routes/converters/timeConverter.html',
        title: `Time Converter | ${this.urlPageTitle}`,
        description: 'Easily convert between various time units.',
        Utility: () => import('./modules/converters/timeConverter'),
      },
      '/calculators/bmi': {
        route: '/routes/calculators/bmi.html',
        title: `BMI Calculator | ${this.urlPageTitle}`,
        description:
          'Determine your Body Mass Index and understand your health metrics.',
        Utility: () => import('./modules/calculators/bmiCalculator'),
      },
      '/calculators/ruleofthree': {
        route: '/routes/calculators/ruleOfThree.html',
        title: `Rule of Three | ${this.urlPageTitle}`,
        description:
          'Calculate proportions quickly with the Rule of Three calculator.',
        Utility: () => import('./modules/calculators/ruleofThree'),
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
    this.urlLocationHandler();
  }

  // Gets the html content for the given route
  async getHtmlContent(route) {
    return await fetch(route.route).then((response) => response.text());
  }

  async urlLocationHandler() {
    // Display loading page
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

  // Handles the hamburger menu state and url routes
  hamburgerUrlRoute(event) {
    const linkElement = event.target.closest('.hamburger__menu__nav__link');
    if (!linkElement) return;

    event.preventDefault();
    event.stopPropagation();
    window.history.pushState({}, '', linkElement.href);

    // Close the hamburger menu
    const menuMobile = document.querySelector('.hamburger__menu__nav');
    menuMobile.classList.remove('active');

    this.urlLocationHandler();
  }

  // Handles the url route
  urlRoute(event) {
    const linkElement = event.target.closest('.sidebar__nav__link');
    if (!linkElement) return;

    event.preventDefault();
    event.stopPropagation();
    window.history.pushState({}, '', linkElement.href);
    this.urlLocationHandler();
  }
}

export default AppRouter;
