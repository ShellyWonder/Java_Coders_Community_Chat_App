
//registerBtn click displays registration form, hides login form
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#registerBtn").addEventListener("click", function () {
        document.querySelector("#login").style.display = "none";
        document.querySelector("#registrationForm").style.display = "block";
    });

    //backBtn click hides registration form, reinstates login form
    document.querySelector("#backBtn").addEventListener("click", function () {
        document.querySelector("#registrationForm").style.display = "none";
        document.querySelector("#login").style.display = "block";
    }
)});
//alert shows when registration is successful
function registrationSuccess() {
    alert("Registration successful! Please log in.");
    // alert lasts 2 seconds and then disappears
    setTimeout(function () {
        document.querySelector("#registrationSuccess").style.display = "none";
    }, 2000);
    document.querySelector("#registrationForm").style.display = "none";
    document.querySelector("#login").style.display = "block";
    document.querySelector("#registerBtn").style.display = "none";
    document.querySelector("#backBtn").style.display = "none";
    document.querySelector("#loginBtn").style.display = "block";

}
//validate username and password inputs match database
function validateExistingUser() {
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var user = {
        username: username,
        password: password
    };
    fetch("/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(function (response) {
            if (response.status === 200) {
                window.location.href = "/home";
            } else {
                alert("Invalid username or password. Please try again.");

                // alert lasts 2 seconds and then disappears
                setTimeout(function () {
                    document.querySelector("#loginError").style.display = "none";
                }, 2000);
            }
        });
}
//validate registration form username is unique to the database and save registration form inputs to the database
document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.querySelector("#regUsername");
    const registrationForm = document.querySelector("#registrationForm");

    // Function to check username uniqueness
    function checkUsernameUnique(username) {
        fetch(`/check-username?username=${encodeURIComponent(username)}`)
            .then(response => response.json())
            .then(data => {
                if (data.isUnique) {
                    // Username is unique, allow form submission or give positive feedback
                    console.log("Username is unique.");
                } else {
                    // Username is not unique, prevent form submission or give feedback
                    alert("Username is already taken. Please choose another.");
                }
            })
            .catch(error => console.error('Error checking username:', error));
    }

    usernameInput.addEventListener("input", function() {
        const username = usernameInput.value;
        
        if (username.length > 3) { // Check the username if it's longer than 3 characters
            checkUsernameUnique(username);
        }
    });

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData(registrationForm);
        const username = formData.get("username");

        checkUsernameUnique(username).then(isUnique => {
            if (!isUnique) {
                alert("Please fix the errors before submitting the form.");
                return;
            }

            // Proceed with form submission if username is unique
            const fetchOptions = {
                method: 'POST',
                body: formData,
                headers: {
                    // Adjust headers as needed, e.g., for JSON payload
                }
            };

            fetch('/register', fetchOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Handle success, e.g., show success message, redirect, etc.
                    alert("Registration successful!");
                    // Reset form, hide registration form, show login form, etc.
                })
                .catch(error => console.error('There was a problem with your fetch operation:', error));
        });
    });
});
