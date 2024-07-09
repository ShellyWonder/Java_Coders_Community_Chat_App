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

async function joinChannelHandler(event) {
    const joinButton = event.target.closest('.btn-primary[data-channel-id]');
    if (joinButton) {
        event.preventDefault(); 
        const currentChannelId = joinButton.getAttribute('data-channel-id');
        const isLoggedIn = checkLoginStatus();

        if (isLoggedIn) {
            console.log('Channel selected:', currentChannelId);
            const token = sessionStorage.getItem("jwtToken");

            // Fetch the channel view data
            try {
                const response = await fetch(`/api/channel/${currentChannelId}/view`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const channelViewData = await response.json();
                    console.log("Channel view data:", channelViewData);

                    // Save channel view data to sessionStorage 
                    sessionStorage.setItem('currentChannelViewData', JSON.stringify(channelViewData));
                    
                    // Navigate to the channel view
                    window.location.href = `/channel/${currentChannelId}?token=${token}`; // Force page reload with token

                } else {
                    throw new Error('Failed to fetch channel view data');
                }
            } catch (error) {
                console.error('Error fetching channel view data:', error);
            }
        } else {
            alert('You must be logged in to join a channel.');
            window.location.href = '/login'; // Redirect to login page
        }
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

function attachJoinChannelEventListener() {
    const channelsList = document.querySelector('#channelsList');
    if (channelsList) {
        channelsList.addEventListener('click', joinChannelHandler);
    }
}
