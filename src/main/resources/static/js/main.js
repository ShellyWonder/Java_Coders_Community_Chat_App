// main.js: Initializes the application and handles login status checks.

import { checkLoginStatus,handleLoginStatus, attachAuthEventListeners,
         attachEventListeners} from './auth.js';
import { updateNavbarChannels, updateChannelSelection } from './uiUtil.js';
import { attachChannelEventListeners} from './channel.js';


// user login check and update
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
    const isLoggedIn = checkLoginStatus();
    handleLoginStatus(isLoggedIn);
    attachEventListeners();

    if (document.querySelector("#loginForm") || document.querySelector("#registrationFormContent")) {
      attachAuthEventListeners();
    }

    if (document.querySelector(".channel")) {
      attachChannelEventListeners();
      console.log("Channel event listeners attached");

    }

    if (isLoggedIn) {
        updateNavbarChannels();
        if (document.querySelector("ol.list-group")) {
            updateChannelSelection(); // Ensure this is called when the user is logged in and on the index page
        }
    }
});

