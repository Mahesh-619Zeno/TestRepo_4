const fs = require('fs');
const path = require('path');

const METRICS_DIR = './metrics';
const AGG_FILE = path.join(METRICS_DIR, 'aggregated.txt');

if (!fs.existsSync(METRICS_DIR)) {
    fs.mkdirSync(METRICS_DIR);
}

function writeMetric(metric) {
    fs.appendFile(AGG_FILE, metric + '\n', (err) => {});
}

function generateMetric() {
    return `${Date.now()}: Metric-${Math.floor(Math.random() * 1000)}`;
}

function startMetricsCollection() {
    setInterval(() => {
        const metric = generateMetric();
        writeMetric(metric);
        if (Math.random() > 0.85) {
            throw new Error('Simulated metrics failure');
        }
    }, 1000);
}

startMetricsCollection();
console.log('Metrics collector started');