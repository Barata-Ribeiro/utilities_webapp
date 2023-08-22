/**
 * Class that represents the application side bar for navigation.
 */
class Sidebar {
  /**
   * Initializes the class, setting up default properties and initial methods to run.
   */
  constructor() {
    /** @type {HTMLElement} Represents the button for opening the mobile menu. */
    this.menuMobileBtn = document.querySelector('.hamburger__menu__button');
    this.menuMobileBtn.setAttribute('role', 'button');
    this.menuMobileBtn.setAttribute('aria-expanded', 'false');
    this.menuMobileBtn.setAttribute('aria-label', 'Open menu');

    /** @type {HTMLElement} Represents the button for closing mobile menu. */
    this.menuMobileBtnClose = document.querySelector(
      '.hamburger__menu__button__close',
    );
    this.menuMobileBtnClose.setAttribute('role', 'button');
    this.menuMobileBtnClose.setAttribute('aria-expanded', 'false');
    this.menuMobileBtnClose.setAttribute('aria-label', 'Close menu');

    /**
     * @type {HTMLElement} Represents the mobile navigation container.
     */
    this.menuMobile = document.querySelector('.hamburger__menu__nav');

    /**
     * @type {HTMLElement} Represents the sidebar navigation container.
     */
    this.sidebarNav = document.querySelector('.sidebar__nav');

    /** @type {HTMLElement} Represents the container for mobile navigation links. */
    this.menuMobileLinks = document.querySelector('.hamburger__menu__links');

    /**
     * @type {Array.<{name: string, icon?: string, href?: string, type: string, links?: Array.<Object>}>}
     * Represents navigation links configuration.
     */
    this.links = [
      {
        name: 'Home',
        icon: 'ri-home-7-line',
        href: '/',
        type: 'link',
      },
      {
        name: 'About',
        icon: 'ri-article-line',
        href: '/about',
        type: 'link',
      },
      {
        name: 'Style Guide',
        icon: 'ri-palette-line',
        href: '/styleguide',
        type: 'link',
      },
      {
        name: 'Utilities',
        type: 'header',
        links: [
          {
            name: 'Calculator',
            icon: 'ri-calculator-line',
            href: '/utilities/calculator',
          },
          {
            name: 'Char. Counter',
            icon: 'ri-character-recognition-line',
            href: '/utilities/charactercounter',
          },
          {
            name: 'Pass. Generator',
            icon: 'ri-lock-password-line',
            href: '/utilities/passwordgenerator',
          },
          {
            name: 'Roman Converter',
            icon: 'ri-swap-box-line',
            href: '/utilities/romanconverter',
          },
        ],
      },
      {
        name: 'Converters',
        type: 'header',
        links: [
          {
            name: 'Temperature',
            icon: 'ri-temp-hot-line',
            href: '/converters/temperature',
          },
          {
            name: 'Length',
            icon: 'ri-ruler-line',
            href: '/converters/length',
          },
          {
            name: 'Mass',
            icon: 'ri-scales-3-line',
            href: '/converters/mass',
          },
          {
            name: 'Speed',
            icon: 'ri-speed-up-line',
            href: '/converters/speed',
          },
          {
            name: 'Time',
            icon: 'ri-history-line',
            href: '/converters/time',
          },
        ],
      },
      {
        name: 'Calculators',
        type: 'header',
        links: [
          {
            name: 'BMI',
            icon: 'ri-scales-2-line',
            href: '/calculators/bmi',
          },
          {
            name: 'Percentage',
            icon: 'ri-percent-line',
            href: '/calculators/percentage',
          },
          {
            name: 'Rule of 3',
            icon: 'ri-tree-line',
            href: '/calculators/ruleofthree',
          },
        ],
      },
    ];

    /** @type {boolean} Represents if the UI is in mobile layout. */
    this.isMobile = window.innerWidth <= 480;
    if (this.isMobile) this.init(this.menuMobile, true);
    else this.init(this.sidebarNav, false);

    this.bindings();

    window.addEventListener('resize', this.handleResize);
    this.menuMobileBtn.addEventListener('click', this.handleMenuOpen);
    this.menuMobileBtnClose.addEventListener('click', this.handleMenuClose);
  }

  /**
   * Initializes the container with the appropriate links.
   * @param {HTMLElement} container - The container for placing the links.
   * @param {boolean} isMobile - Represents if the UI is in mobile layout.
   */
  init(container, isMobile) {
    this.createLinks(container, isMobile);
  }

