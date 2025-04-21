const userEmail = localStorage.getItem("userEmail");

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = ["q1", "q2", "q3"].map(q =>
    document.querySelector(`input[name="${q}"]:checked`)?.value
  );

  if (answers.includes(undefined)) {
    document.getElementById("quizResult").innerHTML = `<p>Please answer all questions!</p>`;
    return;
  }

  const counts = { sporty: 0, luxury: 0, rugged: 0 };
  answers.forEach(answer => counts[answer]++);

  let result = "";
  if (counts.sporty >= 2) {
    result = "🏎️ You’re a Lamborghini Huracán – bold, fast, and built for the thrill!";
  } else if (counts.luxury >= 2) {
    result = "🚘 You’re a Mercedes-Benz S-Class – refined, smooth, and elegant.";
  } else {
    result = "🚙 You’re a Jeep Wrangler – adventurous, tough, and ready for any terrain.";
  }

  document.getElementById("quizResult").innerHTML = `
    <div class="result-box">
      <h3>Your Match:</h3>
      <p>${result}</p>
    </div>
  `;
});

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
  

