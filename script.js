// Initialize counters for total clicks, likes, and dislikes
let counter = 0;
let like = 0;
let dislike = 0;

// Get references to HTML elements
const totalClickEl = document.getElementById("click");
const likeClickEl = document.getElementById("like");
const dislikeClickEl = document.getElementById("dislike");
const resetClickEl = document.querySelector(".reset");
const rateEl = document.getElementById("rate");
const balanceBarEl = document.getElementById("balance-bar");

// Function to update counters and display on button clicks
function updateCounts(type) {
    counter++;
    type === "like" ? like++ : dislike++;
    rating(); // Update rating based on current like and dislike counts
    updateDisplay(); // Update displayed counts on the HTML page
}

// Function to reset all counters and update display
function resetCounts() {
    counter = 0;
    like = 0;
    dislike = 0;
    rating(); // Reset rating and update based on zero counts
    resetRating(); // Reset displayed percentage values
    updateDisplay(); // Update displayed counts on the HTML page
}

// Function to update displayed counts on the HTML page
function updateDisplay() {
    totalClickEl.textContent = counter;
    likeClickEl.textContent = like;
    dislikeClickEl.textContent = dislike;
    resetClickEl.classList.toggle("hide-btn", counter === 0); // Hide reset button if no clicks

    // Update balance bar
    const totalVotes = like + dislike;
    const likePercentage = totalVotes === 0 ? 0 : (like / totalVotes) * 100;
    const dislikePercentage = totalVotes === 0 ? 0 : (dislike / totalVotes) * 100;
    const neutralPercentage = 100 - likePercentage - dislikePercentage;

    // Dynamically calculate the gradient
    const gradient = `linear-gradient(to right,
        #4CAF50 ${likePercentage - 15}%, 
        #029af2 ${likePercentage + neutralPercentage - 5}%,
        #FF5733 ${likePercentage + neutralPercentage + dislikePercentage}%,
        #FF5733 ${neutralPercentage + dislikePercentage}%, #FF5733 100%
    )`;

    balanceBarEl.style.background = gradient;
}

// Function to calculate and update the percentage values for likes and dislikes
function calculatePercent(value, counter, elementId) {
    if (counter === 0) {
        document.getElementById(elementId).textContent = "N/A";
    } else {
        const percent = (value / counter) * 100;
        document.getElementById(elementId).textContent = Math.round(percent) + "%";
    }
    rateEl.textContent = ""; // Reset the overall rating text
}

// Function to determine and update the overall rating
function rating() {
    if (like > dislike) {
        calculatePercent(like, counter, "perlike");
        calculatePercent(dislike, counter, "perdislike");
    } else if (dislike > like) {
        calculatePercent(dislike, counter, "perdislike");
        calculatePercent(like, counter, "perlike");
    } else {
        calculatePercent(1, 2, "perlike"); // 0% for like
        calculatePercent(1, 2, "perdislike"); // 0% for dislike
        rateEl.textContent = "Neutral";
    }
}

// Function to reset displayed percentage values
function resetRating() {
    document.getElementById("perlike").textContent = "";
    document.getElementById("perdislike").textContent = "";
    rateEl.textContent = "";
}

// Function to handle button clicks based on the button type
function handleButtonClick(buttonType) {
    if (buttonType === "like-btn") {
        updateCounts("like");
    } else if (buttonType === "dislike-btn") {
        updateCounts("dislike");
    } else if (buttonType === "reset-btn") {
        resetCounts();
    }
}
