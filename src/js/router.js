// Converters
import TemperatureConverter from './modules/converters/tempConverter';
import LengthConverter from './modules/converters/lengthConverter';
import MassConverter from './modules/converters/massConverter';
import SpeedConverter from './modules/converters/speedConverter';
import TimeConverter from './modules/converters/timeConverter';

// Calculators
import BmiCalculator from './modules/calculators/bmiCalculator';

// Utilities
import CharacterCounter from './modules/utilities/characterCounter';
import PasswordGenerator from './modules/utilities/passwordGenerator';
import Calculator from './modules/utilities/calculator';

class AppRouter {
  constructor() {
    this.urlPageTitle = 'Utilities App';
    this.currentUtility = null;
    this.loadingHTML = `
      <div id="loading" class="loading__container">
        <div class="loading__loader"></div>
      </div>
    `;
    this.urlRoutes = {
      404: {
        route: '/routes/404.html',
        title: `404 | ${this.urlPageTitle}`,
        description: 'Page not found',
        Utility: null,
      },
      '/': {
        route: '/routes/home.html',
        title: `Home | ${this.urlPageTitle}`,
        description: 'This is the home page',
        Utility: null,
      },
      '/styleguide': {
        route: '/routes/styleguide.html',
        title: `Styleguide | ${this.urlPageTitle}`,
        description: 'This is the styleguide page',
        Utility: null,
      },
      '/utilities/calculator': {
        route: '/routes/utilities/calculator.html',
        title: `Calculator | ${this.urlPageTitle}`,
        description: 'This is the calculator page',
        Utility: Calculator,
      },
      '/utilities/charactercounter': {
        route: '/routes/utilities/characterCounter.html',
        title: `Character Counter | ${this.urlPageTitle}`,
        description: 'This is the character counter page',
        Utility: CharacterCounter,
      },
      '/utilities/passwordgenerator': {
        route: '/routes/utilities/passwordGenerator.html',
        title: `Password Generator | ${this.urlPageTitle}`,
        description: 'This is the password generator page',
        Utility: PasswordGenerator,
      },
      '/calculators/bmi': {
        route: '/routes/calculators/bmi.html',
        title: `BMI | ${this.urlPageTitle}`,
        description: 'This is the bmi calculator page',
        Utility: BmiCalculator,
      },
      '/converters/temperature': {
        route: '/routes/converters/temperatureConverter.html',
        title: `Temperature Converter | ${this.urlPageTitle}`,
        description: 'This is the temperature converter page',
        Utility: TemperatureConverter,
      },
      '/converters/length': {
        route: '/routes/converters/lengthConverter.html',
        title: `Length Converter | ${this.urlPageTitle}`,
        description: 'This is the length converter page',
        Utility: LengthConverter,
      },
      '/converters/mass': {
        route: '/routes/converters/massConverter.html',
        title: `Mass Converter | ${this.urlPageTitle}`,
        description: 'This is the mass converter page',
        Utility: MassConverter,
      },
      '/converters/speed': {
        route: '/routes/converters/speedConverter.html',
        title: `Speed Converter | ${this.urlPageTitle}`,
        description: 'This is the speed converter page',
        Utility: SpeedConverter,
      },
      '/converters/time': {
        route: '/routes/converters/timeConverter.html',
        title: `Time Converter | ${this.urlPageTitle}`,
        description: 'This is the time converter page',
        Utility: TimeConverter,
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
    if (this.currentUtility) {
      this.currentUtility.removeEventListeners();
      this.currentUtility = null;
    }

    const sidebarLinks = document.querySelectorAll('.sidebar__nav__link');
    sidebarLinks.forEach((link) => link.classList.remove('active-link'));

    const activeLink = [...sidebarLinks].find(
      (link) => link.pathname === location,
    );
    if (activeLink) activeLink.classList.add('active-link');

    document.querySelector('#app #content').innerHTML = html;

    // Initialize utility if utility class is defined in the route
    if (route.Utility) this.currentUtility = new route.Utility();

    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', route.description);
  }

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
