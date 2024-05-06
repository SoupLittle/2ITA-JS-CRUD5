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
const options = ["rock", "paper", "scissors"];

document.querySelectorAll('.options button').forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.id;
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    const result = getResult(playerChoice, computerChoice);
    document.getElementById('result').innerText = `Player: ${playerChoice} | Computer: ${computerChoice} | ${result}`;

    console.log("Player Choice:", playerChoice);
    console.log("Computer Choice:", computerChoice);
    console.log("Result:", result);    
    
    // Save result to Firebase
    const resultsRef = ref(database, 'results'); 
    const newResultRef = ref(database, `results/${generateNewResultKey()}`);

set(newResultRef, {"player": playerChoice, "computer": computerChoice, "result": result})
  .then(() => {
    alert("Data stored successfully");
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Unsuccessful, error" + error);
  });

function generateNewResultKey() {
  // Generate a unique key (e.g., timestamp) for the new result
  return Date.now().toString(); // Use current timestamp as the key
}

    
  });
});

function getResult(player, computer) {
  player = player.toLowerCase(); // Convert to lowercase to match button ids
  computer = computer.toLowerCase(); // Convert to lowercase to match options array
  if (player === computer) return "It's a tie!";
  if ((player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")) {
    return "Player wins!";
  } else {
    return "Computer wins!";
  }
}






// // Initialize Firebase
// var app = initializeApp(firebaseConfig);
// var analytics = getAnalytics(app);
// var database = getDatabase(app); 


// // Game logic
// var options = ["rock", "paper", "scissors"];

// document.querySelectorAll('.options button').forEach(button => {
//     button.addEventListener('click', () => {
//         var playerChoice = button.id;
//         var computerChoice = options[Math.floor(Math.random() * options.length)];
//         var result = getResult(playerChoice, computerChoice);
//         document.getElementById('result').innerText = `Player: ${playerChoice} | Computer: ${computerChoice} | ${result}`;

//         console.log("Player Choice:", playerChoice);
//         console.log("Computer Choice:", computerChoice);
//         console.log("Result:", result);    
        
//         // Save result to Firebase
//         const resultsRef = ref(database, 'results'); 
//         const newResultRef = push(resultsRef);
//         set(newResultRef, {"player": playerChoice, "computer": computerChoice, "result": result});    
//     });

//     });


// function getResult(player, computer) {
//     if (player === computer) return "It's a tie!";
//     if ((player === "Rock" && computer === "Scissors") ||
//         (player === "Paper" && computer === "Rock") ||
//         (player === "Scissors" && computer === "Paper")) {
//         return "Player wins!";
//     } else {
//         return "Computer wins!";
//     }
// }

