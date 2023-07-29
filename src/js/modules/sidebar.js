class Sidebar {
  constructor() {
    this.menuMobileBtn = document.querySelector('.hamburger__menu__button');
    this.menuMobileBtnClose = document.querySelector(
      '.hamburger__menu__button__close',
    );
    this.menuMobile = document.querySelector('.hamburger__menu__nav');

    this.menuMobileBtn.addEventListener('click', async () => {
      this.menuMobile.classList.add('active');
      const { default: ThemeSwitcher } = await import('./themeSwitcher');
      this.themeSwitcher = new ThemeSwitcher();
    });

    this.menuMobileBtnClose.addEventListener('click', () => {
      this.menuMobile.classList.remove('active');
    });
  }
}

export default Sidebar;
