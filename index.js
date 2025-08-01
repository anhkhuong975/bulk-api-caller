// bulk-api-caller.js
const readline = require('readline');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fire-and-forget GET request (no waiting for response)
function fireAndForget(urlStr) {
    try {
        const urlObj = new URL(urlStr);
        const lib = urlObj.protocol === 'https:' ? https : http;

        const req = lib.get(urlObj);
        req.on('error', () => {}); // Ignore errors
        req.end();
    } catch (err) {
        console.error(`❌ Invalid URL or request error: ${err.message}`);
    }
}

// Main logic
async function startCalling(endpoint, delay, totalCalls) {
    let count = 0;
    const isUnlimited = totalCalls === null;

    console.log(`🚀 Starting fire-and-forget calls to: ${endpoint}`);
    if (isUnlimited) {
        console.log(`🔁 Will keep calling until you press Ctrl+C`);
    } else {
        console.log(`🔁 Will make ${totalCalls} calls`);
    }

    while (isUnlimited || count < totalCalls) {
        count++;
        fireAndForget(endpoint);
        console.log(`➡️  [${count}${isUnlimited ? '' : '/' + totalCalls}] Request sent`);
        await sleep(delay);
    }

    rl.close();
}

(async () => {
    const endpoint = await ask('🔗 Enter the API endpoint: ');
    const delayStr = await ask('⏱ Enter delay between calls in ms (default is 50): ');
    const totalStr = await ask('🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): ');

    const delay = delayStr ? parseInt(delayStr, 10) : 50;
    const totalCalls = totalStr ? parseInt(totalStr, 10) : null;

    if (!endpoint || isNaN(delay) || (totalStr && isNaN(totalCalls))) {
        console.error('❗ Invalid input.');
        rl.close();
        process.exit(1);
    }

    await startCalling(endpoint, delay, totalCalls);
})();
