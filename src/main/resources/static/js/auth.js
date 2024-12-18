// auth.js: Handles authentication-related logic.
import {
  fetchAndUpdateChannels,
  showOrHideNavDropdown,
  showOrHideLogoutButton,
  updateUserNameDisplay,
} from "./uiUtil.js";
import { setCurrentUser,setCurrentToken } from "./shared.js";

export function checkLoginStatus() {
  return sessionStorage.getItem("jwtToken") !== null;
}

export function handleLoginStatus(isLoggedIn) {
  if (isLoggedIn) {
    hideLoginAndRegistrationForms();
    showOrHideNavDropdown(true);
    updateUserNameDisplay();
    showOrHideLogoutButton(true);
  } else {
    showOrHideNavDropdown(false);
    showOrHideLogoutButton(false);
  }
}

export function attachAuthEventListeners() {
  console.log("Attaching event listeners");
  document.querySelector("#loginForm")?.addEventListener("submit", handleLoginFormSubmit);
  document.querySelector("#togglePassword")?.addEventListener("click", togglePasswordVisibility);
  document.querySelector("#registrationFormContent")?.addEventListener("submit", handleRegistrationFormSubmit);
  document.querySelector("#registerBtn")?.addEventListener("click", () => toggleFormVisibility("#login", "#registrationForm"));
  document.querySelector("#backBtn")?.addEventListener("click", () => toggleFormVisibility("#registrationForm", "#login"));
  document.querySelector("#logoutBtn")?.addEventListener("click", logout);
}

function handleLoginFormSubmit(event) {
  event.preventDefault();
  console.log("Form submission captured");
  loginUser();
  clearLoginForm();
}

function loginUser() {
  const userName = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const user = { userName, password };

  console.log("Sending login request", user);

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.authenticated) {
        const { token, user } = data;
        setCurrentToken(token);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("userId", user.id);
        setCurrentUser(user);
        handleLoginStatus(true);
        toggleFormVisibility("#login", "#channelSelect");
        fetchAndUpdateChannels(); // Only call here after a successful login
      } else {
        alert("Invalid username or password. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error logging in.");
    });
}

function handleRegistrationFormSubmit(event) {
  event.preventDefault();
  registerNewUser();
  clearRegistrationForm();
}

function registerNewUser() {
  const userName = document.querySelector("#regUsername").value;
  const password = document.querySelector("#regPassword").value;
  const firstName = document.querySelector("#regFirstName").value;
  const lastName = document.querySelector("#regLastName").value;
  const user = { userName, password, firstName, lastName };

  fetch("api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then(() => {
      alert("Registration successful! Please log in.");
      toggleFormVisibility("#registrationForm", "#login");
    })
    .catch((error) => {
      console.error("There was a problem with your registration:", error);
      alert("Registration failed. Please try again.");
    });
}

function hideLoginAndRegistrationForms() {
  toggleFormVisibility("#login", "#channelSelect");
}

function logout() {
  sessionStorage.clear();
  handleLoginStatus(false);
  alert("You have been logged out.");
  window.location.href = "/";
}

function clearLoginForm() {
  document.querySelector("#loginForm")?.reset();
}

function clearRegistrationForm() {
  document.querySelector("#registrationFormContent")?.reset();
}

function toggleFormVisibility(hideSelector, showSelector) {
  const hideElement = document.querySelector(hideSelector);
  const showElement = document.querySelector(showSelector);

  if (hideElement) {
    hideElement.style.display = "none";
  }

  if (showElement) {
    showElement.style.display = "block";
  }
}

function togglePasswordVisibility() {
  const password = document.querySelector("#password");
  const togglePasswordIcon = document.querySelector("#togglePasswordIcon");

  // Toggle the type attribute using getAttribute() and setAttribute()
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle the eye slash icon
  if (type === "password") {
    togglePasswordIcon.classList.remove("bi-eye-slash");
    togglePasswordIcon.classList.add("bi-eye");
  } else {
    togglePasswordIcon.classList.remove("bi-eye");
    togglePasswordIcon.classList.add("bi-eye-slash");
  }
}
