// channel.js: Manages channel interactions and updates related to channels.
import { getCurrentChannelId } from "./shared.js";
import { initializeMessages, attachChatMessageEventListeners } from "./chatMessage.js";

export function initializeChannelPage(channelViewData) {
  const currentChannelId = getCurrentChannelId();
  console.log("Channel selected:", currentChannelId);

  // Ensure elements are present before proceeding
  if (!document.querySelector("#messageList")) {
    console.error("Element with ID messageList not found");
    return;
  }

  // Initialize Quill editor if the element is present
  const editorElement = document.querySelector("#editor");
  if (editorElement) {
    initializeMessages(channelViewData.messages);
  } else {
    console.error("Element with ID editor not found");
    return;
  }

  // Use already fetched data to populate the channel details
  channelViewDetails(channelViewData.channel);
  updateParticipantCountDisplay(channelViewData.participantCount);
}

export function attachChannelEventListeners() {
  console.log("Attaching channel event listeners");

  const messageBtn = document.querySelector("#messageBtn");
  console.log("Elements found:", { messageBtn});

  if (messageBtn) {
    attachChatMessageEventListeners();
  }
}

export function startMessageRefresh(channelId) {
  setInterval(() => {
    if (channelId) {
      fetchChannelViewData(channelId);
    }
  }, 40000); // Fetch messages every 40 seconds
}

export async function fetchChannelViewData(channelId) {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const response = await fetch(`/api/channel/${channelId}/view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const channelViewData = await response.json();
      sessionStorage.setItem(
        "currentChannelViewData",
        JSON.stringify(channelViewData)
      ); // Save fetched data to sessionStorage
      initializeChannelPage(channelViewData); // Initialize the channel page with fetched data
      attachChannelEventListeners();
    } else {
      throw new Error("Failed to fetch channel view data");
    }
  } catch (error) {
    console.error("Error fetching channel view data:", error);
  }
}
//dynamically populates channel details on channelSelect card
export function channelSelectDetails(channelData, idPrefix = "") {
  const channelNameElement = document.querySelector(
    `#${idPrefix}channelName_${channelData.id}`
  );
  const channelDescriptionElement = document.querySelector(
    `#${idPrefix}channelDescription_${channelData.id}`
  );

  if (channelNameElement) {
    channelNameElement.textContent = channelData.name;
  } else {
    console.error(
      `Element with ID ${idPrefix}channelName_${channelData.id} not found`
    );
  }

  if (channelDescriptionElement) {
    channelDescriptionElement.textContent = channelData.description;
  } else {
    console.error(
      `Element with ID ${idPrefix}channelDescription_${channelData.id} not found`
    );
  }

  console.log("Channel data:", channelData);
}

//dynamically populates channel details on channel page
export function channelViewDetails(channelData) {
  const channelNameElement = document.querySelector("#channelName");
  const channelDescriptionElement = document.querySelector(
    "#channelDescription"
  );

  if (channelNameElement) {
    channelNameElement.textContent = channelData.name;
  } else {
    console.error("Element with ID channelName not found");
  }

  if (channelDescriptionElement) {
    channelDescriptionElement.textContent = channelData.description;
  } else {
    console.error("Element with ID channelDescription not found");
  }

  console.log("Channel data for channel page:", channelData);
}

function updateParticipantCountDisplay(participantCount) {
  document.querySelector("#participantCount").textContent = participantCount;
}
