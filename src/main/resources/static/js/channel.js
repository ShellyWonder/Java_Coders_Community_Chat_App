// Global variable to store current channel ID
let currentChannelId;

document.addEventListener('DOMContentLoaded', function () {
    // channels are list items in template
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', function() {
            // Update global variable when a channel is clicked
            currentChannelId = this.getAttribute('data-channel-id');
            updateParticipantCount(); // You might call update function right away
        });
    });

    function updateParticipantCount() {
        if (!currentChannelId) return; // Guard clause if no channel has been selected yet

        fetch(`/channel/{channelId}/participants/count/${currentChannelId}`) // Use the global variable here
            .then(response => response.json())
            .then(data => {
                document.querySelector(`#participantCount${currentChannelId}`).textContent = data.count;
            })
            .catch(error => console.error('Error:', error));
    }

    // Optionally set interval to update participant count every 5 seconds
    setInterval(updateParticipantCount, 5000);
});
