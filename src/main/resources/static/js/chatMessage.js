//chatMessage.js: Manages message interactions and updates.
import { getCurrentChannelId, getCurrentUser, 
         getCurrentChannelViewData, setCurrentChannelViewData } from "./shared.js";

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
  
    attachMessageButtonListener(messageBtn);
    attachMessageListListener(messageList);
  }
  
  // Function to attach listener to the message button
  function attachMessageButtonListener(messageBtn) {
    if (messageBtn) messageBtn.addEventListener("click", handleMessageButtonClick);
    
  }
  
  // Event handler for the message button click
  function handleMessageButtonClick(event) {
    event.preventDefault();
    const messageContent = quill.root.innerHTML.trim();
    const messageBtn = event.target;
  
    if (messageBtn.innerText === "Update") {
      handleUpdateMessage(messageBtn, messageContent);
    } else {
      handleSendMessage(messageContent);
    }
  }
  
  // Handle message update
  function handleUpdateMessage(messageBtn, messageContent) {
    const messageId = messageBtn.getAttribute("data-message-id");
    if (messageContent) {
      updateMessage(messageId, messageContent);
    } else {
      console.log("Message content is empty");
    }
  }
  
  // Handle sending a new message
  function handleSendMessage(messageContent) {
    if (messageContent) {
      sendMessage(messageContent);
    } else {
      console.log("Message content is empty");
    }
  }
  
  // Function to attach listener to the message list
  function attachMessageListListener(messageList) {
    if (messageList) {
      messageList.addEventListener("click", handleMessageListClick);
    }
  }
  
  // Event handler for message list clicks
  function handleMessageListClick(event) {
    if (event.target.classList.contains("dropdown-item")) {
      event.preventDefault();
      const action = event.target.textContent.trim().toLowerCase();
      const messageId = event.target.closest("li").getAttribute("data-message-id");
      handleMessageAction(action, messageId);
    }  
}

  //Handle edit/delete actions
function handleMessageAction(action, messageId) {
  if (action === "edit") {
    editMessage(messageId);
  } else if (action === "delete") {
    deleteMessage(messageId);
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

  if (isCurrentUser) {
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
  } else {
    card.innerHTML = `
      <h5 class="card-header">${userName}</h5>
      <div class="card-body">
        <p class="card-text">${message}</p>
      </div>
      <div class="row card-footer">
      <p class="col-9 text-body-secondary d-flex justify-content-md-start">${publishedAt}</p>
      <a href="#" class="col-3 d-flex justify-content-md-end  btn btn-sm btn-primary">Reply</a>
      </div>
    `;
  }

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
    const channelViewData = getCurrentChannelViewData();
    channelViewData.messages.push(newMessage);
    setCurrentChannelViewData(channelViewData);
    updateMessageList(channelViewData.messages);
    quill.setText("");
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

async function updateMessage(messageId, updatedContent) {
  const token = sessionStorage.getItem("jwtToken");
  const currentUser = getCurrentUser();

  if (!token || !messageId || !updatedContent || !currentUser) {
    console.log("Missing required data to update message");
    return;
  }

  const messagePayload = {
    message: updatedContent,
    user: {
      id: currentUser.id,
      userName: currentUser.name,
    },
  };

  try {
    const response = await fetch(`/api/channel/message/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messagePayload),
    });

    if (!response.ok) {
      throw new Error("Failed to update message");
    }

    const updatedMessage = await response.json();
    const channelViewData = getCurrentChannelViewData();
    const messageIndex = channelViewData.messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex !== -1) {
      channelViewData.messages[messageIndex] = updatedMessage;
      setCurrentChannelViewData(channelViewData);
      updateMessageList(channelViewData.messages);
      quill.setText("");
      const messageBtn = document.querySelector("#messageBtn");
      messageBtn.innerText = "Send";
      messageBtn.removeAttribute("data-message-id");
    }
  } catch (error) {
    console.error("Error updating message:", error);
  }
}

async function deleteMessage(messageId) {
  const token = sessionStorage.getItem("jwtToken");

  if (!token || !messageId) {
    console.log("Missing required data to delete message");
    return;
  }

  try {
    const response = await fetch(`/api/channel/message/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    const channelViewData = getCurrentChannelViewData();
    const updatedMessages = channelViewData.messages.filter((msg) => msg.id !== messageId);
    channelViewData.messages = updatedMessages;
    setCurrentChannelViewData(channelViewData);
    updateMessageList(channelViewData.messages);
  } catch (error) {
    console.error("Error deleting message:", error);
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
  
