// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDh46qPiFCSkMKnruClYC1cUpIT_mTjdB0",
    authDomain: "js-crud-5.firebaseapp.com",
    databaseURL: "https://js-crud-5-default-rtdb.firebaseio.com",
    projectId: "js-crud-5",
    storageBucket: "js-crud-5.appspot.com",
    messagingSenderId: "698738047514",
    appId: "1:698738047514:web:abdcedecb7afb2f8872fa3",
    measurementId: "G-7MS09N7FJD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


// Game logic
const options = ["rock", "paper", "scissors"];

document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = options[Math.floor(Math.random() * options.length)];
        const result = getResult(playerChoice, computerChoice);
        document.getElementById('result').innerText = `Player: ${playerChoice} | Computer: ${computerChoice} | ${result}`;
        
        // Save result to Firebase
        database.ref('results').push({
            player: playerChoice,
            computer: computerChoice,
            status: result
        });
    });
});

function getResult(player, computer) {
    if (player === computer) return "It's a tie!";
    if ((player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")) {
        return "Player wins!";
    } else {
        return "Computer wins!";
    }
}