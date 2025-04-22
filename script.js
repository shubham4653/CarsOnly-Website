
const userEmail = localStorage.getItem("userEmail");

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");

<<<<<<< HEAD
=======
if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "signupandlogin.html";
  });
}

>>>>>>> 72d8f292472ab0b9d38a91d31a02c453ab87d34e
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

// Liquid Navigation Menu Indicator
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const indicator = document.querySelector('.nav-indicator');
  const links = navLinks.querySelectorAll('li a');

  let activeLink = navLinks.querySelector('a.active') || links[0];

  function updateIndicator(element) {
    const rect = element.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - navRect.left}px`;
  }

  // Initialize indicator position
  updateIndicator(activeLink);

  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      updateIndicator(e.target);
    });
  });

  navLinks.addEventListener('mouseleave', () => {
    updateIndicator(activeLink);
  });
});
  

