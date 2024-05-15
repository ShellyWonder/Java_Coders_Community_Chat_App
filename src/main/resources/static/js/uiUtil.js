// Function to update the navbar with channel links
export function updateNavbarChannels() {
    fetch("/api/channels")
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

// Function to update the channel selection card (specific to index.html)
export function updateChannelSelection() {
    fetch("/api/channels")
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
                    <a href="/channel/${channel.id}" class="btn btn-primary">Join
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill 
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

// Event listeners for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
    updateNavbarChannels(); // Update navbar channels for both pages
    if (document.querySelector(".list-group")) {
        updateChannelSelection(); // Only call this in index.html where .list-group exists
    }
});
