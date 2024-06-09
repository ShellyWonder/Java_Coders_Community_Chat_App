// uiUtil.js: Contains utility functions for UI updates that are used across multiple pages.

export function updateNavbarChannels() {
    const token = sessionStorage.getItem("jwtToken");
    fetch("/api/channels", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(channels => {
        const dropdownMenu = document.querySelector("#channelsDropdownMenu");
        if (dropdownMenu) {
            dropdownMenu.innerHTML = "";
            channels.forEach(channel => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = `/channel/${channel.id}`;
                link.textContent = channel.name;
                link.className = "dropdown-item";
                listItem.appendChild(link);
                dropdownMenu.appendChild(listItem);
            });
        }
    });
}

export function updateChannelSelection() {
    const token = sessionStorage.getItem("jwtToken");
    fetch("/api/channels", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(channels => {
        const channelsList = document.querySelector(".list-group");
        if (channelsList) {
            channelsList.innerHTML = "";
            channels.forEach(channel => {
                channelsList.innerHTML += `<li class="list-group-item">
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
                        </a>              
                </li>`;
            });
        } else {
            console.log("ChannelList element not found");
        }
    }); 
}

export function showOrHideNavDropdown(isLoggedIn) {
    const channelDropdown = document.querySelector("#channelsDropdown");
    if (channelDropdown) {
        channelDropdown.style.display = isLoggedIn ? "block" : "none";
        if (isLoggedIn) updateNavbarChannels();
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

// Event listeners for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = checkLoginStatus();
    if (isLoggedIn) {
        updateNavbarChannels(); // Update navbar channels for both pages
        if (document.querySelector(".list-group")) {
            updateChannelSelection(); // Only call this in index.html where .list-group exists
        }
    } else {
        // Redirect to login page if not logged in
        window.location.href = "/login";
    }
});
