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
      dropdown.previousElementSibling.addEventListener('click', () => {
        // eslint-disable-next-line no-param-reassign
        dropdown.style.display =
          dropdown.style.display === 'block' ? 'none' : 'block';
      });
    });
  }

  addMediaQueryListener() {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleTabletChange = (e) => {
      if (e.matches) {
        this.sidenav.style.width = '250px';
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
      this.sidenav.style.width = expanded ? '0' : '250px';
    });
  }
}

export default Sidebar;
