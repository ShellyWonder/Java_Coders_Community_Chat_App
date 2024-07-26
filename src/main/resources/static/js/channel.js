// channel.js: Manages channel interactions and updates related to channels.
import { getCurrentChannelId, getCurrentUser } from "./shared.js";

let quill;
export function initializeChannelPage(channelViewData) {
  const currentChannelId = getCurrentChannelId();
  console.log("Channel selected:", currentChannelId);

  // Ensure elements are present before proceeding
  if (!document.querySelector("#messageList")) {
    console.error("Element with ID messageList not found");
    return;
  }

  // Initialize Quill editor if the element is present
  const editorElement = document.querySelector("#editor");
  if (editorElement) {
    quill = new Quill("#editor", {
      theme: "snow",
    });
  } else {
    console.error("Element with ID editor not found");
    return;
  }

  // Use already fetched data to populate the channel details
  channelViewDetails(channelViewData.channel);
  updateMessageList(channelViewData.messages);
  updateParticipantCountDisplay(channelViewData.participantCount);
}

export function attachChannelEventListeners() {
  console.log("Attaching channel event listeners");

  const messageBtn = document.querySelector("#messageBtn");
  const messageList = document.querySelector("#messageList");

  console.log("Elements found:", { messageBtn, messageList });

  if (messageBtn) {
    messageBtn.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Message button clicked");
      const messageContent = quill.root.innerHTML.trim();
      if (messageContent) {
        sendMessage(messageContent);
      } else {
        console.log("Message content is empty");
      }
    });
  }
}
export function startMessageRefresh(channelId) {
  setInterval(() => {
    if (channelId) {
      fetchChannelViewData(channelId);
    }
  }, 400000); // Fetch messages every 40 seconds
}

export async function fetchChannelViewData(channelId) {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const response = await fetch(`/api/channel/${channelId}/view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const channelViewData = await response.json();
      sessionStorage.setItem(
        "currentChannelViewData",
        JSON.stringify(channelViewData)
      ); // Save fetched data to sessionStorage
      initializeChannelPage(channelViewData); // Initialize the channel page with fetched data
      attachChannelEventListeners();
    } else {
      throw new Error("Failed to fetch channel view data");
    }
  } catch (error) {
    console.error("Error fetching channel view data:", error);
  }
}
//dynamically populates channel details on channelSelect card
export function channelSelectDetails(channelData, idPrefix = "") {
  const channelNameElement = document.querySelector(
    `#${idPrefix}channelName_${channelData.id}`
  );
  const channelDescriptionElement = document.querySelector(
    `#${idPrefix}channelDescription_${channelData.id}`
  );

  if (channelNameElement) {
    channelNameElement.textContent = channelData.name;
  } else {
    console.error(
      `Element with ID ${idPrefix}channelName_${channelData.id} not found`
    );
  }

  if (channelDescriptionElement) {
    channelDescriptionElement.textContent = channelData.description;
  } else {
    console.error(
      `Element with ID ${idPrefix}channelDescription_${channelData.id} not found`
    );
  }

  console.log("Channel data:", channelData);
}

//dynamically populates channel details on channel page
export function channelViewDetails(channelData) {
  const channelNameElement = document.querySelector("#channelName");
  const channelDescriptionElement = document.querySelector(
    "#channelDescription"
  );

  if (channelNameElement) {
    channelNameElement.textContent = channelData.name;
  } else {
    console.error("Element with ID channelName not found");
  }

  if (channelDescriptionElement) {
    channelDescriptionElement.textContent = channelData.description;
  } else {
    console.error("Element with ID channelDescription not found");
  }

  console.log("Channel data for channel page:", channelData);
}

export function populateChatDetails(chat) {
  const messageList = document.querySelector("#messageList");
  if (!messageList) {
    console.error("Element with ID messageList not found");
    return;
  }

  const card = document.createElement("div");
  const userName = chat.userName ? chat.userName : "Unknown User";
  const message = chat.message ? chat.message : "No message content";
  const publishedAt = chat.publishedAt
    ? formatDate(new Date(chat.publishedAt))
    : "Unknown date";
  card.className = "card chatCard mb-3";

  card.innerHTML = `
    <h5 class="card-header">${userName}</h5>
        <div class="card-body">
            <p class="card-text">${message}</p>
            <a href="#" class="btn btn-primary">Reply</a>
        </div>
        <div class="card-footer text-body-secondary">${publishedAt}</div>
    `;

  messageList.appendChild(card);
}

export function updateMessageList(messages) {
  const messageList = document.querySelector("#messageList");
  if (!messageList) {
    console.error("Element with ID messageList not found");
    return;
  }

  messageList.innerHTML = "";
  if (messages.length === 0) {
    messageList.innerHTML =
      "<li>No one has posted to this channel yet. Be the first!</li>";
  } else {
    messages.forEach((chat) => {
      console.log("Chat object:", chat);
      populateChatDetails(chat);
    });
  }
}

function updateParticipantCountDisplay(participantCount) {
  document.querySelector("#participantCount").textContent = participantCount;
}

function formatDate(date) {
  return date.toLocaleString(); // Formats the date in a human-readable way
}

function sendMessage() {
  const token = sessionStorage.getItem("jwtToken");
  const channelId = getCurrentChannelId();
  const currentUser = getCurrentUser();
  // Get the content from the Quill editor
  const messageContent = quill.root.innerHTML.trim();
  if (channelId === null) {
    console.log("Channel ID is missing from sessionStorage");
    return;
  }
  console.log("Channel ID for message:", channelId);

  if (!token) {
    console.log("JWT token is missing from sessionStorage");
    return;
  }

  if (!messageContent) {
    console.log("Message content is empty");
    return;
  }
  if (!currentUser) {
    console.log("Current user is missing from sessionStorage");
    return;
  }

  const messagePayload = {
    message: messageContent,
    user: {
      id: currentUser.id,
      userName: currentUser.name,
    },
  };
  console.log("Sending message with token:", token);
  fetch(`/api/channel/${channelId}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messagePayload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Message sent:", data);
      quill.root.innerHTML = ""; // Clear the editor after sending
      fetchMessages(channelId); // Refresh messages after sending
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      console.log("Error details:", error.message);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    });
}

export async function fetchMessages() {
  const token = sessionStorage.getItem("jwtToken");
  const currentChannelId = getCurrentChannelId();
  console.log("Fetching messages with token:", token);
  try {
    const response = await fetch(`/api/channel/${currentChannelId}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetch response status:", response.status);
    const messages = await response.json();
    updateMessageList(messages);
    console.log("Messages fetched:", messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}
