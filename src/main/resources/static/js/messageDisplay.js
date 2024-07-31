// messageDisplay.js: Handles displaying and updating the message list.

import { getCurrentUser } from "./shared.js";

const messageList = document.querySelector("#messageList");

export function updateMessageList(messages) {
  if (!messageList) {
    console.error("Element with ID messageList not found");
    return;
  }

  messageList.innerHTML = "";
  if (messages.length === 0) {
    messageList.innerHTML = "<li>No one has posted to this channel yet. Be the first!</li>";
  } else {
    prepareAndDisplayChats(messages);
  }
}

function prepareAndDisplayChats(messages) {
  const currentUser = getCurrentUser();
  const preparedMessages = messages.map(chat => ({
    ...chat,
    isCurrentUser: currentUser && chat.user && currentUser.id === chat.user.id
  }));
  displayChats({ messages: preparedMessages });
}

export function displayChats(channelViewData) {
  if (!messageList) {
    console.error("Element with ID messageList not found");
    return;
  }

  messageList.innerHTML = "";

  if (channelViewData.messages.length === 0) {
    messageList.innerHTML = "<li>No one has posted to this channel yet. Be the first!</li>";
  } else {
    channelViewData.messages.forEach(chat => {
      populateChatDetails(chat);
    });
  }
}

export function displayChats(channelViewData) {
    if (!messageList) {
      console.error("Element with ID messageList not found");
      return;
    }
  
    messageList.innerHTML = "";
  
    if (channelViewData.messages.length === 0) {
      messageList.innerHTML = "<li>No one has posted to this channel yet. Be the first!</li>";
    } else {
      channelViewData.messages.forEach(chat => {
        populateChatDetails(chat);
      });
    }
  }
  
    function prepareAndDisplayChats(messages) {
      const currentUser = getCurrentUser();
      const preparedMessages = messages.map(chat => ({
        ...chat,
        isCurrentUser: currentUser && chat.user && currentUser.id === chat.user.id
      }));
      displayChats({ messages: preparedMessages });
    }

    function formatDate(date) {
        return date.toLocaleString();
     }
