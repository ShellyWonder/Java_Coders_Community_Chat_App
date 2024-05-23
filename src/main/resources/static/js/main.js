// main.js: Initializes the application and handles login status checks.

import { checkLoginStatus,handleLoginStatus, attachAuthEventListeners,
         attachEventListeners} from './auth.js';
import { updateNavbarChannels, updateChannelSelection } from './uiUtil.js';
import { attachChannelEventListeners} from './channel.js';


// user login check and update
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired");
    // Check if the user is logged in and update the UI accordingly
    const isLoggedIn = checkLoginStatus();
    handleLoginStatus(isLoggedIn);
    attachEventListeners();

    // Attach event listeners specific to the login and registration forms if they exist
    if (document.querySelector("#loginForm") || document.querySelector("#registrationFormContent")) {
      attachAuthEventListeners();
    }

    // Attach event listeners specific to the channel page if it exists
    if (document.querySelector(".channel")) {
      attachChannelEventListeners();
    }
    // Update the navbar channels for all pages
    updateNavbarChannels();

    // Update channel selection only on the index page
    if (document.querySelector(".list-group")) {
        updateChannelSelection();
    }

});
