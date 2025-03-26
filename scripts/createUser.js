const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createUser() {
    const username = await askQuestion("Enter username: ");
    const email = await askQuestion("Enter email: ");
    const password = await askQuestion("Enter password: ");
    const role = await askQuestion("Enter role (admin/user): ");

    if (role !== "admin" && role !== "user") {
        console.log("❌ Invalid role! Use 'admin' or 'user' only.");
        rl.close();
        return;
    }

    const newUser = { username, email, password, role };

    let users = [];
    try {
        const data = fs.readFileSync("data/users.json", "utf8");
        users = JSON.parse(data);
    } catch (err) {
        console.log("No existing users found. Creating new user database.");
    }

    users.push(newUser);
    fs.writeFileSync("data/users.json", JSON.stringify(users, null, 2));

    console.log(`✅ User "${username}" created successfully with role "${role}"!`);
    rl.close();
}

createUser();
