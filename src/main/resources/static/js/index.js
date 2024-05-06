// This file handles all non-authentication-related JavaScript code. 
//It fetches and displays channels

export function fetchAndDisplayChannels() {
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
            channelsList.innerHTML += `<li class="list-group-item">
                        <div class="ms-2 me-auto">
                            <div class="name">${channel.name}</div>
                            <div class="description">${channel.description}</div>
                        </div>
                          <!--display number of participants currently in the channel-->
                          <a href="/channels/${channel.id}" class="btn btn-primary">Join
                          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill 
                          id="'participantCount' + ${channel.id}">0
                          <span class="visually-hidden">current number in chat</span>
                          </span>
                        </a>            
            </li>`;
           
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
