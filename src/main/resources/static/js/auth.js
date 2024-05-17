// auth.js: Handles form submission, user authentication, user registration, user display, and user logout.

import { updateNavbarChannels, showOrHideNavDropdown, showOrHideLogoutButton, updateUserNameDisplay } from './uiUtil.js';

export function checkLoginStatus() {
    return sessionStorage.getItem("userId") !== null;
}

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
    document.querySelector("#logoutBtn")?.addEventListener("click", logout);
    document.querySelector("#loginForm")?.addEventListener("submit", handleLoginFormSubmit);
    document.querySelector("#registrationFormContent")?.addEventListener("submit", handleRegistrationFormSubmit);
    document.querySelector("#registerBtn")?.addEventListener("click", () => toggleFormVisibility("#login", "#registrationForm"));
    document.querySelector("#backBtn")?.addEventListener("click", () => toggleFormVisibility("#registrationForm", "#login"));
}

export function handleLoginFormSubmit(event) {
    event.preventDefault();
    loginUser();
    clearLoginForm();
}

function loginUser() {
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
            handleLoginStatus(true);
            toggleFormVisibility("#login", "#channelSelect");
            updateNavbarChannels();
        } else {
            alert("Invalid username or password. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error logging in.");
    });
}

function handleRegistrationFormSubmit(event) {
    event.preventDefault();
    registerNewUser();
    clearRegistrationForm();
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
    .then(() => {
        alert("Registration successful! Please log in.");
        toggleFormVisibility("#registrationForm", "#login");
    })
    .catch(error => {
        console.error('There was a problem with your registration:', error);
        alert("Registration failed. Please try again.");
    });
}

function hideLoginAndRegistrationForms() {
    toggleFormVisibility("#login", "#channelSelect");
}

export function logout() {
    sessionStorage.clear();
    handleLoginStatus(false);
    alert("You have been logged out.");
    window.location.href = '/';
}

function clearLoginForm() {
    document.querySelector("#loginForm")?.reset();
}

function clearRegistrationForm() {
    document.querySelector("#registrationFormContent")?.reset();
}

function toggleFormVisibility(hideSelector, showSelector) {
    document.querySelector(hideSelector)?.style.display = "none";
    document.querySelector(showSelector)?.style.display = "block";
}
