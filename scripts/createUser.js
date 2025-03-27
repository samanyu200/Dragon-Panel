const fs = require('fs');
const readline = require('readline');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// Auto create 'data' folder if it doesn't exist
if (!fs.existsSync(path.dirname(usersFilePath))) {
    fs.mkdirSync(path.dirname(usersFilePath));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function createUser() {
    const username = await ask('Enter username: ');
    const email = await ask('Enter email: ');
    const password = await ask('Enter password: ');
    const role = await ask('Enter role (admin/user): ');

    const user = { username, email, password, role };

    let users = [];
    if (fs.existsSync(usersFilePath)) {
        users = JSON.parse(fs.readFileSync(usersFilePath));
    }

    users.push(user);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log('User created successfully.');

    rl.close();
}

createUser();
