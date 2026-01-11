import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

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
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    this.gridElement = this.rootElement.querySelector(this.selectors.grid);
    this.wrapperElement = this.gridElement.querySelector('.swiper-wrapper');

    this.init();
  }

  getFAQData = () => [
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

  renderSlides = () => {
    const data = this.getFAQData();

    this.wrapperElement.innerHTML = data
      .map(
        faq => `
      <div class="swiper-slide">
        <div class="faq__item">
          <h4 class="faq__item-title">${faq.title}</h4>
          <p class="faq__item-text">${faq.text}</p>
          <button class="faq__item-button button">Read More</button>
        </div>
      </div>
    `,
      )
      .join('');
  };

  init = () => {
    this.renderSlides();

    this.swiper = new Swiper(this.gridElement, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,

      navigation: {
        nextEl: this.selectors.nextButton,
        prevEl: this.selectors.prevButton,
        disabledClass: this.stateClasses.disabled,
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        },
      },

      on: {
        init: s => this.updateCounter(s),
        slideChange: s => this.updateCounter(s),
        breakpoint: s => this.updateCounter(s),
      },
    });
  };

  updateCounter = s => {
    const currentPageEl = this.rootElement.querySelector(this.selectors.currentPage);
    const totalPagesEl = this.rootElement.querySelector(this.selectors.totalPages);

    if (!currentPageEl || !totalPagesEl) return;

    const slidesPerPage = s.params.slidesPerGroup || 1;
    const currentActivePage = Math.ceil(s.activeIndex / slidesPerPage) + 1;
    const totalPages = Math.ceil(s.slides.length / slidesPerPage);

    currentPageEl.textContent = String(currentActivePage).padStart(2, '0') + ' ';
    totalPagesEl.textContent = `of ${String(totalPages).padStart(2, '0')}`;
  };
}

export default Faq;
