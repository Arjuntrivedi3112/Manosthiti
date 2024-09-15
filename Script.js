const backendUrl = 'https://your-backend-name.vercel.app/chat'; // Replace with your Vercel URL

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Display user's message
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;

    // Send message to backend
    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput }),
        });
        const data = await response.json();
        const botReply = data.reply;

        // Display bot's reply
        chatBox.innerHTML += `<div class="bot-message">${botReply}</div>`;
        document.getElementById('user-input').value = '';
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += `<div class="error-message">Something went wrong. Please try again.</div>`;
    }
}
