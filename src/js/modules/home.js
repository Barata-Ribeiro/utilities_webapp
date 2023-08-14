/**
 * Home Class
 * Responsible for rendering and managing user details and random jokes on the page.
 */
class Home {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    this.userIpAddress = document.querySelector('#userIpAddress');
    this.userBrowserName = document.querySelector('#userBrowser');
    this.userOperatingSystem = document.querySelector('#userOS');

    this.randomJokes = document.querySelector('.home__jokes-list');

    this.bindings();
    this.init();
  }

  /**
   * Initial method to fetch and display user details and jokes.
   */
  async init() {
    try {
      await this.getUserIpAddress();
      this.getUserBrowserName();
      this.getUserOperatingSystem();
      await this.getJokes();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  /**
   * Fetches the user's IP address and displays it on the page.
   */
  async getUserIpAddress() {
    this.userIpAddress.textContent = 'Loading...';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      this.userIpAddress.textContent = data.ip;
    } catch (error) {
      this.userIpAddress.textContent = 'Failed to load IP Address';
      // eslint-disable-next-line no-console
      console.error(
        'There was a problem with the fetch operation:',
        error.message,
      );
    }
  }

  /**
   * Determines the user's browser name and displays it on the page.
   */
  getUserBrowserName() {
    this.userBrowserName.textContent = 'Loading...';
    const browserName = ((agent) => {
      switch (true) {
        case agent.indexOf('edge') > -1:
          return 'Microsft Edge';
        case agent.indexOf('edg/') > -1:
          return 'Microsoft Edge (Chromium Based)';
        case agent.indexOf('opr') > -1 && !!window.opr:
          return 'Opera';
        case agent.indexOf('chrome') > -1 && !!window.chrome:
          return 'Chrome';
        case agent.indexOf('trident') > -1:
          return 'MS IE';
        case agent.indexOf('firefox') > -1:
          return 'Mozilla Firefox';
        case agent.indexOf('safari') > -1:
          return 'Safari';
        default:
          return 'Other or Unknown Browser';
      }
    })(window.navigator.userAgent.toLowerCase());
    this.userBrowserName.textContent = browserName;
  }

  /**
   * Determines the user's operating system and displays it on the page.
   */
  getUserOperatingSystem() {
    this.userOperatingSystem.textContent = 'Loading...';
    const osName = ((agent) => {
      if (agent.indexOf('win') !== -1) {
        return 'Windows NT';
      }
      if (agent.indexOf('mac') !== -1) {
        return 'Mac';
      }
      if (agent.indexOf('linux') !== -1) {
        return 'Linux';
      }
      if (agent.indexOf('android') !== -1) {
        return 'Android';
      }
      if (
        agent.indexOf('iphone') !== -1 ||
        agent.indexOf('ipad') !== -1 ||
        agent.indexOf('ipod') !== -1
      ) {
        return 'iOS';
      }
      if (agent.indexOf('x11') !== -1) {
        return 'UNIX';
      }
      return 'Other or Unknown OS';
    })(navigator.userAgent.toLowerCase());
    this.userOperatingSystem.textContent = osName;
  }

  /**
   * Fetches random jokes from different categories and displays them on the page.
   */
  async getJokes() {
    this.randomJokes.innerHTML = 'Loading...';
    try {
      const categories = ['dev', 'movie', 'political'];
      const data = await Promise.all(
        categories.map((category) =>
          fetch(
            `https://api.chucknorris.io/jokes/random?category=${category}`,
          ).then((response) => {
            if (!response.ok) throw new Error('Failed to fetch joke');
            return response.json();
          }),
        ),
      );

      this.randomJokes.innerHTML = '';
      data.forEach((joke) => {
        const li = document.createElement('li');
        li.textContent = joke.value;
        li.id = joke.id;
        this.randomJokes.appendChild(li);
      });
    } catch (error) {
      this.displayErrorMessage(
        this.randomJokes,
        'Failed to load jokes. Please try again later.',
      );
      // eslint-disable-next-line no-console
      console.error('Error fetching jokes:', error);
    }
  }

  /**
   * Utility method to display error messages on specified elements.
   * @param {HTMLElement} element - The element to append the error message to.
   * @param {string} message - The error message to display.
   */
  displayErrorMessage(element, message) {
    const li = document.createElement('li');
    li.textContent = message;
    element.appendChild(li);
  }

  /**
   * Binds methods to the current instance of the class.
   */
  bindings() {
    this.getUserIpAddress = this.getUserIpAddress.bind(this);
    this.getUserBrowserName = this.getUserBrowserName.bind(this);
    this.getUserOperatingSystem = this.getUserOperatingSystem.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }
}

export default Home;
