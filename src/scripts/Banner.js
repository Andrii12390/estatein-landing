class Banner {
  selectors = {
    root: '[data-js-banner]',
    closeButton: '[data-js-close-banner-button]',
  };

  stateClasses = {
    isClosed: 'is-closed',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.closeBannerButtonElement = this.rootElement.querySelector(this.selectors.closeButton);
    this.initEvents();
  }

  handleClose = () => {
    this.rootElement.classList.add(this.stateClasses.isClosed);
  };

  initEvents() {
    this.closeBannerButtonElement.addEventListener('click', this.handleClose);
  }
}

export default Banner;
