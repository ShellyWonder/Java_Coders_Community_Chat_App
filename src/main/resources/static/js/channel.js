// channel.js: Manages channel interactions and updates related to channels.
import {getCurrentChannelId} from './shared.js';

export function initializeChannelPage(channelViewData) {
    const currentChannelId = getCurrentChannelId();
    console.log('Channel selected:', currentChannelId);

    // Ensure elements are present before proceeding
    if (!document.querySelector('#messageList')) {
        console.error('Element with ID messageList not found');
        return;
    }
    
    // Use already fetched data to populate the channel details
    populateChannelDetails(channelViewData.channel);
    updateMessageList(channelViewData.messages);
    updateParticipantCountDisplay(channelViewData.participantCount);
}

export function attachChannelEventListeners() {
    console.log('Attaching channel event listeners');

    const messageBtn = document.querySelector('#messageBtn');
    const chatMessage = document.querySelector('#chatMessage');
    const messageList = document.querySelector('#messageList');

    
    console.log("Elements found:", { messageBtn, chatMessage, messageList });

    if (messageBtn) {
        messageBtn.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Message button clicked');
            const messageContent = chatMessage.value.trim();
            if (messageContent) {
                sendMessage(messageContent, chatMessage);
            }
        });
    }
}
export function startMessageRefresh(channelId) {
    setInterval(() => {
        if (channelId) {
            fetchChannelViewData(channelId);
        }
    }, 400000); // Fetch messages every 40 seconds
}

export async function fetchChannelViewData(channelId) {
    const token = sessionStorage.getItem("jwtToken");
    try {
        const response = await fetch(`/api/channel/${channelId}/view`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const channelViewData = await response.json();
            sessionStorage.setItem('currentChannelViewData', JSON.stringify(channelViewData)); // Save fetched data to sessionStorage
            initializeChannelPage(channelViewData); // Initialize the channel page with fetched data
            attachChannelEventListeners();
        } else {
            throw new Error('Failed to fetch channel view data');
        }
    } catch (error) {
        console.error('Error fetching channel view data:', error);
    }
}

export function populateChannelDetails(channelData, idPrefix = "") {
    const channelNameElement = document.querySelector(`#${idPrefix}channelName_${channelData.id}`);
    const channelDescriptionElement = document.querySelector(`#${idPrefix}channelDescription_${channelData.id}`);

    if (channelNameElement) {
        channelNameElement.textContent = channelData.name;
    } else {
        console.error(`Element with ID ${idPrefix}channelName_${channelData.id} not found`);
    }

    if (channelDescriptionElement) {
        channelDescriptionElement.textContent = channelData.description;
    } else {
        console.error(`Element with ID ${idPrefix}channelDescription_${channelData.id} not found`);
    }

    console.log('Channel data:', channelData);
}

export function populateChatDetails(chat) {
    const messageList = document.querySelector('#messageList');
    if (!messageList) {
        console.error('Element with ID messageList not found');
        return;
    }
    const li = document.createElement('li');
    const userName = chat.userName ? chat.userName : "Unknown User";
    const message = chat.message ? chat.message : "No message content";
    const publishedAt = chat.publishedAt ? formatDate(new Date(chat.publishedAt)) : "Unknown date";
    li.innerHTML = `<span>${userName}</span>: 
                    <span>${message}</span>
                    <span>${publishedAt}</span>`;
    messageList.appendChild(li);
}

export function updateMessageList(messages) {
    const messageList = document.querySelector('#messageList');
    if (!messageList) {
        console.error('Element with ID messageList not found');
        return;
    }

    messageList.innerHTML = '';
    if (messages.length === 0) {
        messageList.innerHTML = '<li>No one has posted to this channel yet. Be the first!</li>';
    } else {
        messages.forEach(chat => {
            console.log('Chat object:', chat);
            populateChatDetails(chat);
        });
    }
}

function updateParticipantCountDisplay(participantCount) {
    document.querySelector('#participantCount').textContent = participantCount;
}

function formatDate(date) {
    return date.toLocaleString(); // Formats the date in a human-readable way
}

function sendMessage(messageContent, chatMessageElement) {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
        console.error("JWT token is missing from sessionStorage");
        return;
    }
    console.log("Sending message with token:", token);
    fetch('/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: messageContent })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
        chatMessageElement.value = '';
    })
    .catch(error => console.error('Error sending message:', error));
}

export async function fetchMessages() {
    const token = sessionStorage.getItem("jwtToken");
    const currentChannelId = getCurrentChannelId();
    console.log("Fetching messages with token:", token);
    try {
        const response = await fetch(`/api/channel/${currentChannelId}/messages`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Fetch response status:", response.status);
        const messages = await response.json();
        updateMessageList(messages);
        console.log('Messages fetched:', messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}
