// uiUtil.js: Handles UI updates that are used across multiple pages.

let channelsFetched = false;

export function fetchAndUpdateChannels() {
    const token = sessionStorage.getItem("jwtToken");
    if (channelsFetched) return;
    channelsFetched = true;
    console.log("Fetching channels with token:", token); // Log the token
    fetch("/api/channels", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(channels => {
        if (Array.isArray(channels)) {
            updateNavbarChannels(channels);
            updateChannelSelection(channels);
        } else {
            console.error('Expected an array of channels, but received:', channels);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
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


function updateChannelSelection(channels) {
    const channelsList = document.querySelector("ol.list-group");
    if (channelsList) {
        channelsList.innerHTML = "";
        if (Array.isArray(channels)) {
            channels.forEach(channel => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="ms-2 me-auto">
                        <div class="name">${channel.name}</div>
                        <div class="description">${channel.description}</div>
                    </div>
                    <a href="/channel/${channel.id}" class="btn btn-primary" data-channel-id="${channel.id}">Join
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                              id="participantCount_${channel.id}" 
                              title="Current number in chat">0
                            <span class="visually-hidden">current number in chat</span>
                        </span>
                    </a>`;
                channelsList.appendChild(listItem);
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
    const userNameDisplay = document.querySelector("#userNameDisplay");
    const userName = sessionStorage.getItem("userName");
    if (userName) {
        userNameDisplay.textContent = userName;
    } else {
        userNameDisplay.textContent = "Not logged in";
    }
}

// Reset the flag when the page is loaded, reducing the opportunity for redundant fetches
document.addEventListener("DOMContentLoaded", () => {
    channelsFetched = false;
});





