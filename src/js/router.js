import TemperatureConverter from './modules/tempConverter';
import TimeConverter from './modules/timeConverter';

class AppRouter {
  constructor() {
    this.urlPageTitle = 'Utilities Web App';
    this.currentUtility = null;
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
      '/converters/temperature': {
        route: '/routes/converters/temperatureConverter.html',
        title: `Temperature Converter | ${this.urlPageTitle}`,
        description: 'This is the temperature converter page',
        Utility: TemperatureConverter,
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

  async urlLocationHandler() {
    let location = window.location.pathname;
    if (location.length === 0) location = '/';

    const route = this.urlRoutes[location] || this.urlRoutes['404'];
    const html = await fetch(route.route).then((response) => response.text());

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
