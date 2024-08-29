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

    this.bindEventHandlers();
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

    const agent = navigator.userAgent.toLowerCase();
    let browserName = 'Other or Unknown Browser';

    const browserList = [
      { name: 'Microsoft Edge (Chromium Based)', regex: /edg\//i },
      { name: 'Microsoft Edge', regex: /edge/i },
      { name: 'Opera', regex: /opr/i, condition: () => !!window.opr },
      { name: 'Chrome', regex: /chrome/i, condition: () => !!window.chrome },
      { name: 'MS IE', regex: /trident/i },
      { name: 'Mozilla Firefox', regex: /firefox/i },
      { name: 'Safari', regex: /safari/i },
    ];

    browserList.some((browser) => {
      if (
        browser.regex.test(agent) &&
        (!browser.condition || browser.condition())
      ) {
        browserName = browser.name;
        return true;
      }
      return false;
    });

    this.userBrowserName.textContent = browserName;
  }

  /**
   * Determines the user's operating system and displays it on the page.
   */
  getUserOperatingSystem() {
    this.userOperatingSystem.textContent = 'Loading...';

    const agent = navigator.userAgent;
    let osName = 'Other or Unknown OS';

    const osList = [
      { name: 'Windows NT', regex: /Windows NT/i },
      { name: 'Mac', regex: /Mac OS X/i },
      { name: 'Linux', regex: /Linux/i },
      { name: 'Android', regex: /Android/i },
      { name: 'iOS', regex: /(iPhone|iPad|iPod)/i },
      { name: 'UNIX', regex: /X11/i },
    ];

    osList.some((os) => {
      if (os.regex.test(agent)) {
        osName = os.name;
        return true;
      }
      return false;
    });

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
  bindEventHandlers() {
    this.getUserIpAddress = this.getUserIpAddress.bind(this);
    this.getUserBrowserName = this.getUserBrowserName.bind(this);
    this.getUserOperatingSystem = this.getUserOperatingSystem.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }
}

export default Home;
