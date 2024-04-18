document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");
    const registrationForm = document.querySelector("#registrationFormContent"); // Ensure you reference the correct form id

    // Handle Login Submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateExistingUser();
    });

    // Handle Registration Submission
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        registerNewUser();
    });

    // Switch between login and registration forms
    document.querySelector("#registerBtn").addEventListener("click", function () {
        document.querySelector("#login").style.display = "none";
        document.querySelector("#registrationForm").style.display = "block";
    });

    document.querySelector("#backBtn").addEventListener("click", function () {
        document.querySelector("#registrationForm").style.display = "none";
        document.querySelector("#login").style.display = "block";
    });
});

function validateExistingUser() {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var user = { username: username, password: password };

    fetch("/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("username", username);
            document.querySelector("#login").style.display = "none";
            document.querySelector("#channelSelect").style.display = "block";
            fetchChannels();
        } else {
            alert("Invalid username or password. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error logging in.");
    });
}

function registerNewUser() {
    const username = document.querySelector("#regUsername").value;
    const password = document.querySelector("#regPassword").value;
    const firstName = document.querySelector("#regFirstName").value;
    const lastName = document.querySelector("#regLastName").value;

    const user = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    };

    fetch("/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        alert("Registration successful! Please log in.");
        document.querySelector("#registrationForm").style.display = "none";
        document.querySelector("#login").style.display = "block";
    })
    .catch(error => {
        console.error('There was a problem with your registration:', error);
        alert("Registration failed. Please try again.");
    });
}

function fetchChannels() {
    fetch("/channels")
    .then(response => response.json())
    .then(channels => {
        const channelsList = document.querySelector(".list-group-numbered");
        channelsList.innerHTML = "";
        channels.forEach(channel => {
            channelsList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <h3 class="fw-bold">${channel.name}</h3>
                    <h4 class="fw-bold mt-2">${channel.description}</h4>
                </div>
                <span class="badge text-bg-primary rounded-pill">${channel.participantCount}</span>
            </li>`;
        });
    })
    .catch(error => console.error('Error fetching channels:', error));
}
