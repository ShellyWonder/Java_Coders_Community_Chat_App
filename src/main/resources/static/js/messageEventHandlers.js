// messageEventHandlers.js: Manages message button and message list event listeners.

import { getQuillContent } from "./quill.js";
import { sendMessage, updateMessage, deleteMessage, editMessage } from "./messageActions.js";
import { setCurrentMessageId, } from "./shared.js";

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
async function handleMessageButtonClick(event) {
  const messageBtn = document.querySelector("#messageBtn");
    messageBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const messageContent = getQuillContent(); 
    const messageId = messageBtn.getAttribute("data-message-id");
    setCurrentMessageId(messageId);

  if (messageBtn.innerText === "Update") {
    await updateMessage(messageId, messageContent);
  } else {
    if (messageContent) {
      await sendMessage(messageId, messageContent);
    } else {
      console.error("Message content is empty");
    }
  }
});
}

// Handle edit/delete actions on nav dropdown
function handleMessageAction(action, messageId) {
  if (action === "edit") {
    editMessage(messageId);
  } else if (action === "delete") {
    deleteMessage(messageId);
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


