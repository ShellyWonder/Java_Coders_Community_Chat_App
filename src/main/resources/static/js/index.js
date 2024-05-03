// This file handles all non-authentication-related JavaScript code. 
//It fetches and displays channels

function fetchAndDisplayChannels() {
    fetch("/api/channels")
    .then(response => response.json())
    .then(channels => {
        // Populate channels in the nav dropdown
        const dropdownMenu = document.querySelector("#channelsDropdownMenu");
        dropdownMenu.innerHTML = "";
        channels.forEach(channel => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `/channels/${channel.id}`; // Adjust based on your route
            link.textContent = channel.name;
            link.className = "dropdown-item";
            listItem.appendChild(link);
            dropdownMenu.appendChild(listItem);
        });

        // Populate channels in the #channelSelect
        const channelsList = document.querySelector(".list-group");
        channelsList.innerHTML = "";
        channels.forEach(channel => {
            channelsList.innerHTML += `<li class="list-group-item">${channel.name}</li>`;
        });
    })
    .catch(error => {
        console.error("Error fetching channels:", error);
        alert("Error fetching channels. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayChannels(); // Call the function when the DOM is ready
});
