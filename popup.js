document.getElementById('saveKey').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    if (apiKey) {
        chrome.storage.sync.set({apiKey}, () => {
            chrome.runtime.sendMessage({action: 'getJWT', apiKey});
            alert('API key checked!');
            window.close();
        });
    }
});
document.getElementById('deleteKey').addEventListener('click', () => {
    chrome.storage.sync.clear();
    alert("API key deleted!");
});
