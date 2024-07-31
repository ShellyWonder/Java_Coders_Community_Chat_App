// messageActions.js: Handles sending, updating, and deleting (CRUD) messages.

import { getCurrentChannelId, getCurrentUser, getCurrentChannelViewData, setCurrentChannelViewData } from "./shared.js";
import { updateMessageList } from "./messageDisplay.js";
import { resetQuillContent } from "./quill.js";

export async function sendMessage(messageContent) {
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
      userName: currentUser.userName,
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
    resetQuillContent();
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

export async function updateMessage(messageId, updatedContent) {
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
      userName: currentUser.userName,
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
      resetQuillContent();
      const messageBtn = document.querySelector("#messageBtn");
      messageBtn.innerText = "Send";
      messageBtn.removeAttribute("data-message-id");
    }
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

export function editMessage(messageId) {
  const messageCard = document.querySelector(`.dropdown[data-message-id="${messageId}"]`);
  const messageText = messageCard.closest(".card").querySelector(".card-text").innerHTML;

  quill.root.innerHTML = messageText;
  const messageBtn = document.querySelector("#messageBtn");
  messageBtn.innerText = "Update";
  messageBtn.setAttribute("data-message-id", messageId);
}
