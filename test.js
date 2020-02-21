const { users } = require("./data/users");

let id = "1023";

let currentUser = {};

let test = users.forEach(user => {
    if (user.id === id) {
        currentUser = user;
    }
})


console.log(currentUser.name);