const socket = io('http://localhost:8000');

const form = document.querySelector('.chat-input'); 
const messageInput = document.getElementById('message-input'); 
const messageContainer = document.getElementById('chat-window');
const button=document.getElementById('send-button');

const append = (message, position) => {
    console.log(message);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', position);
    messageElement.innerHTML = `<p>${message}</p>`;
    
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; 
};


const username = prompt("Enter your name to join");
socket.emit('newuser-joined', username);


socket.on('user-joined', username => {
    console.log(username);
    append(`${username} joined the chat`, 'join');
});


button.addEventListener('click', (e) => {
    e.preventDefault(); 
    const message = messageInput.value;
    append(`${message}`, 'sent');
    socket.emit('send', message);
    messageInput.value = ''; 
});


socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'received');
});


socket.on('user-left', name => {
    append(`${name} left the chat`, 'received');
});
