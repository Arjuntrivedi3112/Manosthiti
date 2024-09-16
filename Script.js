document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  appendMessage("You", userInput);
  const response = await getBotResponse(userInput);
  appendMessage("Bot", response);
  document.getElementById("user-input").value = ""; // clear input
});

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("p");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userInput) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  });
  const data = await response.json();
  return data.reply;
}
