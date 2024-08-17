// messageActions.js: Handles sending, updating, and deleting (CRUD) messages.

import { getCurrentChannelId, getCurrentUser, getCurrentChannelViewData, 
        setCurrentChannelViewData, setCurrentMessageId,
        resetCurrentMessageId, getCurrentToken} from "./shared.js";
import { updateMessageList, updateMessageCard } from "./messageDisplay.js";
import {getQuill, resetQuillContent } from "./quill.js";

function createMessagePayload(messageContent, currentUser) {
  return{
    message: messageContent,
    user: {
      id: currentUser.id,
      userName: currentUser.userName,
    },
  };
}
export async function sendMessage(messageContent) {
  getCurrentToken(token);
  const channelId = getCurrentChannelId();
  const currentUser = getCurrentUser();

  if (!token || !channelId || !messageContent || !currentUser) {
    console.log("Missing required data to send message");
    return;
  }

  const messagePayload = createMessagePayload(messageContent, currentUser);

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
    setCurrentMessageId(messageId);
    updateMessageList(channelViewData.messages);
    resetQuillContent();
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

export function editMessage(messageId) {
  const currentUser = getCurrentUser();
  const isCurrentUser = true;
  const card = document.querySelector(`[data-message-id="${messageId}"]`);

  if (isCurrentUser) {
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
            updateMessage(id, updatedContent);

        });
      });
    }else alert("You are not authorized to edit this message");
  }
   
export async function updateMessage(messageId, updatedContent) {
    getCurrentToken(token);
    const currentUser = getCurrentUser();
  
    if (!token || !messageId || !updatedContent || !currentUser) {
      console.log("Missing required data to update message");
      return;
    }
  
    const messagePayload = createMessagePayload(updatedContent, currentUser);
  
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
      updateMessageCard(messageId, updatedMessage.message);
      updateMessageList(getCurrentChannelViewData().messages);
  
      // Clear the editing message ID from sessionStorage
      resetCurrentMessageId();
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }

export async function deleteMessage(messageId) {
  getCurrentToken(token);
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


