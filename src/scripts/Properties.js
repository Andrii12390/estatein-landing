class Properties {
  selectors = {
    root: '[data-js-properties]',
    grid: '[data-js-properties-grid]',
    pagination: '[data-js-pagination]',
    prevButton: '[data-js-pagination-prev]',
    nextButton: '[data-js-pagination-next]',
    currentPage: '[data-js-pagination-current]',
    totalPages: '[data-js-pagination-total]',
  };

  stateClasses = {
    disabled: 'pagination__button--disabled',
    hidden: 'is-hidden',
    fadeOut: 'is-fade-out',
    fadeIn: 'is-fade-in',
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
    this.allProperties = [];

    this.initProperties();
    this.initEvents();
    this.updatePagination();
    this.showCurrentPageItems();
  }

  getPropertiesData = () => {
    return [
      {
        image: 'properties/property-1.webp',
        title: 'Seaside Serenity Villa',
        description:
          'A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood...',
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
  };

  getItemsPerPage = () => {
    if (window.innerWidth <= 768) return 1;

    if (window.innerWidth <= 1024) return 2;

    return 3;
  };

  initProperties = () => {
    this.allProperties = this.getPropertiesData();
    this.itemsPerPage = this.getItemsPerPage();
    this.totalPages = Math.ceil(this.allProperties.length / this.itemsPerPage);
    this.renderAllProperties();
  };

  renderAllProperties = () => {
    this.gridElement.innerHTML = '';

    this.allProperties.forEach((property, index) => {
      const propertyElement = this.createPropertyElement(property, index);
      this.gridElement.appendChild(propertyElement);
    });
  };

  createPropertyElement = (property, index) => {
    const div = document.createElement('div');
    div.className = 'properties__item';
    div.setAttribute('data-property-index', index);

    div.innerHTML = `
    <figure class="properties__item-image-container">
      <img
        src="${property.image}"
        alt="Property image"
        class="properties__item-image"
        width="310"
        height="210"
      />
    </figure>

      <div class="proprties__item-body">
        <h4 class="properties__item-title">${property.title}</h4>

        <p class="properties__item-text">
          ${property.description}
          <a href="#"> Read More</a>
        </p>
      </div>

      <ul class="properties__item-tag-list">
        <li class="properties__item-tag">
          <img
            src="icons/bedroom-icon.svg"
            alt=""
            width="24"
            height="24"
          />
          <span>${property.bedrooms}</span>
        </li>
        <li class="properties__item-tag">
          <img
            src="icons/bathroom-icon.svg"
            alt=""
            width="24"
            height="24"
          />
          <span>${property.bathrooms}</span>
        </li>
        <li class="properties__item-tag">
          <img
            src="icons/villa-icon.svg"
            alt=""
            width="24"
            height="24"
          />
          <span>${property.type}</span>
        </li>
      </ul>

      <div class="properties__item-details">
        <div class="properties__item-price">
          <span>Price</span>
          <h4>${property.price}</h4>
        </div>
        <a class="properties__item-button button button--primary"> View Property Details </a>
      </div>
    `;

    return div;
  };

  showCurrentPageItems = () => {
    const allItems = this.gridElement.querySelectorAll('.properties__item');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.gridElement.classList.add(this.stateClasses.fadeOut);

    setTimeout(() => {
      allItems.forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      });

      const visibleItems = [];
      for (let i = startIndex; i < endIndex && i < allItems.length; i++) {
        allItems[i].style.display = 'grid';
        visibleItems.push(allItems[i]);
      }

      this.gridElement.classList.remove(this.stateClasses.fadeOut);
      this.gridElement.classList.add(this.stateClasses.fadeIn);

      visibleItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      });

      setTimeout(() => {
        this.gridElement.classList.remove(this.stateClasses.fadeIn);
      }, visibleItems.length * 100 + 300);
    }, 200);
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
      this.totalPages = Math.ceil(this.allProperties.length / this.itemsPerPage);

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

export default Properties;
