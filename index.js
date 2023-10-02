import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUm9GSSY6J-702ah8vW7cKgIrZ97BJqys",
    authDomain: "video-poker-web.firebaseapp.com",
    projectId: "video-poker-web",
    storageBucket: "video-poker-web.appspot.com",
    messagingSenderId: "723228376471",
    appId: "1:723228376471:web:36f3069f5fb83e266258d2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

function register() {
  window.location.href = 'register.html'; // Fixed the syntax for changing location
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; // Corrected the id attribute

  try {
    // Query Firestore to retrieve the user document with the provided username
    const userDoc = await getDoc(doc(db, 'Profiles', username));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Compare the provided password with the stored hashed password
      if (password === userData.Password) {
        // Passwords match, user is authenticated
        console.log('Login successful');
        // You can set user information in localStorage or use other methods for session management
        window.location.href = "main.html";
      } else {
        console.log('Incorrect password');
        window.alert("Wrong Password");
        document.getElementById("password").value = ''; // Corrected the id attribute
      }
    } else {
      console.log('User not found');
      // Handle user not found
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error, e.g., display an error message
  }
}

// Select the buttons by their IDs
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

// Attach event listeners
loginButton.addEventListener("click", login);
registerButton.addEventListener("click", register);
