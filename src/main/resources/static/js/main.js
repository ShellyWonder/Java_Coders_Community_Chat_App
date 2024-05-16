// main.js: Initializes the application and handles login status checks.

import { handleLoginStatus, attachEventListeners } from './auth.js';
import { updateNavbarChannels, updateChannelSelection } from './uiUtil.js';

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("userId") !== null;
    handleLoginStatus(isLoggedIn);
    attachEventListeners();

    // Update the navbar channels for all pages
    updateNavbarChannels();

    // Update channel selection only on the index page
    if (document.querySelector(".list-group")) {
        updateChannelSelection();
    }

    
});
