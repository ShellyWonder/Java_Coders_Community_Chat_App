
// This file contains the JavaScript code for the login and registration forms. 
//It handles form submission, user authentication, user registration, user display and user logout.
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");
    const registrationForm = document.querySelector("#registrationFormContent"); 
    // Handle Login Submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateExistingUser();
     
    });

    // Handle Registration Submission
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        registerNewUser();
    });

    // Switch between login and registration forms
    document.querySelector("#registerBtn").addEventListener("click", function () {
        document.querySelector("#login").style.display = "none";
        document.querySelector("#registrationForm").style.display = "block";
    });

    document.querySelector("#backBtn").addEventListener("click", function () {
        document.querySelector("#registrationForm").style.display = "none";
        document.querySelector("#login").style.display = "block";
    });
});

function validateExistingUser() {
    var userName = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var user = { userName: userName, password: password };

    fetch("/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("userName", userName);
            document.querySelector("#login").style.display = "none";
            document.querySelector("#channelSelect").style.display = "block";
            fetchChannels();
            updateUserNameDisplay();
        } else {
            alert("Invalid username or password. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error logging in.");
    });
}

function registerNewUser() {
    const userName = document.querySelector("#regUsername").value;
    const password = document.querySelector("#regPassword").value;
    const firstName = document.querySelector("#regFirstName").value;
    const lastName = document.querySelector("#regLastName").value;

    const user = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName
    };

    fetch("/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        alert("Registration successful! Please log in.");
        document.querySelector("#registrationForm").style.display = "none";
        document.querySelector("#login").style.display = "block";
    })
    .catch(error => {
        console.error('There was a problem with your registration:', error);
        alert("Registration failed. Please try again.");
    });
}



function showOrHideLogoutButton() {
    const logoutButton = document.querySelector("#logoutBtn");
    const isLoggedIn = sessionStorage.getItem("userId") !== null;
    
    if (logoutButton) {
        if (isLoggedIn) {
            logoutButton.style.display = "block"; // Show logout button
        } else {
            logoutButton.style.display = "none"; // Hide logout button
        }
    }
}

//Initialize logout button display in Navbar
document.addEventListener("DOMContentLoaded", function () {
    showOrHideLogoutButton();
});

// Attach event listener for logout
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector("#logoutBtn");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});
function logout() {
    sessionStorage.clear(); // Clear user session data
    updateUserNameDisplay(); // Update UI based on logout
    alert("You have been logged out.");
    window.location.href = '/'; // Redirect to index
}

function updateUserNameDisplay() {
    const userNameDisplay = document.querySelector("#userNameDisplay");
    const userName = sessionStorage.getItem("userName");
    if (userName) {
        userNameDisplay.textContent = userName;
    } else {
        userNameDisplay.textContent = "Not logged in";
    }
}