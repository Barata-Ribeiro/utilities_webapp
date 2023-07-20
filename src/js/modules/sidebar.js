class Sidebar {
  constructor() {
    this.toggle = document.getElementById('header-toggle');
    this.sidebar = document.getElementById('sidebar');
    this.content = document.getElementById('content');

    this.linkColor = this.linkColor.bind(this);

    this.sidebarLink = document.querySelectorAll('.sidebar__link');

    this.addEventListeners();
    this.showSidebar();
  }

  showSidebar() {
    if (this.toggle && this.sidebar && this.content) {
      this.toggle.addEventListener('click', () => {
        this.sidebar.classList.toggle('show-sidebar');
        this.content.classList.toggle('main-pd');
      });
    }
  }

  linkColor(event) {
    this.sidebarLink.forEach((link) => link.classList.remove('active-link'));
    event.target.classList.add('active-link');
  }

  addEventListeners() {
    this.sidebarLink.forEach((link) =>
      link.addEventListener('click', this.linkColor),
    );
  }
}

export default Sidebar;
