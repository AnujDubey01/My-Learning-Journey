
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      const carouselInner = document.getElementById('carouselInner');
      const indicators = document.getElementById('carouselIndicators');
      const itemsPerSlide = 5; // 5 products per slide

      // Split products into groups of 5
      for (let i = 0; i < products.length; i += itemsPerSlide) {
        const group = products.slice(i, i + itemsPerSlide);
        const isActive = i === 0 ? 'active' : '';

        // Add indicator dots
        indicators.innerHTML += `
          <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${i / itemsPerSlide}" 
                  class="${isActive}" ${isActive ? 'aria-current="true"' : ''} aria-label="Slide ${i / itemsPerSlide + 1}">
          </button>
        `;

        // Create slide HTML
        let cardsHTML = '';
        group.forEach(p => {
          cardsHTML += `
            <div class="card" style="min-width: 180px;">
              <img src="${p.image}" class="card-img-top fixed-img" alt="${p.title}">
              <div class="card-body text-center">
                <h6>${p.title.slice(0, 25)}...</h6>
                <p>₹${(p.price * 83).toFixed(0)}</p>
              </div>
            </div>
          `;
        });

        // Add to carousel-inner
        carouselInner.innerHTML += `
          <div class="carousel-item ${isActive}">
            <div class="d-flex justify-content-center gap-3">
              ${cardsHTML}
            </div>
          </div>
        `;
      }
    })
    .catch(err => console.error('Error fetching products:', err));

