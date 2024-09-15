document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const output = document.getElementById('chat-output');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userMessage = input.value;
        output.innerHTML += `<div>User: ${userMessage}</div>`;
        input.value = '';

        try {
            const response = await fetch('https://manosthiti.vercel.app/gemini', { // Replace with your actual backend URL
    method: 'POST',
    body: JSON.stringify({ txt: "userMessage" })
});
            });

            const data = await response.json();
            const botReply = data.reply;

            output.innerHTML += `<div>Bot: ${botReply}</div>`;
        } catch (error) {
            console.error('Error:', error);
            output.innerHTML += `<div>Bot: Sorry, something went wrong.</div>`;
        }
    });
});
