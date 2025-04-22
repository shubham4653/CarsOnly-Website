const userEmail = localStorage.getItem("userEmail");

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "signupandlogin.html";
  });
}

if (userEmail) {
  if (loginLink) {
    loginLink.style.display = "none";
  }
  if (logoutLink) {
    logoutLink.style.display = "inline";
    logoutLink.textContent = "Logout";
    logoutLink.addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.removeItem("userEmail");
      window.location.href = "signupandlogin.html";
    });
  }
} else {
  if (loginLink) {
    loginLink.style.display = "inline";
  }
  if (logoutLink) {
    logoutLink.style.display = "none";
  }
}

function setupCarousel(carouselClass, slideClass, prevBtnClass, nextBtnClass) {
    const carousel = document.querySelector(`.${carouselClass}`);
    const slides = document.querySelectorAll(`.${slideClass}`);
    const prevBtn = document.querySelector(`.${prevBtnClass}`);
    const nextBtn = document.querySelector(`.${nextBtnClass}`);

    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(n) {
        carousel.style.transform = `translateX(-${n * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        updateIndicators();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        updateIndicators();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('indicators');
    carousel.parentNode.appendChild(indicatorsContainer);

    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
            updateIndicators();
        });
        indicatorsContainer.appendChild(indicator);
    }

    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    updateIndicators();
}


// Initialize carousels
setupCarousel('carousel', 'slide', 'prev-btn', 'next-btn');
setupCarousel('carousel-two', 'slide-two', 'prev-btn-two', 'next-btn-two');
setupCarousel('carousel-three', 'slide-three', 'prev-btn-three', 'next-btn-three');
setupCarousel('carousel-four', 'slide-four', 'prev-btn-four', 'next-btn-four');
setupCarousel('carousel-five', 'slide-five', 'prev-btn-five', 'next-btn-five');
setupCarousel('carousel-six', 'slide-six', 'prev-btn-six', 'next-btn-six');


  // Check if user is logged in
  

