// channels.js: Manages channel interactions and updates related to channels.

let currentChannelId;

export function attachChannelEventListeners() {
    const messageBtn = document.querySelector('#messageBtn');
    const chatMessage = document.querySelector('#chatMessage');
    const messageList = document.querySelector('#messageList'); // Select messageList here

    if (messageBtn) {
        messageBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const messageContent = chatMessage.value.trim();
            if (messageContent) {
                sendMessage(messageContent, chatMessage);
            }
        });
    }

    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', function () {
            currentChannelId = this.getAttribute('data-channel-id');
            updateParticipantCount();
            fetchMessages(messageList); // Pass messageList to fetchMessages
        });
    });

    setInterval(() => {
        if (currentChannelId) {
            updateParticipantCount();
            fetchMessages(messageList); // Pass messageList to fetchMessages
        }
    }, 5000);
}

function sendMessage(messageContent, chatMessageElement) {
    fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageContent })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
        chatMessageElement.value = ''; // Clear input after sending
    })
    .catch(error => console.error('Error sending message:', error));
}

function fetchMessages(messageList) {
    if (!currentChannelId) return;
    fetch(`/api/channel/${currentChannelId}/messages`)
    .then(response => response.json())
    .then(messages => {
        updateMessageList(messages, messageList); // Pass messageList to updateMessageList
    })
    .catch(error => {
        console.error('Error fetching messages:', error)
    });
}

function updateMessageList(messages, messageList) {
    messageList.innerHTML = '';
    if (messages.length === 0) {
        messageList.innerHTML = '<li>No one has posted to this channel yet. Be the first!</li>';
    } else {
        messages.forEach(chat => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${chat.user.userName}</span>: 
                            <span>${chat.message}</span>
                            <span>${formatDate(new Date(chat.publishedAt))}</span>`;
            messageList.appendChild(li);
        });
    }
}

function formatDate(date) {
    return date.toLocaleTimeString() + ', ' + date.toLocaleDateString();
}

function updateParticipantCount() {
    if (!currentChannelId) return;
    fetch(`/channel/${currentChannelId}/participants/count`)
    .then(response => response.json())
    .then(data => {
        document.querySelector(`#participantCount_${currentChannelId}`).textContent = data.count;
    })
    .catch(error => console.error('Error:', error));
}
