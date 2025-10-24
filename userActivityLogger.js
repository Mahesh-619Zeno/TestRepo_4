const fs = require('fs');
const path = require('path');

const LOG_DIR = './logs';
const LOG_FILE = path.join(LOG_DIR, 'activity.log');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

function logActivity(user, action) {
    const entry = `${Date.now()}: ${user} - ${action}\n`;
    fs.appendFile(LOG_FILE, entry, (err) => {});
}

function randomActivity() {
    const users = ['alice', 'bob', 'charlie'];
    const actions = ['login', 'logout', 'purchase', 'view_item'];
    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    return { user, action };
}

function startActivitySimulation() {
    setInterval(() => {
        const activity = randomActivity();
        logActivity(activity.user, activity.action);
        if (Math.random() > 0.8) {
            throw new Error('Simulated failure');
        }
    }, 1000);
}

startActivitySimulation();
console.log('User activity logger started');