
const socket = io();

let chat = document.getElementById('chat');
let message = document.getElementById('message');
let send = document.getElementById('send');



function appendMessage(msg) {
    msg != '' && (socket.emit('chat message', {
        userId: 'userId', // userId, // Si tu utilises des rooms
        content: msg,
        // conversationId: currentConversationId, // Si tu utilises des rooms
    }))
}


send.addEventListener('click', function(e) {
    appendMessage(message.value);
    message.value = '';
})


document.addEventListener('keypress', function(e) {
    e.key === 'Enter' && (
        appendMessage(message.value),
        message.value = ''
    )
})


socket.on('chat message', (msg) => {
    console.log('User connected: ');
    
    let div = document.createElement('li');
    div.innerText = msg.content;

    let params = window.location.search
    params.includes('id=') && (params = params.split('?id=')[1])
    console.log(params);

    params == 2 && div.classList.add('right');

    chat.appendChild(div);
})


