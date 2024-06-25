// main.js: Handles the main initialization logic, including attaching event listeners and fetching the initial data.

import { checkLoginStatus, handleLoginStatus, attachAuthEventListeners } from './auth.js';
import { fetchAndUpdateChannels, attachJoinChannelEventListener, showOrHideNavDropdown, showOrHideLogoutButton, updateUserNameDisplay } from './uiUtil.js';
import { initializeChannelPage } from './channel.js';

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded() {
    console.log("DOMContentLoaded event fired");
    const isLoggedIn = checkLoginStatus();
    console.log("Is logged in:", isLoggedIn);

    handleInitialPageLoad(isLoggedIn);
    //used for login and registration forms
    attachAuthEventListenersIfNeeded();
    //buttons used for selecting a channel to join
    attachJoinChannelEventListener();
    
    // Only call fetchAndUpdateChannels if the user is already logged in before the login action
    if (isLoggedIn && window.location.pathname === "/") {
        fetchAndUpdateChannels();
    }
    
    // Attach event listeners and initialize the channel page if on a channel
    if (window.location.pathname.startsWith("/api/channel/")) {
        initializeChannelPage();
    }
    
    //used for presenting channel dropdown list in Navbar
    showOrHideNavDropdown(isLoggedIn);
    //used for presenting logout button in Navbar to logged in user
    showOrHideLogoutButton(isLoggedIn);
    //used for presenting logged in username in channel selection card 
    updateUserNameDisplay();
}

function handleInitialPageLoad(isLoggedIn) {
    console.log("Handling initial page load, isLoggedIn:", isLoggedIn);
    if (isLoginOrHomePage()) {
        handleLoginStatus(isLoggedIn);
    } else if (!isLoggedIn) {
        redirectToLogin();
    }
}

function isLoginOrHomePage() {
    return window.location.pathname === "/" || window.location.pathname === "/login";
}

function attachAuthEventListenersIfNeeded() {
    if (document.querySelector("#loginForm") || document.querySelector("#registrationFormContent")) {
        attachAuthEventListeners();
    }
}

function redirectToLogin() {
    window.location.href = "/login";
}
