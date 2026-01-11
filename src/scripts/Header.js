class Header {
  selectors = {
    root: '[data-js-header]',
    burgerButton: '[data-js-burger-button]',
    navbar: '[data-js-nav]',
  };

  stateClasses = {
    isActiveBurgerButton: 'is-active',
    isOpenNavbar: 'is-open',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
    this.navbarElement = this.rootElement.querySelector(this.selectors.navbar);

    this.init();
  }

  toggleNavbar = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActiveBurgerButton);
    this.navbarElement.classList.toggle(this.stateClasses.isOpenNavbar);
  };

  handleLinkClick = e => {
    const currentElement = e.target;

    if (currentElement.classList.contains('header__nav-link')) {
      this.navbarElement.classList.remove(this.stateClasses.isOpenNavbar);
      this.burgerButtonElement.classList.remove(this.stateClasses.isActiveBurgerButton);
    }
  };

  init() {
    this.burgerButtonElement.addEventListener('click', this.toggleNavbar);
    this.navbarElement.addEventListener('click', this.handleLinkClick);
  }
}

export default Header;
