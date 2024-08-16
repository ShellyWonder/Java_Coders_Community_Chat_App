// messageActions.js: Handles sending, updating, and deleting (CRUD) messages.

import { getCurrentChannelId, getCurrentUser, getCurrentChannelViewData, 
        setCurrentChannelViewData, setCurrentMessageId,
        resetCurrentMessageId } from "./shared.js";
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
  const token = sessionStorage.getItem("jwtToken");
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
  const messageCard = document.querySelector(`.dropdown[data-message-id="${messageId}"]`);
  if (!messageCard) {
    console.error("Message card not found");
    return;
  }

  const messageTextElement = messageCard.closest(".card").querySelector(".card-text");
  const messageText = messageTextElement.innerHTML;

  // Send messageId to shared.js to be stored in sessionStorage
  setCurrentMessageId(messageId);

  const quill = getQuill();
  if (quill) {
    quill.setText(messageText);
  }

  const messageBtn = document.querySelector("#messageBtn");
  messageBtn.innerText = "Update";
  messageBtn.setAttribute("data-message-id", messageId);

  // Enable editing in the message card
  messageTextElement.contentEditable = true;
  messageTextElement.focus();
}
export async function updateMessage(messageId, updatedContent) {
    const token = sessionStorage.getItem("jwtToken");
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
      resetQuillContent();
  
      // Update the button text and attributes
      const messageBtn = document.querySelector("#messageBtn");
      messageBtn.innerText = "Send";
      messageBtn.removeAttribute("data-message-id");
  
      // Clear the editing message ID from sessionStorage
      resetCurrentMessageId();
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }

export async function deleteMessage(messageId) {
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


