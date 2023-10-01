import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

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
const auth = firebase.auth()
const database = firebase.database()

function register(){
  window.location.href('register.html')
}

async function login(){ 
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password-login").value;

    // Query Firestore to retrieve the user document with the provided username
    const userDoc = await getDoc(doc(db, 'Profiles', username));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Compare the provided password with the stored hashed password
      if (password === userData.Password) {
        // Passwords match, user is authenticated
        console.log('Login successful');
        username = userData.Username;
        console.log('Username after assignment:', username);
        window.location.href = "main.html";
      } else {
        console.log('Incorrect password');
        window.alert("Wrong Password")
        document.getElementById("password-login").value = '';
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