  /**
   * Removes links from the specified container.
   * @param {HTMLElement} container - The container from which the links are removed.
   */
  clearLinks(container) {
    const linkContainer =
      container === this.menuMobile ? this.menuMobileLinks : this.sidebarNav;
    if (!linkContainer) return;

    while (linkContainer.firstChild) {
      linkContainer.removeChild(linkContainer.firstChild);
    }
  }

  /**
   * Creates links in the specified container based on the `links` configuration.
   * @param {HTMLElement} container - The container where links are placed.
   * @param {boolean} isMobile - Represents if the UI is in mobile layout.
   */
  createLinks(container, isMobile) {
    const linkContainer = isMobile ? this.menuMobileLinks : this.sidebarNav;

    this.links.forEach((link) => {
      if (link.type === 'header') {
        // Header link creation
        const header = document.createElement('h3');
        header.className = isMobile
          ? 'hamburger__menu__nav__heading'
          : 'sidebar__nav__heading';
        header.textContent = link.name;
        linkContainer.appendChild(header);

        // Sublink creation
        link.links.forEach((sublink) => {
          const a = this.createLink(sublink, isMobile);
          linkContainer.appendChild(a);
        });
      } else if (link.type === 'link') {
        // Single link creation
        const a = this.createLink(link, isMobile);
        linkContainer.appendChild(a);
      }
    });
  }

  /**
   * Creates a single link.
   * @param {Object} link - The link configuration.
   * @param {boolean} isHamburgerMenu - Represents if the link is for mobile layout.
   * @returns {HTMLElement} The anchor element created based on the link configuration.
   */
  createLink(link, isHamburgerMenu) {
    const a = document.createElement('a');
    a.className = isHamburgerMenu
      ? 'hamburger__menu__nav__link'
      : 'sidebar__nav__link';
    a.href = link.href;
    // Add a tabindex attribute to make the elements focusable
    a.setAttribute('tabindex', 0);

    // Creating wrapper span for icon and text
    const spanWrapper = document.createElement('span');
    spanWrapper.className = isHamburgerMenu
      ? 'hamburger__menu__nav__link__wrapper'
      : 'sidebar__nav__link__wrapper';

    // Creating icon for the link
    const i = document.createElement('i');
    i.className = `${link.icon} ${
      isHamburgerMenu
        ? 'hamburger__menu__nav__link__icon'
        : 'sidebar__nav__link__icon'
    }`;

    // Creating text for the link
    const spanText = document.createElement('span');
    spanText.className = isHamburgerMenu
      ? 'hamburger__menu__nav__link__text'
      : 'sidebar__nav__link__text';
    spanText.textContent = link.name;

    // Appending icon and text to the wrapper
    spanWrapper.appendChild(i);
    spanWrapper.appendChild(spanText);
    a.appendChild(spanWrapper);

    return a;
  }

  /**
   * Handles window resize and updates UI layout.
   */
  handleResize() {
    const nowIsMobile = window.innerWidth <= 480;
    if (nowIsMobile !== this.isMobile) {
      if (nowIsMobile) {
        this.clearLinks(this.sidebarNav);
        this.init(this.menuMobile, true);
      } else {
        this.clearLinks(this.menuMobile);
        this.init(this.sidebarNav, false);
      }
      this.isMobile = nowIsMobile;
    }
  }

  /**
   * Handles opening of mobile menu.
   */
  async handleMenuOpen() {
    this.menuMobile.classList.add('active');
    this.menuMobileBtn.setAttribute('aria-expanded', 'true');
    this.menuMobileBtnClose.setAttribute('aria-expanded', 'true');
    this.menuMobileBtnClose.setAttribute('aria-label', 'Close menu');

    const { default: ThemeSwitcher } = await import('./ThemeSwitcher');
    this.themeSwitcher = new ThemeSwitcher();
  }

  /**
   * Handles closing of mobile menu.
   */
  handleMenuClose() {
    this.menuMobile.classList.remove('active');
    this.menuMobileBtn.setAttribute('aria-expanded', 'false');
    this.menuMobileBtnClose.setAttribute('aria-expanded', 'false');
    this.menuMobileBtn.setAttribute('aria-label', 'Open menu');
  }

  /**
   * Binds methods to the current instance of the class.
   */
  bindings() {
    this.handleResize = this.handleResize.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }
}

export default Sidebar;
