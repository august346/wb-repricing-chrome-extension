chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getJWT') {
    const apiKey = request.apiKey;

    // Make a request to get the JWT token using the apiKey
    fetch('https://your-backend.com/get-jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKey })
    })
      .then(response => response.json())
      .then(data => {
        const jwtToken = data.token;
        chrome.storage.sync.set({ jwtToken }, () => {
          console.log('JWT token saved');
        });
      })
      .catch(error => {
        const jwtToken = "failed";
        chrome.storage.sync.set({ jwtToken }, () => {
          console.log('JWT token saved');
        });
        // console.error('Error fetching JWT:', error);
      });
  }
});
