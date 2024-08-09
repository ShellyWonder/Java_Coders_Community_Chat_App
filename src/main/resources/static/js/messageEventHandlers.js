// messageEventHandlers.js: Manages message button and message list event listeners.

import { getQuillContent } from "./quill.js";
import { sendMessage, updateMessage, deleteMessage, editMessage } from "./messageActions.js";

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
  const messageContent = getQuillContent();
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
export function handleMessageListClick(event) {
  if (event.target.classList.contains("dropdown-item")) {
    event.preventDefault();
    const action = event.target.getAttribute('data-action');
    const messageId = event.target.closest(".dropdown").getAttribute("data-message-id");
    handleMessageAction(action, messageId);
  }
}

// Handle edit/delete actions
function handleMessageAction(action, messageId) {
  if (action === "edit") {
    editMessage(messageId);
  } else if (action === "delete") {
    deleteMessage(messageId);
  }
}
