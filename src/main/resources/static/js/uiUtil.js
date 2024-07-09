 // uiUtil.js: Handles UI updates that are used across multiple pages.
 //channel related functions used outside channel.html have been moved from channel.js to uiUtil.js 
// to keep the code organized and available to future features.

import { checkLoginStatus} from './auth.js';
import { populateChannelDetails} from './channel.js';

let channelsFetched = false;

//handles join button on index.html #channelSelect
export function attachJoinChannelEventListener() {
    const channelsList = document.querySelector('#channelsList');
    if (channelsList) {
        channelsList.addEventListener('click', joinChannelHandler);
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
            console.log('JWT Token:', token);  // Log the token to verify

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
                    
                    // Redirect to the channel view, include the token in the URL
                    window.location.href = `/channel/${currentChannelId}?token=${token}`; // Include token in URL

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


export async function fetchAndUpdateChannels() {
    const token = sessionStorage.getItem("jwtToken");
    if (channelsFetched) return;
    channelsFetched = true;
    console.log("Fetching channels with token:", token); // Log the token
    try {
        const response = await fetch("/api/channels", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const channels = await response.json();
        if (Array.isArray(channels)) {
            updateNavbarChannels(channels);
            updateChannelSelection(channels);
        } else {
            console.error('Expected an array of channels, but received:', channels);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function updateNavbarChannels(channels) {
    const dropdownMenu = document.querySelector("#channelsDropdownMenu");
    if (dropdownMenu) {
        dropdownMenu.innerHTML = "";
        if (Array.isArray(channels)) {
            channels.forEach(channel => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = `/channel/${channel.id}`;
                link.textContent = channel.name;
                link.className = "dropdown-item";
                listItem.appendChild(link);
                dropdownMenu.appendChild(listItem);
            });
        } else {
            console.error('Expected an array of channels, but received:', channels);
        }
    } else {
        console.error("Dropdown menu element not found");
    }
}

export async function updateParticipantCount(channelId) {
    const token = sessionStorage.getItem("jwtToken");
    console.log("Updating participant count with token:", token);
    try {
        const response = await fetch(`/api/channel/${channelId}/participants/count`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const participantCount = await response.json();
            const participantCountElement = document.querySelector(`#participantCount_${channelId}`);
            if (participantCountElement) {
                participantCountElement.textContent = participantCount;
            } else {
                console.error(`Element with ID participantCount_${channelId} not found`);
            }
        } else {
            console.error('Failed to fetch participant count:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateChannelSelection(channels) {
    const channelsList = document.querySelector('#channelsList');
    if (channelsList) {
        channelsList.innerHTML = "";
        if (Array.isArray(channels)) {
            channels.forEach(channel => {
                console.log('Processing channel:', channel); // Add debug log
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="ms-2 me-auto">
                        <h1 class="name" id="channelName_${channel.id}"></h1>
                        <p class="description" id="channelDescription_${channel.id}"></p>
                    </div>
                    <button id="joinButton" class="btn btn-primary" data-channel-id="${channel.id}">Join
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                            id="participantCount_${channel.id}" 
                            title="Current number in chat">0
                            <span class="visually-hidden">current number in chat</span>
                        </span>
                    </button>`;
                channelsList.appendChild(listItem);
                // Populate channel details for each channel
                populateChannelDetails(channel);
                // Update participant count for each channel
                updateParticipantCount(channel.id);
            });
        } else {
            console.error('Expected an array of channels, but received:', channels);
        }
    } else {
        console.error("Channels list element not found");
    }
}

export function showOrHideNavDropdown(isLoggedIn) {
    const channelDropdown = document.querySelector("#channelsDropdown");
    if (channelDropdown) {
        channelDropdown.style.display = isLoggedIn ? "block" : "none";
        if (isLoggedIn && !channelsFetched) fetchAndUpdateChannels();
    }
}

export function showOrHideLogoutButton(isLoggedIn) {
    const logoutButton = document.querySelector("#logoutBtn");
    if (logoutButton) {
        logoutButton.style.display = isLoggedIn ? "block" : "none";
    }
}

export function updateUserNameDisplay() {
    const userNameElement = document.querySelector("#userName");
    if (userNameElement) {
        const userName = sessionStorage.getItem("userName");
        userNameElement.textContent = userName || "User";
    } else {
        console.error("Element with ID userName not found");
    }
}


// Reset the flag when the page is loaded, reducing the opportunity for redundant fetches
document.addEventListener("DOMContentLoaded", () => {
    channelsFetched = false;
});





