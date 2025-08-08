class Faq {
  selectors = {
    root: '[data-js-faq]',
    grid: '[data-js-faq-grid]',
    pagination: '[data-js-faq-pagination]',
    prevButton: '[data-js-faq-pagination-prev]',
    nextButton: '[data-js-faq-pagination-next]',
    currentPage: '[data-js-faq-pagination-current]',
    totalPages: '[data-js-faq-pagination-total]',
  };

  stateClasses = {
    disabled: 'pagination__button--disabled',
    hidden: 'is-hidden',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    if (!this.rootElement) return;

    this.gridElement = this.rootElement.querySelector(this.selectors.grid);
    this.paginationElement = this.rootElement.querySelector(this.selectors.pagination);
    this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton);
    this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton);
    this.currentPageElement = this.rootElement.querySelector(this.selectors.currentPage);
    this.totalPagesElement = this.rootElement.querySelector(this.selectors.totalPages);

    this.currentPage = 1;
    this.allFAQ = [];

    this.initFAQ();
    this.initEvents();
    this.updatePagination();
    this.showCurrentPageItems();
  }

  getFAQData = () => {
    return [
      {
        title: 'How do I search for properties on Estatein?',
        text: 'Learn how to use our user-friendly search tools to find properties that match your criteria.',
      },
      {
        title: 'What documents do I need to sell my property through Estatein?',
        text: 'Find out about the necessary documentation for listing your property with us.',
      },
      {
        title: 'How can I contact an Estatein agent?',
        text: 'Discover the different ways you can get in touch with our experienced agents.',
      },
      {
        title: 'What are the fees associated with buying a property?',
        text: 'Learn about all the costs involved in purchasing a property through our platform.',
      },
      {
        title: 'How long does the property buying process take?',
        text: 'Understand the typical timeline for purchasing a property and what factors can affect it.',
      },
      {
        title: 'Can I get a mortgage through Estatein?',
        text: 'Find out about our mortgage services and how we can help you secure financing.',
      },
      {
        title: 'What areas does Estatein cover?',
        text: 'Learn about the geographic regions where we provide our real estate services.',
      },
      {
        title: 'How do I schedule a property viewing?',
        text: "Discover how easy it is to book a viewing appointment for properties you're interested in.",
      },
      {
        title: 'What happens after I make an offer on a property?',
        text: 'Understand the steps that follow once you submit an offer on a property.',
      },
    ];
  };

  getItemsPerPage = () => {
    if (window.innerWidth <= 768) return 1;

    if (window.innerWidth <= 1024) return 2;

    return 3;
  };

  initFAQ = () => {
    this.allFAQ = this.getFAQData();
    this.itemsPerPage = this.getItemsPerPage();
    this.totalPages = Math.ceil(this.allFAQ.length / this.itemsPerPage);
    this.renderAllFAQ();
  };

  renderAllFAQ = () => {
    this.gridElement.innerHTML = '';

    this.allFAQ.forEach((faq, index) => {
      const faqElement = this.createFAQElement(faq, index);
      this.gridElement.appendChild(faqElement);
    });
  };

  createFAQElement = (faq, index) => {
    const div = document.createElement('div');
    div.className = 'faq__item';
    div.setAttribute('data-faq-index', index);

    div.innerHTML = `
      <h4 class="faq__item-title">${faq.title}</h4>
      <p class="faq__item-text">
        ${faq.text}
      </p>
      <button class="faq__item-button button">Read More</button>
    `;

    return div;
  };

  showCurrentPageItems = () => {
    const allItems = this.gridElement.querySelectorAll('.faq__item');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    allItems.forEach(item => {
      item.style.display = 'none';
    });

    for (let i = startIndex; i < endIndex && i < allItems.length; i++) {
      allItems[i].style.display = 'grid';
    }

    this.gridElement.style.opacity = '0';
    setTimeout(() => {
      this.gridElement.style.opacity = '1';
    }, 150);
  };

  updatePagination = () => {
    this.currentPageElement.textContent = String(this.currentPage).padStart(2, '0') + ' ';

    this.totalPagesElement.textContent = `of ${String(this.totalPages).padStart(2, '0')}`;

    if (this.currentPage === 1) {
      this.prevButtonElement.classList.add(this.stateClasses.disabled);
      this.prevButtonElement.disabled = true;
    } else {
      this.prevButtonElement.classList.remove(this.stateClasses.disabled);
      this.prevButtonElement.disabled = false;
    }

    if (this.currentPage === this.totalPages) {
      this.nextButtonElement.classList.add(this.stateClasses.disabled);
      this.nextButtonElement.disabled = true;
    } else {
      this.nextButtonElement.classList.remove(this.stateClasses.disabled);
      this.nextButtonElement.disabled = false;
    }
  };

  goToPrevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      this.showCurrentPageItems();
    }
  };

  goToNextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      this.showCurrentPageItems();
    }
  };

  handleResize = () => {
    const newItemsPerPage = this.getItemsPerPage();

    if (newItemsPerPage !== this.itemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.totalPages = Math.ceil(this.allFAQ.length / this.itemsPerPage);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }

      this.updatePagination();
      this.showCurrentPageItems();
    }
  };

  initEvents = () => {
    this.prevButtonElement.addEventListener('click', this.goToPrevPage);
    this.nextButtonElement.addEventListener('click', this.goToNextPage);
    window.addEventListener('resize', this.handleResize);
  };
}

export default Faq;
