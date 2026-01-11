import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

class Testimonials {
  selectors = {
    root: '[data-js-testimonials]',
    slider: '[data-js-testimonials-grid]',
    prevButton: '[data-js-testimonials-pagination-prev]',
    nextButton: '[data-js-testimonials-pagination-next]',
    currentPage: '[data-js-testimonials-pagination-current]',
    totalPages: '[data-js-testimonials-pagination-total]',
  };

  stateClasses = {
    disabled: 'pagination__button--disabled',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    this.sliderElement = this.rootElement.querySelector(this.selectors.slider);
    this.wrapperElement = this.sliderElement.querySelector('.swiper-wrapper');

    this.init();
  }

  getTestimonialsData = () => [
    {
      stars: 5,
      title: 'Exceptional Service!',
      text: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
      name: 'Wade Warren',
      location: 'USA, California',
      image: 'testimonials/wade-warren.webp',
    },
    {
      stars: 5,
      title: 'Efficient and Reliable',
      text: "Our experience with Estatein was outstanding, they provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
      name: 'Emelie Thomson',
      location: 'USA, Florida',
      image: 'testimonials/emilie-thompson.webp',
    },
    {
      stars: 5,
      title: 'Trusted Advisors',
      text: 'The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!',
      name: 'John Mans',
      location: 'USA, Nevada',
      image: 'testimonials/john-mans.webp',
    },
    {
      stars: 5,
      title: 'Outstanding Support',
      text: 'From our first meeting to closing day, Estatein provided exceptional support. They answered all our questions and made the process stress-free.',
      name: 'Sarah Johnson',
      location: 'USA, Texas',
      image: 'testimonials/wade-warren.webp',
    },
    {
      stars: 5,
      title: 'Professional Team',
      text: 'The professionalism and expertise of the Estatein team is unmatched. They helped us navigate the complex real estate market with ease.',
      name: 'Michael Chen',
      location: 'USA, New York',
      image: 'testimonials/john-mans.webp',
    },
  ];

  renderSlides = () => {
    const data = this.getTestimonialsData();

    this.wrapperElement.innerHTML = data
      .map(testimonial => {
        let starsHtml = '';
        for (let i = 0; i < testimonial.stars; i++) {
          starsHtml += `
          <li class="testimonials__stars-item">
            <img src="icons/star.svg" alt="Star" width="24" height="24" />
          </li>
        `;
        }

        return `
        <div class="swiper-slide">
          <article class="testimonials__item">
            <ul class="testimonials__stars-list">
              ${starsHtml}
            </ul>
            <div class="testimonials__item-body">
              <h4 class="testimonials__item-title">${testimonial.title}</h4>
              <p class="testimonials__item-text">${testimonial.text}</p>
            </div>
            <div class="testimonials__item-sender">
              <img src="${testimonial.image}" alt="${testimonial.name}" width="60" height="60" />
              <div class="testimonials__item-sender-info">
                <h5 class="testimonials__item-sender-name">${testimonial.name}</h5>
                <p class="testimonials__item-sender-source">${testimonial.location}</p>
              </div>
            </div>
          </article>
        </div>
      `;
      })
      .join('');
  };

  init = () => {
    this.renderSlides();

    this.swiper = new Swiper(this.sliderElement, {
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
    const currentEl = document.querySelector(this.selectors.currentPage);
    const totalEl = document.querySelector(this.selectors.totalPages);

    if (!currentEl || !totalEl) return;

    const perGroup = s.params.slidesPerGroup || 1;
    const current = Math.ceil(s.activeIndex / perGroup) + 1;
    const total = Math.ceil(s.slides.length / perGroup);

    currentEl.textContent = String(current).padStart(2, '0') + ' ';
    totalEl.textContent = `of ${String(total).padStart(2, '0')}`;
  };
}

export default Testimonials;
