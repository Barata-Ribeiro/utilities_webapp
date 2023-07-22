class Sidebar {
  constructor() {
    this.toggle = document.getElementById('header-toggle');
    this.sidebar = document.getElementById('sidebar');
    this.content = document.getElementById('content');

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
}

export default Sidebar;
