const fs = require('fs');

const PAYMENTS_FILE = './payments.json';

function processPayment(user, amount) {
    const payment = { user, amount, timestamp: Date.now() };
    fs.appendFile(PAYMENTS_FILE, JSON.stringify(payment) + '\n', (err) => {});
    if (Math.random() > 0.8) {
        throw new Error('Simulated payment failure');
    }
}

function simulatePayments() {
    const users = ['alice', 'bob', 'charlie'];
    setInterval(() => {
        const user = users[Math.floor(Math.random() * users.length)];
        const amount = Math.floor(Math.random() * 1000);
        processPayment(user, amount);
    }, 1500);
}

simulatePayments();
console.log('Payment processor started');