import TemperatureConverter from './modules/converters/tempConverter';
import LengthConverter from './modules/converters/lengthConverter';
import MassConverter from './modules/converters/massConverter';
import SpeedConverter from './modules/converters/speedConverter';
import TimeConverter from './modules/converters/timeConverter';
import BmiCalculator from './modules/calculators/bmiCalculator';
import CharacterCounter from './modules/utilities/characterCounter';
import PasswordGenerator from './modules/utilities/passwordGenerator';

class AppRouter {
  constructor() {
    this.urlPageTitle = 'Utilities Web App';
    this.currentUtility = null;
    this.urlRoutes = {
      '/loading': {
        route: '/routes/utils/loading.html',
        title: `Loading...`,
        description: 'This is the loading page!',
        Utility: null,
      },
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
      '/utilities/characterCounter': {
        route: '/routes/utilities/characterCounter.html',
        title: `Character Counter | ${this.urlPageTitle}`,
        description: 'This is the character counter page',
        Utility: CharacterCounter,
      },
      '/utilities/passwordGenerator': {
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
    document.addEventListener('click', this.urlRoute.bind(this));
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
    const loadingRoute = this.urlRoutes['/loading'];
    document.querySelector('#app #content').innerHTML =
      await this.getHtmlContent(loadingRoute);

    let location = window.location.pathname;
    if (location.length === 0) location = '/';

    const route = this.urlRoutes[location] || this.urlRoutes['404'];
    const html = await this.getHtmlContent(route);

    // Remove event listeners for current utility if it exists
    if (this.currentUtility) {
      this.currentUtility.removeEventListeners();
      this.currentUtility = null;
    }

    document.querySelector('#app #content').innerHTML = html;

    // Initialize utility if utility class is defined in the route
    if (route.Utility) this.currentUtility = new route.Utility();

    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', route.description);
  }

  urlRoute(event) {
    const { target } = event;
    if (!target.matches('nav a')) return;

    event.preventDefault();
    window.history.pushState({}, '', target.href);
    this.urlLocationHandler();
  }
}

export default AppRouter;
