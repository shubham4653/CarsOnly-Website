

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC15VYhD8MI_CA8BRAsEDjIlPDj8pglBSA",
    authDomain: "carsonlydatabase.firebaseapp.com",
    projectId: "carsonlydatabase",
    storageBucket: "carsonlydatabase.firebasestorage.app",
    messagingSenderId: "3822136081",
    appId: "1:3822136081:web:a7d4042135e3a1d066fab0",
    measurementId: "G-Q2QLFNH8K3"
  };
  
firebase.initializeApp(firebaseConfig);
// Corrected gallery.js
// Corrected gallery.js

const accessKey = "6-fWwPa1Jo-nv-E4aDJCkxjHWZm3WuYsEdANr__2Ups"; // Your Unsplash API key
const gallery = document.getElementById("gallery");
const modal = document.getElementById("fullscreenModal");
const fullscreenImage = document.getElementById("fullscreenImage");
let page = 1;
let isFetching = false;
let slideshowInterval;
let imagesList = [];
let currentSlideshowIndex = 0;

const userEmail = localStorage.getItem("userEmail");

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");

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
async function fetchCars() {
    if (isFetching) return;
    isFetching = true;
    document.getElementById("loadingSpinner").style.display = "block";

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=cars&per_page=20&page=${page}&client_id=${accessKey}`);
        const data = await response.json();
        displayImages(data.results);
        imagesList = data.results.map(img => img.urls.full);
        page++;
    } catch (error) {
        console.error("Error fetching car images:", error);
    } finally {
        document.getElementById("loadingSpinner").style.display = "none";
        isFetching = false;
    }
}

function displayImages(images) {
    images.forEach(image => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");

        carCard.innerHTML = `
            <img src="${image.urls.regular}" alt="${image.alt_description}" data-full="${image.urls.full}">
            <div class="car-info">
                Photo by <a href="${image.user.links.html}" target="_blank" style="color: #00aaff;">
                    ${image.user.name}
                </a>
                <span class="like-btn">🤍</span>
            </div>
        `;

        gallery.appendChild(carCard);
    });
}
function fetchSuggestions() {
    const suggestionsRef = firebase.database().ref("suggestions");

    suggestionsRef.once('value')
        .then(snapshot => {
            const suggestions = snapshot.val();
            console.log("Snapshot received:", suggestions);

            if (suggestions) {
                // Check if we are getting the expected data structure
                Object.keys(suggestions).forEach(key => {
                    const suggestion = suggestions[key];
                    console.log("Processing suggestion:", suggestion);  // Debugging line

                    const base64Image = suggestion.imageBase64;
                    const userName = suggestion.userName || "Anonymous";
                    const text = suggestion.description || "No suggestion provided";

                    const carCard = document.createElement("div");
                    carCard.classList.add("car-card", "flip-card");

                    carCard.innerHTML = `
                        <div class="flip-inner">
                            <div class="flip-front">
                                <img src="${base64Image}" alt="User Submitted Image">
                                <div class="car-info">
                                    Submitted by ${userName}
                                    <span class="like-btn">🤍</span>
                                </div>
                            </div>
                            <div class="flip-back">
                                <p>${text}</p>
                            </div>
                        </div>
                    `;

                    // Add flipping functionality on click
                    carCard.addEventListener("click", (e) => {
                        if (!e.target.classList.contains("like-btn")) {
                            carCard.classList.toggle("flipped");
                        }
                    });
                    gallery.appendChild(carCard);
                    console.log("Card added to gallery:", carCard); // Debugging line

                });
            } else {
                console.log("No suggestions found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching suggestions:", error);
        });
}




// Call fetchSuggestions to display images from Firebase
fetchSuggestions();

// Attach event listener to the gallery container for both images & like button
document.getElementById("gallery").addEventListener("click", function(event) {
    if (event.target.classList.contains("like-btn")) {
        toggleLike(event.target);
    } else if (event.target.tagName === "IMG") {
        const carCard = event.target.closest('.car-card');
        
        // If it's a user-submitted image (base64), flip it
        if (event.target.src.startsWith("data:image")) {
            carCard.classList.toggle("flipped");
        } else {
            // Otherwise open Unsplash image in modal
            openModal(event.target.getAttribute("data-full"));
        }
    }
    
});

// Like toggle function
function toggleLike(element) {
    element.classList.toggle("liked");

    if (element.classList.contains("liked")) {
        element.textContent = "❤️"; // Liked (solid heart)
        
        // Reset animation to ensure it plays every time
        element.style.animation = "none";
        void element.offsetWidth;  // Force reflow (trick to restart animation)
        element.style.animation = "pop 0.3s ease-in-out";
    } else {
        element.textContent = "🤍"; // Unliked (outline heart)
    }
}

// Fullscreen Image Modal Functions
function openModal(imageSrc) {
    if (!imageSrc) return;
    fullscreenImage.src = imageSrc;
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    stopSlideshow(); // Stops slideshow & restores scrolling
}

// Slideshow and Scroll functions
function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    showScrollbar(); // Restore scrolling when slideshow stops
}

function hideScrollbar() {
    document.body.style.overflow = "hidden"; // Hide scrollbar
}

function showScrollbar() {
    document.body.style.overflow = "auto"; // Show scrollbar
}

function startRandomSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        showScrollbar();
        return;
    }

    hideScrollbar();
    currentSlideshowIndex = Math.floor(Math.random() * imagesList.length);
    openModal(imagesList[currentSlideshowIndex]);

    slideshowInterval = setInterval(() => {
        currentSlideshowIndex = Math.floor(Math.random() * imagesList.length);
        
        fullscreenImage.style.transition = "opacity 1s ease-in-out";
        fullscreenImage.style.opacity = "0";

        setTimeout(() => {
            fullscreenImage.src = imagesList[currentSlideshowIndex];

            // Ensure image is loaded before fading in
            fullscreenImage.onload = () => {
                fullscreenImage.style.opacity = "1";
            };
        }, 1); // 0.5s delay for smooth transition
    }, 5000);
}

fetchCars();

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
