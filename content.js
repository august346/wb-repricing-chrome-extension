function addPriceForm(checkInterval, jwtToken) {
    const priceElements = document.querySelectorAll('.price-block__wallet-price');
    const lastPriceElement = priceElements[priceElements.length - 1];

    if (lastPriceElement) {
        const form = document.createElement('div');
        form.id = "d7159132598"; // Unique ID for the form

        form.innerHTML = `
          <div class="input-group mb-3">
            <input type="number" id="newPrice" class="form-control" placeholder="Enter new price" aria-label="New Price" />
            <button class="btn btn-primary" id="submitPrice" type="button">Confirm</button>
          </div>
        `;

        lastPriceElement.appendChild(form);
        clearInterval(checkInterval);

        runWithCheckToken(
            (_, __) => console.log("jwtToken present. Retrying..."),
            (interval, _) => {
                clearInterval(interval);
                form.remove();
                run();
            },
        );

        document.getElementById('submitPrice').addEventListener('click', () => {
            const newPrice = document.getElementById('newPrice').value;

            if (newPrice) {
                fetch('https://your-backend.com/update-price', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({price: newPrice})
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert("Цена обновлена и будет обновляться автоматически!");
                            // alert('Price updated successfully!');
                        } else {
                            alert("Цена обновлена и будет обновляться автоматически!");
                            // alert('Error updating price.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error updating price.');
                    });
            } else {
                alert('Please enter a valid price.');
            }
        });
    } else {
        console.log('Element with specified CLASS not found.');
    }
}

function runWithCheckToken(onExist, onNot) {
    const checkInterval = setInterval(() => {
        chrome.storage.sync.get(['jwtToken'], (result) => {
            console.log("Checking for jwtToken...");
            if (result.jwtToken) {
                onExist(checkInterval, result.jwtToken);
            } else {
                onNot(checkInterval);
            }
        });
    }, 1000);
}

function run() {
    runWithCheckToken(
        (interval, jwtToken) => {
            addPriceForm(interval, jwtToken);
        },
        (_) => console.log("jwtToken not present. Retrying...")
    );
}

window.addEventListener('load', () => {
    run();
});
