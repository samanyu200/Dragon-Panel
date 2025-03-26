const fs = require('fs');

const adminUser = {
    username: "admin",
    password: "admin123", // Change this to a secure password
    role: "admin"
};

// Save to a JSON file (or connect to a real database)
fs.writeFileSync("admin.json", JSON.stringify(adminUser, null, 2));

console.log("✅ Admin user created! Username: admin, Password: admin123");
console.log("⚠️ Change the password for security!");
