class Sidebar {
  constructor(sidenav, dropdowns, burger, navLinks) {
    this.sidenav = sidenav;
    this.dropdowns = dropdowns;
    this.burger = burger;
    this.navLinks = navLinks;

    this.addDropdownListeners();
    this.addMediaQueryListener();
    this.addBurgerListener();
    this.addNavLinksListener();
    this.addOutsideClickListener();
  }

  closeNav() {
    this.sidenav.style.width = '0';
    this.burger.setAttribute('aria-expanded', false);
    this.burger.querySelector('.material-icons').textContent = 'menu';
  }

  openNav() {
    this.sidenav.style.width = '15.625rem';
    this.burger.setAttribute('aria-expanded', true);
    this.burger.querySelector('.material-icons').textContent = 'close';
  }

  addDropdownListeners() {
    this.dropdowns.forEach((dropdownElem) => {
      const dropdown = dropdownElem;
      const dropdownArrow =
        dropdown.previousElementSibling.querySelector('.dropdown-icon');

      dropdown.previousElementSibling.addEventListener('click', () => {
        // eslint-disable-next-line no-param-reassign
        dropdown.style.display =
          dropdown.style.display === 'block' ? 'none' : 'block';

        dropdownArrow.textContent =
          dropdownArrow.textContent === 'arrow_drop_down'
            ? 'arrow_drop_up'
            : 'arrow_drop_down';
      });
    });
  }

  addMediaQueryListener() {
    const mediaQuery = window.matchMedia('(min-width: 48rem)');

    const handleTabletChange = (e) => {
      if (e.matches) {
        this.sidenav.style.width = '15.625rem';
        this.burger.style.display = 'none';
      } else {
        this.sidenav.style.width = '0';
        this.burger.style.display = 'block';
      }
    };

    mediaQuery.addEventListener('change', handleTabletChange);
    handleTabletChange(mediaQuery); // Call listener function at run time
  }

  addBurgerListener() {
    this.burger.addEventListener('click', () => {
      const expanded = this.burger.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        this.closeNav();
      } else {
        this.openNav();
      }
    });
  }

  addNavLinksListener() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 48rem)').matches) {
          this.closeNav();
        }
      });
    });
  }

  addOutsideClickListener() {
    document.addEventListener('click', (event) => {
      if (
        !this.sidenav.contains(event.target) &&
        !this.burger.contains(event.target)
      ) {
        if (window.matchMedia('(max-width: 48rem)').matches) {
          this.closeNav();
        }
      }
    });
  }
}

export default Sidebar;
