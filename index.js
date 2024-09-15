async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const responseDiv = document.getElementById('response');
    const userMessage = messageInput.value;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        responseDiv.innerText = data.reply;
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerText = 'Error occurred. Please try again.';
    }
}
