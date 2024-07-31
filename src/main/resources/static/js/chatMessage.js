//chatMessage.js: Manages message interactions and updates.
import { getCurrentChannelId} from "./shared.js";
import{ initializeQuill } from "./quill.js";
import { updateMessageList} from "./messageDisplay.js";

// Ensure this matches actual editor selector
const editorElementSelector = "#editor";

export function initializeMessages(messages) {
  initializeQuill(editorElementSelector)
  updateMessageList(messages);
}
   
export async function fetchMessages() {
  const token = sessionStorage.getItem("jwtToken");
  const currentChannelId = getCurrentChannelId();
  try {
    const response = await fetch(`/api/channel/${currentChannelId}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const messages = await response.json();
    updateMessageList(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}




