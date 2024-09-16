document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const messages = document.querySelector('#messages'); 

    if (!messages) {
        console.error('Element with ID "messages" not found');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userMessage = input.value;
        input.value = '';

        if (!userMessage.trim()) {
            return;
        }

        messages.innerHTML += `<p>User: ${userMessage}</p>`;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiReply = data.reply;

            messages.innerHTML += `<p>AI: ${aiReply}</p>`;
        } catch (error) {
            console.error('Error communicating with the server:', error);
            messages.innerHTML += `<p>Error: Unable to get a response from the server.</p>`;
        }
    });
});
