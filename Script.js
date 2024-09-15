

const backendUrl = 'https://vercel.com/arjun-trivedis-projects/manosthiti/y6jntsojmxu4cMCbwoFXY6T1RSNk'; // Replace this with your actual Vercel URL

document.getElementById('send-btn').addEventListener('click', async function () {
    const userInput = document.getElementById('user-input').value;
    document.getElementById('chat-box').innerHTML += `<p>You: ${userInput}</p>`;

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Send the message to your backend (on Vercel)
    const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    const botReply = data.reply;

    // Show bot's reply in the chatbox
    document.getElementById('chat-box').innerHTML += `<p>Bot: ${botReply}</p>`;
});
