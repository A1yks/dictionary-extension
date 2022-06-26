function logoutHandler() {
    chrome.storage.local.set({ isLoggedIn: false });
}

export default logoutHandler;
