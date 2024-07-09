//global variable to store the current channel id thereby avoiding 
//code duplication and curcular dependency issues

let currentChannelId = null;

export function setCurrentChannelId(channelId) {
    currentChannelId = channelId;
}

export function getCurrentChannelId() {
    return currentChannelId;
}
