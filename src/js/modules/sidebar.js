class Sidebar {
  constructor() {
    // Identify and initialize buttons for menu controls
    this.menuMobileBtn = document.querySelector('.hamburger__menu__button');
    // set initial state
    this.menuMobileBtn.setAttribute('role', 'button');
    this.menuMobileBtn.setAttribute('aria-expanded', 'false');
    this.menuMobileBtn.setAttribute('aria-label', 'Open menu');

    // Menu Mobile Button (to close menu)
    this.menuMobileBtnClose = document.querySelector(
      '.hamburger__menu__button__close',
    );
    // set initial state
    this.menuMobileBtnClose.setAttribute('role', 'button');
    this.menuMobileBtnClose.setAttribute('aria-expanded', 'false');
    this.menuMobileBtnClose.setAttribute('aria-label', 'Close menu');

    // Identify menu and sidebar navigation elements
    this.menuMobile = document.querySelector('.hamburger__menu__nav');
    this.sidebarNav = document.querySelector('.sidebar__nav');

    // Identify container for menu links
    this.menuMobileLinks = document.querySelector('.hamburger__menu__links');

    // The links in the menu
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
            href: '/utilities/roman_converter',
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
            name: 'Rule of 3',
            icon: 'ri-tree-line',
            href: '/calculators/ruleofthree',
          },
        ],
      },
    ];

    // Set initial state for mobile or desktop layout
    this.isMobile = window.innerWidth <= 480;
    if (this.isMobile) this.init(this.menuMobile, true);
    else this.init(this.sidebarNav, false);

    // Update layout on window resize
    window.addEventListener('resize', () => {
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
    });

    // Event listener for menu button click (open menu)
    this.menuMobileBtn.addEventListener('click', async () => {
      this.menuMobile.classList.add('active');
      this.menuMobileBtn.setAttribute('aria-expanded', 'true');
      this.menuMobileBtnClose.setAttribute('aria-expanded', 'true');
      this.menuMobileBtnClose.setAttribute('aria-label', 'Close menu');

      const { default: ThemeSwitcher } = await import('./themeSwitcher');
      this.themeSwitcher = new ThemeSwitcher();
    });

    // Event listener for close button click (close menu)
    this.menuMobileBtnClose.addEventListener('click', () => {
      this.menuMobile.classList.remove('active');
      this.menuMobileBtn.setAttribute('aria-expanded', 'false');
      this.menuMobileBtnClose.setAttribute('aria-expanded', 'false');
      this.menuMobileBtn.setAttribute('aria-label', 'Open menu');
    });
  }

  // Method to initialize the container with the appropriate links
  init(container, isMobile) {
    this.createLinks(container, isMobile);
  }

  // Method to clear links from the specified container
  clearLinks(container) {
    const linkContainer =
      container === this.menuMobile ? this.menuMobileLinks : this.sidebarNav;
    if (!linkContainer) return;

    while (linkContainer.firstChild) {
      linkContainer.removeChild(linkContainer.firstChild);
    }
  }

  // Method to create links in the specified container
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

  // Method to create a single link
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
}

export default Sidebar;
