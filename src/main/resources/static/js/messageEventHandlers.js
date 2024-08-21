// messageEventHandlers.js: Manages message button and message list event listeners.
import { getQuillContent } from "./quill.js";
import { sendMessage, updateMessage, deleteMessage} from "./messageActions.js";
import { setCurrentMessageId} from "./shared.js";
import { editMessage } from "./messageDisplay.js";

export function attachChatMessageEventListeners() {
  const sendBtn = document.querySelector("[data-action='send']");
  const updateBtn = document.querySelector("[data-action='update']");
  const card = document.querySelector(".message-card");
  const messageList = document.querySelector("#messageList");

  if (sendBtn) {
    attachMessageButtonListener(sendBtn, card);
  }
  if (updateBtn) {
    attachMessageButtonListener(updateBtn, card);
  }
  attachMessageListListener(messageList);
}
  
  // Function to attach listener to the message button
  function attachMessageButtonListener(button, card) {
    const messageId = fetchMessageId(button);
    const action = button.getAttribute('data-action');
  
    if (action === "send") {
      button.addEventListener("click", (event) => addSendMessageListener(event, messageId));
    } else if (action === "update") {
      button.addEventListener("click", () => addEditMessageListener(card, messageId));
    } else {
      console.log("No valid message button action found");
    }
  }
  
  // Event handler for the message button click
  export async function addSendMessageListener(event, messageId) {
    event.preventDefault();
    const messageContent = getQuillContent();
    if (messageId && messageContent) {
      await sendMessage(messageId, messageContent);
      console.log(`Message ID ${messageId} fetched and set.`);
    } else {
      console.error("Message content is empty");
    }
  }
  
  // Add event listener to the button for updating the message
  function addUpdateMessageListener(updateBtn, messageId) {
    updateBtn.addEventListener('click', async () => {
      const updatedContent = quill.root.innerHTML;
      await updateMessage(messageId, updatedContent);
    });
  }
  
  // Function to handle edit message action
  export function addEditMessageListener(card, messageId) {
    card.querySelector('[data-action="edit"]').addEventListener('click', (event) => {
      event.preventDefault();
      // Initialize Quill editor
      const quill = getQuill("#editor");
  
      // Enable editing in the message card
      const messageTextElement = card.querySelector('.card-text');
      messageTextElement.contentEditable = true;
      messageTextElement.focus();
  
      const updateBtn = document.querySelector("#updateBtn");
      if (updateBtn) {
        addUpdateMessageListener(updateBtn, messageId);
      } else {
        console.error("Update button not found");
      }
    });
  }
  
  function fetchMessageId(button) {
    const messageId = button.getAttribute("data-message-id");
    if (messageId) {
      setCurrentMessageId(messageId);
    } else {
      console.log("No message ID found");
    }
    return messageId;
  }
  
  export function attachDropdownListener(card) {
    /// Attach event listener for the dropdown menu
    const dropdownMenu = card.querySelector('.dropdown-menu'); 
    if (dropdownMenu) {
      dropdownMenu.addEventListener('click', handleMessageListClick);
    }
  }
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
  export async function handleMessageListClick(event) {
    if (event.target.classList.contains("dropdown-item")) {
      event.preventDefault();
      const action = event.target.getAttribute('data-action');
      const messageId = event.target.getAttribute("data-message-id");
      handleMessageAction(action, messageId);
    }
  }