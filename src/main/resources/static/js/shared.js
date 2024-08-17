// storing global variables  for use across the application;
//Avoids code duplication and circular dependency issues
let currentToken = null;
let currentChannelId = null;
let currentUser = null;
let currentChannelViewData =null;
let currentMessageId = null;

export function setCurrentToken(token) {
    currentToken = token;
    sessionStorage.setItem('jwtToken', token);
}

export function getCurrentToken() {
    return currentToken || sessionStorage.getItem('jwtToken');
}

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
   const userJson = sessionStorage.getItem('currentUser');
   const user = userJson ? JSON.parse(userJson) : null;
   console.log('Getting Current User:', user); 
   return user;
}

export function setCurrentChannelViewData(viewData){
    currentChannelViewData = viewData;
    sessionStorage.setItem('currentChannelViewData', JSON.stringify(viewData));
}

export function getCurrentChannelViewData(){
    if (currentChannelViewData) return currentChannelViewData;
    
    const viewDataJson = sessionStorage.getItem('currentChannelViewData');
    return viewDataJson ? JSON.parse(viewDataJson) : null;
}
export function setCurrentMessageId(messageId) {
    currentMessageId = messageId;
    sessionStorage.setItem('currentMessageId', messageId);
}

export function getCurrentMessageId() {
    return currentMessageId || sessionStorage.getItem('currentMessageId');
}

export function resetCurrentMessageId() {
    sessionStorage.removeItem('currentMessageId');
}

