// main.js: Handles the main initialization logic, including attaching event listeners and fetching the initial data.

import { checkLoginStatus, handleLoginStatus, attachAuthEventListeners, attachEventListeners } from './auth.js';
import { fetchAndUpdateChannels } from './uiUtil.js';
import { attachChannelEventListeners } from './channel.js';

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded() {
    console.log("DOMContentLoaded event fired");
    const isLoggedIn = checkLoginStatus();

    handleInitialPageLoad(isLoggedIn);
    attachEventListeners();

    if (document.querySelector(".channel")) {
        attachChannelEventListeners();
        console.log("Channel event listeners attached");
    }

    // Only call fetchAndUpdateChannels if the user is already logged in before the login action
    if (isLoggedIn && window.location.pathname === "/") {
        fetchAndUpdateChannels();
    }
}

function handleInitialPageLoad(isLoggedIn) {
    if (isLoginOrHomePage()) {
        handleLoginStatus(isLoggedIn);
        attachAuthEventListenersIfNeeded();
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

