const users = [];


function join(id, username, room) {

  const user = { id, username, room };
  
  users.push(user);

  return user;
}

function getall() {
  return users;
}


function getUser(id) {
  console.log({ id });
  let x = users.filter(element => element.id === id);
  console.log({ x });
  return users.filter(e => e.id === id);
}
console.log('main users', { users });

function userLeave(id) {

  const index = users.findIndex(e => e.id === id);
  
  if (index !== -1) {

    return users.splice(index, 1)
  }
}


function getRoom(room) {
  return users.filter(e => e.room === room);
}

module.exports = {
  join,
  getUser,
  userLeave,
  getRoom,
  getall
}