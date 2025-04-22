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

const likedGallery = document.getElementById("likedGallery");
const userEmail = localStorage.getItem("userEmail");
const likesRef = firebase.database().ref("likes");

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

function createCarCard(like) {
    const carCard = document.createElement("div");
    carCard.classList.add("car-card");

    carCard.innerHTML = `
        <img src="${like.src}" alt="Liked Image" style="height: 200px; object-fit: cover; border-radius: 12px;">
        <div class="car-info">
            <span class="like-btn liked">❤️</span>
        </div>
    `;

    return carCard;
}

function loadLikedImages() {
    if (!userEmail) return;

    const userLikesRef = likesRef.child(userEmail.replace('.', ','));
    userLikesRef.once('value').then(snapshot => {
        likedGallery.innerHTML = "";

        const likes = snapshot.val();
        if (!likes) {
            likedGallery.innerHTML = "<p>No liked images yet.</p>";
            return;
        }

        Object.values(likes).forEach(like => {
            const carCard = createCarCard(like);
            likedGallery.appendChild(carCard);
        });
    });
}

window.addEventListener("load", () => {
    loadLikedImages();
});
