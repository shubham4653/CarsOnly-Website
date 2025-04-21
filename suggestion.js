

console.log(firebase);  // Should show the Firebase object if initialized correctly

// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyC15VYhD8MI_CA8BRAsEDjIlPDj8pglBSA",
    authDomain: "carsonlydatabase.firebaseapp.com",
    projectId: "carsonlydatabase",
    storageBucket: "carsonlydatabase.firebasestorage.app",
    messagingSenderId: "3822136081",
    appId: "1:3822136081:web:a7d4042135e3a1d066fab0",
    measurementId: "G-Q2QLFNH8K3"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("✅ User is logged in:", user);
    } else {
      console.log("❌ No user is logged in.");
    }
});

// Handle form submission
document.getElementById("suggestionForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Capture the form data
    const name = document.getElementById("name").value;
    const file = document.getElementById("carImage").files[0]; // Get the selected image file
    const description = document.getElementById("description").value;

    if (file && description) {
        // Get current user details (username or email)
        // Get from localStorage instead since auth.currentUser is null in modular SDK
        const userEmail = localStorage.getItem("userEmail");
        const userName = userEmail ? userEmail.split('@')[0] : name || "Anonymous";

        try {
            // Convert the image to Base64
            const base64Image = await convertToBase64(file);

            // Save the suggestion data to Firestore with Base64 image
            // Assuming you're using Firebase v8 SDK
// Get a reference to your Realtime Database path
const suggestionsRef = db.ref('suggestions');

// Push new data to the 'suggestions' node
suggestionsRef.push({
    userName: userName,
    description: description,
    imageBase64: base64Image, // Store Base64 encoded image
    createdAt: new Date().toISOString()
})
.then(() => {
    console.log("Suggestion added successfully!");
})
.catch((error) => {
    console.error("Error submitting suggestion: ", error);
});


            // Show success message
            document.getElementById("thankYouMessage").style.display = "block";
            setTimeout(() => {
                document.getElementById("thankYouMessage").style.display = "none";
                document.getElementById("suggestionForm").reset();
            }, 3000);
        } catch (error) {
            console.error("Error submitting suggestion: ", error);
        }
    }
});

// Function to convert image file to Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Resolve the promise with the Base64 string
        reader.onerror = reject; // Reject the promise on error
        reader.readAsDataURL(file); // Convert image to Base64
    });
}
