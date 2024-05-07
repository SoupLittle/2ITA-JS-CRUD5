// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase, ref, set  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCv9iZBmukWyh9V2hdKrVdG3aSIjZnvhYY",
    authDomain: "js-crud-5-b0981.firebaseapp.com",
    databaseURL: "https://js-crud-5-b0981-default-rtdb.firebaseio.com/",
    projectId: "js-crud-5-b0981",
    storageBucket: "js-crud-5-b0981.appspot.com",
    messagingSenderId: "1026208232916",
    appId: "1:1026208232916:web:c75796b7a59517cbac9241",
    measurementId: "G-4CQY80TWBQ"
  };


  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); 

// Game logic
const options = ["Rock", "Paper", "Scissors"];

document.querySelectorAll('.options button').forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.id;
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    const result = getResult(playerChoice, computerChoice);
    document.getElementById('result').innerText = `Player: ${playerChoice} | Computer: ${computerChoice} | ${result}`;
 
    
    // Save result to Firebase
    
    const resultsRef = ref(database, 'Results'); 
    const newResultRef = ref(database, `Results/${generateNewResultKey()}`);

set(newResultRef, {"Player": playerChoice, "Computer": computerChoice, "Result": result})
  .then(() => {
    console.log("Data stored successfully");
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Unsuccessful, error" + error);
  });

function generateNewResultKey() {

  return Date.now().toString();
    } 
  });
});


//Result text

function getResult(player, computer) {
  player = player.toLowerCase(); 
  computer = computer.toLowerCase();
  if (player === computer) return "It's a tie!";

  if ((player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")) 
      
      {
    return "Player wins!";
  } else {
    return "Computer wins!";
  }
}

