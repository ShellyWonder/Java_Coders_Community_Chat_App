// messageDisplay.js: Handles displaying and updating the message list.
import { getCurrentUser } from "./shared.js";
import { addEditMessageListener, handleMessageListClick} from "./messageEventHandlers.js";

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

function populateChatDetails(chat) {
  const userName = chat.userName ? chat.userName : "Unknown User";
  const message = chat.message ? chat.message : "No message content";
  const publishedAt = chat.publishedAt ? formatDate(new Date(chat.publishedAt)) : "Unknown date";
  const isCurrentUser = chat.isCurrentUser ? chat.isCurrentUser : false;

  const card = createMessageCard({
    userName,
    message,
    publishedAt,
    isCurrentUser,
    id: chat.id
  });

  if (messageList) {
    messageList.appendChild(card);
  } else {
    console.error("Element with ID messageList not found");
  }
}


function createMessageCard(chat) {
  const { userName, message, publishedAt, isCurrentUser, id } = chat;
  const card = document.createElement("div");
  card.classList.add("card", "chatCard", "mb-3");
 

  card.innerHTML = `
    <div class="card-header d-flex justify-content-between">
      <h5 class="mb-0">${userName}</h5>
      ${isCurrentUser ? `
        <div class="dropdown" data-message-id="${id}">
          <i class="bi bi-three-dots-vertical" data-bs-toggle="dropdown"></i>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" data-action="edit">Edit</a></li>
            <li><a class="dropdown-item" href="#" data-action="delete">Delete</a></li>
          </ul>
        </div>
      ` : ""}
    </div>
    <div class="card-body">
      <p class="card-text">${message}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <p class="text-body-secondary mb-0">${publishedAt}</p>
      <a href="#" class="btn btn-sm btn-primary">Reply</a>
    </div>
  `;

  /// Attach event listener for the dropdown menu
  const dropdownMenu = card.querySelector('.dropdown-menu'); 
  if (dropdownMenu) {
    dropdownMenu.addEventListener('click', handleMessageListClick);
  }

  return card;
}

export async function editMessage(messageId) {
  getCurrentUser();
  const isCurrentUser = true;
  const card = document.querySelector(`.card[data-message-id="${messageId}"]`);

     if (isCurrentUser) {
      addEditMessageListener(card, messageId);
    }else alert("You are not authorized to edit this message");

}

export function updateMessageCard(messageId, updatedContent) {
  // Select the message card using the data-message-id attribute
  const messageCard = document.querySelector(`.card[data-message-id="${messageId}"]`);
  if (!messageCard) {
    console.error("Message card Id not found");
    return;
  }

  // Select the message text element within the card
  const messageTextElement = messageCard.querySelector(".card-text");
  if (!messageTextElement) {
    console.error("Message text element not found");
    return;
  }

  // Update the message text
  messageTextElement.innerHTML = updatedContent;

  // Disable editing
  messageTextElement.contentEditable = false;

  // Indicate that the message was updated
  const successMessage = document.createElement('p');
  successMessage.className = 'text-success mb-0';
  successMessage.innerText = 'Updated';
  card.querySelector('.card-footer').appendChild(successMessage);
}
    

function formatDate(date) {
    return date.toLocaleString();
  }
