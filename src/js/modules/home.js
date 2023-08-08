class Home {
  constructor() {
    this.userIpAddress = document.querySelector('#userIpAddress');
    this.userBrowserName = document.querySelector('#userBrowser');
    this.userOperatingSystem = document.querySelector('#userOS');

    this.randomJokes = document.querySelector('.home__jokes-list');

    this.bindings();
    this.getUserIpAddress();
    this.getUserBrowserName();
    this.getUserOperatingSystem();
    this.getJokes();
  }

  // User Info Block
  async getUserIpAddress() {
    this.userIpAddress.textContent = 'Loading...';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      this.userIpAddress.textContent = data.ip;
    } catch (error) {
      throw new Error(
        'There was a problem with the fetch operation:',
        error.message,
      );
    }
  }

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

  getUserOperatingSystem() {
    this.userOperatingSystem.textContent = 'Loading...';
    const osName = ((agent) => {
      if (agent.indexOf('win') !== -1) {
        return 'Windows';
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

  // Jokes Block
  getJokes() {
    this.randomJokes.innerHTML = 'Loading...';
    try {
      const categories = ['dev', 'movie', 'political'];
      const requests = categories.map((category) =>
        fetch(`https://api.chucknorris.io/jokes/random?category=${category}`),
      );

      Promise.all(requests)
        .then((responses) =>
          Promise.all(responses.map((response) => response.json())),
        )
        .then((data) => {
          while (this.randomJokes.firstChild) {
            this.randomJokes.removeChild(this.randomJokes.firstChild);
          }

          data.forEach((joke) => {
            const li = document.createElement('li');
            li.textContent = joke.value;
            li.id = joke.id;
            this.randomJokes.appendChild(li);
          });
        })
        .catch((error) => {
          const li = document.createElement('li');
          li.textContent = 'Failed to load jokes. Please try again later.';
          this.randomJokes.appendChild(li);
          throw new Error('Error fetching jokes:', error);
        });
    } catch (error) {
      const li = document.createElement('li');
      li.textContent = 'Failed to load jokes. Please try again later.';
      this.randomJokes.appendChild(li);
      throw new Error('Error:', error);
    }
  }

  bindings() {
    this.getUserIpAddress = this.getUserIpAddress.bind(this);
    this.getUserBrowserName = this.getUserBrowserName.bind(this);
    this.getUserOperatingSystem = this.getUserOperatingSystem.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }
}

export default Home;
