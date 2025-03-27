const fs = require('fs');
const readline = require('readline');
const bcrypt = require('bcrypt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createUser() {
    const username = await askQuestion('Enter username: ');
    const email = await askQuestion('Enter email: ');
    const password = await askQuestion('Enter password: ');
    const role = await askQuestion('Enter role (admin/user): ');

    const hashedPassword = await bcrypt.hash(password, 10);

    let users = [];
    if (fs.existsSync('data/users.json')) {
        users = JSON.parse(fs.readFileSync('data/users.json'));
    }

    users.push({
        username,
        email,
        password: hashedPassword,
        role
    });

    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
    console.log('User created successfully.');
    rl.close();
}

createUser();
