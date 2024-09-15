document.getElementById('send-btn').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value;
    document.getElementById('chat-box').innerHTML += `<p>You: ${userInput}</p>`;

    // Clear the input field
    document.getElementById('user-input').value = '';

    // TODO: Call the backend ChatGPT API and show the response
});
