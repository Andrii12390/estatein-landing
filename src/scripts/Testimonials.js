class Testimonials {
  selectors = {
    root: '[data-js-testimonials]',
    grid: '[data-js-testimonials-grid]',
    pagination: '[data-js-testimonials-pagination]',
    prevButton: '[data-js-testimonials-pagination-prev]',
    nextButton: '[data-js-testimonials-pagination-next]',
    currentPage: '[data-js-testimonials-pagination-current]',
    totalPages: '[data-js-testimonials-pagination-total]',
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
    this.allTestimonials = [];

    this.initTestimonials();
    this.initEvents();
    this.updatePagination();
    this.showCurrentPageItems();
  }

  getTestimonialsData = () => {
    return [
      {
        stars: 5,
        title: 'Exceptional Service!',
        text: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
        name: 'Wade Warren',
        location: 'USA, California',
        image: 'testimonials/wade-warren.png',
      },
      {
        stars: 5,
        title: 'Efficient and Reliable',
        text: "Our experience with Estatein was outstanding, they provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
        name: 'Emelie Thomson',
        location: 'USA, Florida',
        image: 'testimonials/emilie-thompson.png',
      },
      {
        stars: 5,
        title: 'Trusted Advisors',
        text: 'The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!',
        name: 'John Mans',
        location: 'USA, Nevada',
        image: 'testimonials/john-mans.png',
      },
      {
        stars: 5,
        title: 'Outstanding Support',
        text: 'From our first meeting to closing day, Estatein provided exceptional support. They answered all our questions and made the process stress-free.',
        name: 'Sarah Johnson',
        location: 'USA, Texas',
        image: 'testimonials/wade-warren.png',
      },
      {
        stars: 5,
        title: 'Professional Team',
        text: 'The professionalism and expertise of the Estatein team is unmatched. They helped us navigate the complex real estate market with ease.',
        name: 'Michael Chen',
        location: 'USA, New York',
        image: 'testimonials/john-mans.png',
      },
    ];
  };

  getItemsPerPage = () => {
    if (window.innerWidth <= 768) return 1;

    if (window.innerWidth <= 1024) return 2;

    return 3;
  };

  initTestimonials = () => {
    this.allTestimonials = this.getTestimonialsData();
    this.itemsPerPage = this.getItemsPerPage();
    this.totalPages = Math.ceil(this.allTestimonials.length / this.itemsPerPage);
    this.renderAllTestimonials();
  };

  renderAllTestimonials = () => {
    this.gridElement.innerHTML = '';

    this.allTestimonials.forEach((testimonial, index) => {
      const testimonialElement = this.createTestimonialElement(testimonial, index);
      this.gridElement.appendChild(testimonialElement);
    });
  };

  createTestimonialElement = (testimonial, index) => {
    const div = document.createElement('div');
    div.className = 'testimonials__item';
    div.setAttribute('data-testimonial-index', index);

    let starsHtml = '';
    for (let i = 0; i < testimonial.stars; i++) {
      starsHtml += `
        <li class="testimonials__stars-item">
          <img
            src="icons/star.svg"
            alt="Star"
            width="24"
            height="24"
          />
        </li>
      `;
    }

    div.innerHTML = `
      <ul class="testimonials__stars-list">
        ${starsHtml}
      </ul>
      <div class="testimonials__item-body">
        <h4 class="testimonials__item-title">${testimonial.title}</h4>
        <p class="testimonials__item-text">
          ${testimonial.text}
        </p>
      </div>
      <div class="testimonials__item-sender">
        <img
          src="${testimonial.image}"
          alt="Testimonial image"
          width="60"
          height="60"
        />
        <div class="testimonials__item-sender-info">
          <h5 class="testimonials__item-sender-name">${testimonial.name}</h5>
          <p class="testimonials__item-sender-source">${testimonial.location}</p>
        </div>
      </div>
    `;

    return div;
  };

  showCurrentPageItems = () => {
    const allItems = this.gridElement.querySelectorAll('.testimonials__item');
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
      this.totalPages = Math.ceil(this.allTestimonials.length / this.itemsPerPage);

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

export default Testimonials;
