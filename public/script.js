const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage('user', userMessage);
    userInput.value = '';

    const thinkingMessage = appendMessage('bot', 'Thinking...');

    try {
        const response = await fetch('http://localhost:3000/api/chat', { // ✅ explicit API URL (recommended)
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', text: userMessage }],
            }),
        });

        if (!response.ok) throw new Error('Failed to get response from server.');

        const data = await response.json();

        thinkingMessage.textContent = data.result || 'Sorry, no response received.';
    } catch (error) {
        console.error('Error:', error);
        thinkingMessage.textContent = 'Failed to get response from server.';
    }
});

function appendMessage(role, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${role}-message`);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
}
