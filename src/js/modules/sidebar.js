class Sidebar {
  constructor(sidenav, dropdowns, burger) {
    this.sidenav = sidenav;
    this.dropdowns = dropdowns;
    this.burger = burger;

    this.addDropdownListeners();
    this.addMediaQueryListener();
    this.addBurgerListener();
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
      this.burger.setAttribute('aria-expanded', !expanded);
      this.sidenav.style.width = expanded ? '0' : '15.625rem';
    });
  }
}

export default Sidebar;
