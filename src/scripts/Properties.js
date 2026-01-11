import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

class Properties {
  selectors = {
    root: '[data-js-properties]',
    slider: '[data-js-properties-grid]',
    prevButton: '[data-js-pagination-prev]',
    nextButton: '[data-js-pagination-next]',
    currentPage: '[data-js-pagination-current]',
    totalPages: '[data-js-pagination-total]',
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

  getPropertiesData = () => [
    {
      image: 'properties/property-1.webp',
      title: 'Seaside Serenity Villa',
      description: 'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...',
      bedrooms: '4-Bedroom',
      bathrooms: '3-Bathroom',
      type: 'Villa',
      price: '$550,000',
    },
    {
      image: 'properties/property-2.webp',
      title: 'Metropolitan Haven',
      description: 'A chic and fully-furnished 2-bedroom apartment with panoramic city views...',
      bedrooms: '2-Bedroom',
      bathrooms: '2-Bathroom',
      type: 'Villa',
      price: '$480,000',
    },
    {
      image: 'properties/property-3.webp',
      title: 'Rustic Retreat Cottage',
      description: 'An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community...',
      bedrooms: '3-Bedroom',
      bathrooms: '3-Bathroom',
      type: 'Villa',
      price: '$640,000',
    },
    {
      image: 'properties/property-1.webp',
      title: 'Modern City Apartment',
      description: 'Contemporary 1-bedroom apartment in the heart of downtown...',
      bedrooms: '1-Bedroom',
      bathrooms: '1-Bathroom',
      type: 'Apartment',
      price: '$320,000',
    },
    {
      image: 'properties/property-2.webp',
      title: 'Luxury Penthouse',
      description: 'Exclusive penthouse with breathtaking views and premium amenities...',
      bedrooms: '5-Bedroom',
      bathrooms: '4-Bathroom',
      type: 'Penthouse',
      price: '$1,200,000',
    },
    {
      image: 'properties/property-3.webp',
      title: 'Family Suburban Home',
      description: 'Perfect family home with large garden and quiet neighborhood...',
      bedrooms: '4-Bedroom',
      bathrooms: '2-Bathroom',
      type: 'House',
      price: '$750,000',
    },
  ];

  renderSlides = () => {
    const data = this.getPropertiesData();

    this.wrapperElement.innerHTML = data
      .map(
        property => `
      <div class="swiper-slide">
        <article class="properties__item">
          <figure class="properties__item-image-container">
            <img
              src="${property.image}"
              alt="${property.title}"
              class="properties__item-image"
              width="310"
              height="210"
            />
          </figure>

          <div class="properties__item-body">
            <h4 class="properties__item-title">${property.title}</h4>
            <p class="properties__item-text">
              ${property.description}
              <a href="#"> Read More</a>
            </p>
          </div>

          <ul class="properties__item-tag-list">
            <li class="properties__item-tag">
              <img src="icons/bedroom.svg" alt="" width="24" height="24" />
              <span>${property.bedrooms}</span>
            </li>
            <li class="properties__item-tag">
              <img src="icons/bathroom.svg" alt="" width="24" height="24" />
              <span>${property.bathrooms}</span>
            </li>
            <li class="properties__item-tag">
              <img src="icons/villa.svg" alt="" width="24" height="24" />
              <span>${property.type}</span>
            </li>
          </ul>

          <div class="properties__item-details">
            <div class="properties__item-price">
              <span>Price</span>
              <h4>${property.price}</h4>
            </div>
            <a href="#" class="properties__item-button button button--primary"> View Property Details </a>
          </div>
        </article>
      </div>
    `,
      )
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
        1440: {
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

export default Properties;
