// messageEventHandlers.js: Manages message button and message list event listeners.

import { getQuillContent } from "./quill.js";
import { sendMessage, updateMessage, deleteMessage} from "./messageActions.js";
import { setCurrentMessageId, } from "./shared.js";
import { editMessage } from "./messageDisplay.js";

export function attachChatMessageEventListeners() {
  const messageBtn = document.querySelector("#messageBtn");
  const messageList = document.querySelector("#messageList");

  attachMessageButtonListener(messageBtn);
  attachMessageListListener(messageList);
}

// Function to attach listener to the message button
function attachMessageButtonListener(messageBtn) {
  if (messageBtn.innerText === "Send") messageBtn.addEventListener("click", addSendMessageListener);
  if (messageBtn.innerText === "Update") messageBtn.addEventListener("click", addEditMessageListener);
}

// Event handler for the message button click
async function addSendMessageListener(event) {
  const messageBtn = document.querySelector("#messageBtn");
    messageBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    messageBtn.innerText === "Send";
    const messageContent = getQuillContent(); 
    const messageId = messageBtn.getAttribute("data-message-id");
    setCurrentMessageId(messageId);

    if (messageContent) {
      await sendMessage(messageId, messageContent);
    } else {
      console.error("Message content is empty");
    }

  });

}
//NEW CODE
export function addEditMessageListener(card, messageId) {
  card.querySelector('[data-action="edit"]').addEventListener('click', (event) => {
      event.preventDefault();
      // Initialize Quill editor
      const quill = getQuill("#editor");

      // Enable editing in the message card
      const messageTextElement = card.querySelector('.card-text');
      messageTextElement.contentEditable = true;
      messageTextElement.focus();

      // Update the button text and attributes
      const messageBtn = document.querySelector("#messageBtn");
      messageBtn.innerText = "Update";
      messageBtn.setAttribute("data-message-id", messageId);

      // Send messageId to shared.js to be stored in sessionStorage
      setCurrentMessageId(messageId);

      // Add event listener to the button for updating the message
      messageBtn.addEventListener('click', async () => {
          const updatedContent = quill.root.innerHTML;
          await updateMessage(messageId, updatedContent);
      });
  });
}
//END NEW CODE
// Handle edit/delete actions on nav dropdown
async function handleMessageAction(action, messageId) {
  if (action === "edit") {
    await editMessage(messageId);
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


