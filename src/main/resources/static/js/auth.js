// This file contains the JavaScript code for the login and registration forms. 
// It handles form submission, user authentication, user registration, user display and user logout.

import { fetchAndDisplayChannels } from './index.js';

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("userId") !== null;
    handleLoginStatus(isLoggedIn);  // Check if user is logged in
    attachEventListeners(); // Attach event listeners to form elements
});

export function handleLoginStatus(isLoggedIn) {
    if (isLoggedIn) {
        hideLoginAndRegistrationForms();
        showOrHideNavDropdown(true);
        updateUserNameDisplay();
        showOrHideLogoutButton(true);
    } else {
        showOrHideNavDropdown(false);
        showOrHideLogoutButton(false);
    }
}

export function attachEventListeners() {
    const logoutButton = document.querySelector("#logoutBtn");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginFormSubmit );
    }

    const registrationForm = document.querySelector("#registrationFormContent");
    if (registrationForm) {
        registrationForm.addEventListener("submit", handleRegistrationFormSubmit); 
    }

    const registerBtn = document.querySelector("#registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            // toggle login and registration forms via buttons
            toggleFormVisibility("#login", "#registrationForm");
        });
    }
    const backBtn = document.querySelector("#backBtn");
    if (backBtn) {
        backBtn.addEventListener("click", function () {
            toggleFormVisibility("#registrationForm", "#login");
        });
    }
}

function handleLoginFormSubmit(event) {
    event.preventDefault();
    validateExistingUser();
    clearLoginForm();
}

function handleRegistrationFormSubmit(event) {
    event.preventDefault();
    registerNewUser();
    clearRegistrationForm();
}


function validateExistingUser() {
    const userName = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const user = { userName, password };

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
            toggleFormVisibility("#login", "#channelSelect");
            fetchAndDisplayChannels();
            showOrHideLogoutButton(true);
            showOrHideNavDropdown(true);
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

    const user = { userName, password, firstName, lastName };

    fetch("/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        alert("Registration successful! Please log in.");
        toggleFormVisibility("#registrationForm", "#login");
    })
    .catch(error => {
        console.error('There was a problem with your registration:', error);
        alert("Registration failed. Please try again.");
    });
}

function showOrHideNavDropdown(isLoggedIn) {
    const channelDropdown = document.querySelector("#channelsDropdown");
    if (channelDropdown) {
        channelDropdown.style.display = isLoggedIn ? "block" : "none";
        if (isLoggedIn) fetchAndDisplayChannels();
    }
}

function showOrHideLogoutButton(isLoggedIn) {
    const logoutButton = document.querySelector("#logoutBtn");
    if (logoutButton) {
        logoutButton.style.display = isLoggedIn ? "block" : "none";
    }
}

function hideLoginAndRegistrationForms() {
    toggleFormVisibility("#login", "#channelSelect");
}

export function logout() {
    sessionStorage.clear(); // Clear user session data
    updateUserNameDisplay(); // Update UI based on logout
    showOrHideNavDropdown(false); // Update navbar based on logout
    showOrHideLogoutButton(false);
    alert("You have been logged out.");
    window.location.href = '/'; // Redirect to index
}

function updateUserNameDisplay() {
    const userNameDisplay = document.querySelector("#userNameDisplay");
    const userName = sessionStorage.getItem("userName");
    if (userName) {
        userNameDisplay.textContent = userName;
        //NOTE: the else statement is merely a double check; 
        //the user should never be directed to this page unless 
        //they are already logged in
    } else {
        alert("You are not logged in. You are being redirected to the login page.");
        window.location.href = '/index.html'; // Redirect to the index view
    }
   }

function clearLoginForm() {
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.reset(); // Clears all form fields
    }
}

function clearRegistrationForm() {
    const registrationForm = document.querySelector("#registrationFormContent");
    if (registrationForm) {
        registrationForm.reset(); // Clears all form fields
    }
}

function toggleFormVisibility(hideSelector, showSelector) {
    const hideForm = document.querySelector(hideSelector);
    const showForm = document.querySelector(showSelector);
    if (hideForm) hideForm.style.display = "none";
    if (showForm) showForm.style.display = "block";
}
