//global variables storing the current channel id  and current user for use across the application
//and avoids code duplication and circular dependency issues

let currentChannelId = null;
let currentUser = null;

export function setCurrentChannelId(channelId) {
    currentChannelId = channelId;
    sessionStorage.setItem('currentChannelId', channelId);
}

export function getCurrentChannelId() {
    return currentChannelId || sessionStorage.getItem('currentChannelId');
}

export function setCurrentUser(user){
    currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser(){
    if (currentUser){
        return currentUser;
        
    }
    const userJson = sessionStorage.getItem('currentUser');
    return userJson? JSON.parse(userJson) : null;
}