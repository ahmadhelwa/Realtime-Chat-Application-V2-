const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.getElementById('chat-form');
const roomName = document.getElementById('room-name');
const usersNames = document.getElementById('users')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
console.log(username, room);
const socket = io();

socket.on('user-rooms-info', ({ room, users }) => {

  outputRoom(room);
  outputUsers(users);
})

socket.emit('joinRoom', { username, room });

socket.on('message', message => {

  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});


chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.message.value;

  socket.emit('chatMessage', message);
 
  e.target.message.value = '' 

});

function outputMessage(message) {

  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">${message.username}<span>  ${message.time}</span></p>
    <p class="text">
        ${message.text}.
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function outputRoom(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  console.log({ users });
  usersNames.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}