document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");
    const registrationForm = document.querySelector("#registrationFormContent"); 
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
    var userName = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var user = { userName: userName, password: password };

    fetch("/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("userName", userName);
            document.querySelector("#login").style.display = "none";
            document.querySelector("#channelSelect").style.display = "block";
            fetchChannels();
            updateUserNameDisplay();
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
    const userName = document.querySelector("#regUsername").value;
    const password = document.querySelector("#regPassword").value;
    const firstName = document.querySelector("#regFirstName").value;
    const lastName = document.querySelector("#regLastName").value;

    const user = {
        userName: userName,
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
        const channelsList = document.querySelector(".list-group");
        channelsList.innerHTML = "";
        channels.forEach(channel => {
            channelsList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="name">${channel.name}</div>
                    <div class="description">${channel.description}</div>
                </div>
                <span class="badge rounded-pill">Current channel participants: ${channel.participantCount}</span>
            </li>`;
        });
    })
    .catch(error => console.error('Error fetching channels:', error));
}

function updateUserNameDisplay() {
    // This is where you need to check the session storage and update the greeting
    const userNameDisplay = document.querySelector("#userNameDisplay");
    const userName = sessionStorage.getItem("userName");
    if (userName) {
        userNameDisplay.textContent = userName;
    } else {
        userNameDisplay.textContent = "Not logged in";
    }
};


function logout() {
    // Clear localStorage 
    sessionStorage.clear();
    // Redirect to login page or display login screen
    window.location.href = '/login'; // Redirect to login page
}
