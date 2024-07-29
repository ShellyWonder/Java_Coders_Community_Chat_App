// main.js: Handles the main initialization logic, including attaching event listeners and fetching the initial data.
import { setCurrentChannelId } from './shared.js';
import { checkLoginStatus, attachAuthEventListeners } from './auth.js';
import { fetchAndUpdateChannels, attachJoinChannelEventListener, showOrHideNavDropdown, 
          showOrHideLogoutButton, updateUserNameDisplay } from './uiUtil.js';
import { initializeChannelPage, attachChannelEventListeners, fetchChannelViewData } from './channel.js';


document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded() {
    console.log("DOMContentLoaded event fired");
    const isLoggedIn = checkLoginStatus();
    console.log("Is logged in:", isLoggedIn);

    handleInitialPageLoad(isLoggedIn);
    //used for login and registration forms
    attachAuthEventListenersIfNeeded();
    //buttons used for selecting a channel to join
    attachJoinChannelEventListenerIfNeeded();
    
    // Only call fetchAndUpdateChannels if the user is already logged in before the login action
    if (isLoggedIn && window.location.pathname === "/") {
        fetchAndUpdateChannels();
    }

        handleDirectChannelAccess(isLoggedIn);
        //used for presenting channel dropdown list in Navbar
        showOrHideNavDropdown(isLoggedIn);
        //used for presenting logout button in Navbar to logged in user
        showOrHideLogoutButton(isLoggedIn);
        //used for presenting logged in username in channel selection card 
        updateUserNameDisplay();
}

function handleDirectChannelAccess() {
    if (window.location.pathname.startsWith("/channel/")) {
        const channelViewData = JSON.parse(sessionStorage.getItem('currentChannelViewData'));
        if (channelViewData) {
            console.log("Initializing channel page with data:", channelViewData);
            initializeChannelPage(channelViewData);
            attachChannelEventListeners();
        } else {
            const pathnameParts = window.location.pathname.split('/');
            const channelId = pathnameParts[pathnameParts.length - 1];
            setCurrentChannelId(channelId); // Set the current channel ID in the shared module
            fetchChannelViewData(channelId); // Fetch the data if not present in sessionStorage
        }
    }
}

function handleInitialPageLoad(isLoggedIn) {
    if (isLoggedIn) {
        console.log("User is logged in");
        // Perform actions for logged-in users
        fetchAndUpdateChannels();  // Fetch and update the list of channels
        showOrHideNavDropdown(true); // Show the navigation dropdown
        updateUserNameDisplay(); // Update the user name display
        showOrHideLogoutButton(true); // Show the logout button
        
    } else {
        console.log("User is not logged in");
        // Perform actions for guests
        showOrHideNavDropdown(false); // Hide the navigation dropdown
    }
}


function attachAuthEventListenersIfNeeded() {
    if (document.querySelector("#loginForm") || document.querySelector("#registrationFormContent")) {
        attachAuthEventListeners();
    }
}

function attachJoinChannelEventListenerIfNeeded() {
    if (document.querySelector("#channelSelect")) {
        attachJoinChannelEventListener();
    }
}


