// channel.js: Manages channel interactions and updates related to channels.
import {updateParticipantCount } from './uiUtil.js';

let currentChannelId;

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

export function initializeChannelPage() {
    // Get channel ID from URL
    //stores the resulting array from the split method into the variable pathnameParts
    const pathnameParts = window.location.pathname.split('/');
    //stores the last element of the array into the variable channelId 
    const channelId = pathnameParts[pathnameParts.length - 1];
    //stores the channel ID into the variable currentChannelId making it available to the rest of the code
    currentChannelId = channelId;
    console.log('Channel selected:', currentChannelId);
    // Fetch and populate channel data
    fetchChannelViewData(currentChannelId);
    attachChannelEventListeners();
    //Ensure periodic message updates
    refreshMessages();
}

async function fetchChannelViewData(channelId) {
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
            populateChannelDetails(channelViewData.channel);
            updateMessageList(channelViewData.messages);
            updateParticipantCountDisplay(channelViewData.participantCount);
        } else {
            throw new Error('Failed to fetch channel view data');
        }
    } catch (error) {
        console.error('Error fetching channel view data:', error);
    }
}

export function populateChannelDetails(channelId, idPrefix) {
    fetchChannelViewData(channelId).then((channelData) => {
        const channelNameElement = document.querySelector(`#${idPrefix}channelName_${channelId}`);
        const channelDescriptionElement = document.querySelector(`#${idPrefix}channelDescription_${channelId}`);
        
        if (channelNameElement) {
            channelNameElement.textContent = channelData.name;
        } else {
            console.error(`Element with ID ${idPrefix}channelName_${channelId} not found`);
        }

        if (channelDescriptionElement) {
            channelDescriptionElement.textContent = channelData.description;
        } else {
            console.error(`Element with ID ${idPrefix}channelDescription_${channelId} not found`);
        }

        console.log('Channel data:', channelData);
    }).catch(error => {
        console.error('Error fetching channel data:', error);
    });
}

function updateMessageList(messages) {
    const messageList = document.querySelector('#messageList');
    messageList.innerHTML = '';
    if (messages.length === 0) {
        messageList.innerHTML = '<li>No one has posted to this channel yet. Be the first!</li>';
    } else {
        messages.forEach(chat => {
            console.log('Chat object:', chat);
            const li = document.createElement('li');
            const userName = chat.userName ? chat.userName : "Unknown User";
            const message = chat.message ? chat.message : "No message content";
            const publishedAt = chat.publishedAt ? formatDate(new Date(chat.publishedAt)) : "Unknown date";
            li.innerHTML = `<span>${userName}</span>: 
                            <span>${message}</span>
                            <span>${publishedAt}</span>`;
            messageList.appendChild(li);
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

function refreshMessages() {
    setInterval(() => {
        if (currentChannelId) {
            updateParticipantCount(currentChannelId);
            fetchMessages();
        }
        // Adjust the interval as needed (e.g., 40 seconds)
    }, 400000);
}


