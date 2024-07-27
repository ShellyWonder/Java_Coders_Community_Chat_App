//chatMessage.js: Manages message interactions and updates related to messages.
import { getCurrentChannelId, getCurrentUser } from "./shared.js";
let quill;

export function initializeMessages(messages) {
  const editorElement = document.querySelector("#editor");
  if (editorElement) {
    quill = new Quill("#editor", {
      theme: "snow",
    });
  }
  updateMessageList(messages);
}

export function attachChatMessageEventListeners() {
  const messageBtn = document.querySelector("#messageBtn");
  const messageList = document.querySelector("#messageList");

  if (messageBtn) {
    messageBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const messageContent = quill.root.innerHTML.trim();
      if (messageBtn.innerText === "Update") {
        const messageId = messageBtn.getAttribute("data-message-id");
        if (messageContent) {
          updateMessage(messageId, messageContent);
        } else {
          console.log("Message content is empty");
        }
      } else {
        if (messageContent) {
          sendMessage(messageContent);
        } else {
          console.log("Message content is empty");
        }
      }
    });
  }

  if (messageList) {
    messageList.addEventListener("click", function (event) {
      if (event.target.classList.contains("dropdown-item")) {
        event.preventDefault();
        const action = event.target.textContent.trim().toLowerCase();
        const messageId = event.target.closest("li").getAttribute("data-message-id");
        if (action === "edit") {
          editMessage(messageId);
        } else if (action === "delete") {
          deleteMessage(messageId);
        }
      }
    });
  }
}

export async function fetchMessages() {
  const token = sessionStorage.getItem("jwtToken");
  const currentChannelId = getCurrentChannelId();
  try {
    const response = await fetch(`/api/channel/${currentChannelId}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const messages = await response.json();
    updateMessageList(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

function updateMessageList(messages) {
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
      populateChatDetails(chat);
    });
  }
}

function populateChatDetails(chat) {
  const messageList = document.querySelector("#messageList");
  if (!messageList) {
    console.error("Element with ID messageList not found");
    return;
  }

  const currentUser = getCurrentUser();
  const isCurrentUser = currentUser && currentUser.id === chat.userId;
  const card = document.createElement("div");
  const userName = chat.userName ? chat.userName : "Unknown User";
  const message = chat.message ? chat.message : "No message content";
  const publishedAt = chat.publishedAt ? formatDate(new Date(chat.publishedAt))
                       : "Unknown date";

  card.className = isCurrentUser ? "card chatCard myMessage mb-3" : "card chatCard mb-3";

  card.innerHTML = `
    <h5 class="card-header">${userName}</h5>
    <div class="card-body">
      <p class="card-text">${message}</p>
      ${isCurrentUser ? `
        <i class="bi bi-three-dots-vertical" data-bs-toggle="dropdown"></i>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" onclick="editMessage('${chat.id}')">Edit</a></li>
          <li><a class="dropdown-item" href="#" onclick="deleteMessage('${chat.id}')">Delete</a></li>
        </ul>
      ` : ""}
    </div>
    <div class="card-footer text-body-secondary">${publishedAt}</div>
  `;

  messageList.appendChild(card);
}

async function sendMessage(messageContent) {
  const token = sessionStorage.getItem("jwtToken");
  const channelId = getCurrentChannelId();
  const currentUser = getCurrentUser();

  if (!token || !channelId || !messageContent || !currentUser) {
    console.log("Missing required data to send message");
    return;
  }

  const messagePayload = {
    message: messageContent,
    user: {
      id: currentUser.id,
      userName: currentUser.name,
    },
  };

  try {
    const response = await fetch(`/api/channel/${channelId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messagePayload),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const newMessage = await response.json();
    updateMessageList([...document.querySelector("#messageList").children, newMessage]);
    quill.setText("");
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

export function editMessage(messageId) {
    const messageText = document.querySelector(
      `[data-message-id="${messageId}"] .card-text`
    ).innerHTML;
    quill.root.innerHTML = messageText;
  
    const messageBtn = document.querySelector("#messageBtn");
    messageBtn.innerText = "Update";
    messageBtn.setAttribute("data-message-id", messageId);
  }

function formatDate(date) {
  return date.toLocaleString();
}
