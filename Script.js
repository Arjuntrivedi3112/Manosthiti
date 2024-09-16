document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const userInput = document.getElementById('user-input').value;
    if (!userInput) return; // Don't send empty messages

    // Display the user's message in the chatbox
    const chatBox = document.getElementById('chat-box');
    const userMessageElement = document.createElement('p');
    userMessageElement.textContent = `You: ${userInput}`;
    chatBox.appendChild(userMessageElement);

    // Send the message to the backend (Node.js server)
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const botMessageElement = document.createElement('p');
        botMessageElement.textContent = `Bot: ${data.reply}`;
        chatBox.appendChild(botMessageElement);
    } catch (error) {
        console.error('Error communicating with the server:', error);
    }

    // Clear the input field after sending the message
    document.getElementById('user-input').value = '';
});
