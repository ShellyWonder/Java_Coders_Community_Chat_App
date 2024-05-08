
document.addEventListener('DOMContentLoaded', function () {

    //**Elements and events for sending messages**//
    const messageForm = document.querySelector('#messageForm');
    const messageBtn = document.querySelector('#messageBtn');
    const chatMessage = document.querySelector('#chatMessage');

    messageBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const messageContent = chatMessage.value.trim();
        if (messageContent) {
            sendMessage(messageContent);
        }
    });
        
    function sendMessage(messageContent) {
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
                chatMessage.value = ''; // Clear input after sending
            })
            .catch(error => console.error('Error sending message:', error));
    }

    //**Elements and events for channel interaction**//
     //retrieve messages from the server for the channel the user is currently interacting with
    function fetchMessages() {
        if (!currentChannelId) return; // Guard clause if no channel has been selected yet
        fetch(`/channel/${currentChannelId}/messages`)
        .then(response => response.json())
        .then(messages => {
            updateMessageList(messages);
        })
        .catch(error => {
            console.error('Error fetching messages:', error)
        });
    }

    function updateMessageList(messages) {
        const messageList = document.querySelector('#messageList');
        messageList.innerHTML = ''; // Clear the message list
        if (messages.length === 0) {
            // Display a message if there are no chat messages
            messageList.innerHTML = '<li>No one has posted to this channel yet. Be the first!</li>';
        } else {
            //Chat is the class containing the user, message, and publishedAt
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

    let currentChannelId; //variable to store current channel ID
    // channels are list items in template
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', function() {
            // Update global variable when a channel is clicked
            currentChannelId = this.getAttribute('data-channel-id');
            updateParticipantCount(); 
            fetchMessages(); // Fetch messages for the selected channel
        });
    });
    
    // Update the participant count for the current channel
        function updateParticipantCount() {
            if (!currentChannelId) return; // Guard clause if no channel has been selected yet
            
            fetch(`/channel/${currentChannelId}/participants/count`) 
            .then(response => response.json())
            .then(data => {
                document.querySelector(`#participantCount_${currentChannelId}`).textContent = data.count;
            })
            .catch(error => console.error('Error:', error));
        }

        setInterval(() => {
            if (currentChannelId){
                updateParticipantCount();
                fetchMessages();
            }
            
        }, 5000); // Update each function every 5 seconds
        
});