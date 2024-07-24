//global variable storing the current channel id thereby avoiding 
//code duplication and circular dependency issues

let currentChannelId = null;

export function setCurrentChannelId(channelId) {
    currentChannelId = channelId;
    sessionStorage.setItem('currentChannelId', channelId);
}

export function getCurrentChannelId() {
    return currentChannelId || sessionStorage.getItem('currentChannelId');
}
