// messageEventHandlers.js: Manages message button and message list event listeners.
import { getQuillContent } from "./quill.js";
import { sendMessage, updateMessage, deleteMessage} from "./messageActions.js";
import { setCurrentMessageId} from "./shared.js";
import { editMessage, restoreOriginalFooter } from "./messageDisplay.js";

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
  
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      if (action === "send") {
        await addSendMessageListener(event, messageId);
      } else if (action === "update") {
        await addUpdateMessageListener(messageId);
      }
    });
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
  export async function addUpdateMessageListener(messageId, card) {
    const messageTextElement = card.querySelector('.card-text');
    const updatedContent = messageTextElement.innerHTML;
    try {
      await updateMessage(messageId, updatedContent);
      console.log('Message updated successfully');
      messageTextElement.contentEditable = false;
      restoreOriginalFooter(card.querySelector('.card-footer'), messageId);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }
  
  // Function to handle edit message action on the message card dropdown
  export function addEditMessageListener(card, messageId) {
    if (!card) {
      console.log('Card element is null or undefined');
      return;
    }
    const messageTextElement = card.querySelector('.card-text');
    const footerElement = card.querySelector('.card-footer');
    const originalContent = messageTextElement.innerHTML;

    // Add event listener to the card element
    card.addEventListener('click', (event) => {
      const editButton = event.target.closest('[data-action="edit"]');
      if (editButton) {
        event.preventDefault();
        messageTextElement.contentEditable = true;
        messageTextElement.focus();
  
        // Place the cursor at the end of the content
        const range = document.createRange();
        range.selectNodeContents(messageTextElement);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

      footerElement.innerHTML = `
        <button class="btn btn-primary update-btn" data-message-id="${messageId}">Update</button>
        <button class="btn btn-secondary cancel-btn">Cancel</button>
      `;
  
      const updateBtn = footerElement.querySelector('.update-btn');
      const cancelBtn = footerElement.querySelector('.cancel-btn');

      updateBtn.addEventListener('click', () => addUpdateMessageListener(messageId, card));
      cancelBtn.addEventListener('click', () => {
        messageTextElement.innerHTML = originalContent;
        messageTextElement.contentEditable = false;
        restoreOriginalFooter(footerElement, messageId);
      });
    }
  });
}

  function setupUpdateButton(messageId) {
    const updateBtn = document.querySelector("#updateBtn");
    const sendBtn = document.querySelector("#sendBtn");
    if (updateBtn && sendBtn) {
      updateBtn.style.display = 'inline-block';
      sendBtn.style.display = 'none';
      updateBtn.setAttribute('data-message-id', messageId);
    }
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
  const dropdownMenu = card.querySelector('.dropdown-menu'); 
  if (dropdownMenu) {
    console.log('Attaching event listener to dropdown menu', dropdownMenu);
    dropdownMenu.addEventListener('click', handleMessageListClick);
  } else {
    console.error('Dropdown menu not found in card', card);
  }
}

  // Handle edit/delete actions on nav dropdown
  export async function handleMessageAction(action, messageId) {
    setCurrentMessageId(messageId);
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
  //card message dropdown 
export async function handleMessageListClick(event) {
  console.log('Click event triggered', event.target);
  const actionItem = event.target.closest('[data-action]');
  console.log('Action item found:', actionItem);

  if (actionItem) {
    event.preventDefault();
    const action = actionItem.getAttribute('data-action');
    const messageId = actionItem.closest('.card').getAttribute('data-message-id');
    console.log('Action:', action, 'Message ID:', messageId);
    await handleMessageAction(action, messageId);
  }
}
