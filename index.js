const readline = require('readline');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const showHeading = () => {
    console.log('\n' +
        '▗▄▄▖ ▗▖ ▗▖▗▖   ▗▖ ▗▖     ▗▄▖ ▗▄▄▖▗▄▄▄▖     ▗▄▄▖ ▗▄▖ ▗▖   ▗▖   ▗▄▄▄▖▗▄▄▖ \n' +
        '▐▌ ▐▌▐▌ ▐▌▐▌   ▐▌▗▞▘    ▐▌ ▐▌▐▌ ▐▌ █      ▐▌   ▐▌ ▐▌▐▌   ▐▌   ▐▌   ▐▌ ▐▌\n' +
        '▐▛▀▚▖▐▌ ▐▌▐▌   ▐▛▚▖     ▐▛▀▜▌▐▛▀▘  █      ▐▌   ▐▛▀▜▌▐▌   ▐▌   ▐▛▀▀▘▐▛▀▚▖\n' +
        '▐▙▄▞▘▝▚▄▞▘▐▙▄▄▖▐▌ ▐▌    ▐▌ ▐▌▐▌  ▗▄█▄▖    ▝▚▄▄▖▐▌ ▐▌▐▙▄▄▖▐▙▄▄▖▐▙▄▄▖▐▌ ▐▌\n' +
        '                                                                        \n')
}

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fire-and-forget GET request (no waiting for response)
 * @param {string} urlStr - The URL to make the request to
 */
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

/**
 * Sequential GET request (waits for response before continuing)
 * @param {string} urlStr - The URL to make the request to
 * @returns {Promise} Promise that resolves when the request completes
 */
function sequentialRequest(urlStr) {
    return new Promise((resolve) => {
        try {
            const urlObj = new URL(urlStr);
            const lib = urlObj.protocol === 'https:' ? https : http;

            const req = lib.get(urlObj, (res) => {
                // Consume response data to free up memory
                res.on('data', () => {});
                res.on('end', () => resolve());
                res.on('error', () => resolve()); // Resolve even on error
            });
            
            req.on('error', () => resolve()); // Resolve even on error
            req.end();
        } catch (err) {
            console.error(`❌ Invalid URL or request error: ${err.message}`);
            resolve();
        }
    });
}

/**
 * Main logic for making API calls
 * @param {string} endpoint - The API endpoint URL
 * @param {number} delay - Delay between requests in milliseconds
 * @param {number|null} totalCalls - Total number of calls to make (null for unlimited)
 * @param {boolean} waitForCompletion - Whether to wait for each request to complete before sending the next
 * @param {number} instanceId - Instance identifier for logging purposes
 */
async function startCalling(endpoint, delay, totalCalls, waitForCompletion = false, instanceId = 1) {
    let count = 0;
    const isUnlimited = totalCalls === null;
    const mode = waitForCompletion ? 'sequential' : 'fire-and-forget';
    const instancePrefix = `[Instance ${instanceId}]`;

    console.log(`🚀 ${instancePrefix} Starting ${mode} calls to: ${endpoint}`);
    if (isUnlimited) {
        console.log(`🔁 ${instancePrefix} Will keep calling until you press Ctrl+C`);
    } else {
        console.log(`🔁 ${instancePrefix} Will make ${totalCalls} calls`);
    }

    while (isUnlimited || count < totalCalls) {
        count++;
        
        if (waitForCompletion) {
            await sequentialRequest(endpoint);
            console.log(`➡️  ${instancePrefix} [${count}${isUnlimited ? '' : '/' + totalCalls}] Request completed`);
        } else {
            fireAndForget(endpoint);
            console.log(`➡️  ${instancePrefix} [${count}${isUnlimited ? '' : '/' + totalCalls}] Request sent`);
        }

        await sleep(delay);
    }

    console.log(`✅ ${instancePrefix} Completed all requests`);
}

(async () => {
    showHeading();

    const endpoint = await ask('🔗 Enter the API endpoint: ');
    const delayStr = await ask('⏱ Enter delay between calls in ms (default is 50): ');
    const totalStr = await ask('🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): ');
    const waitStr = await ask('⏳ Wait for each request to complete before sending the next? (y/N, default is N): ');
    const instancesStr = await ask('🔢 Enter number of instances to run (default is 1): ');

    const delay = delayStr ? parseInt(delayStr, 10) : 50;
    const totalCalls = totalStr ? parseInt(totalStr, 10) : null;
    const waitForCompletion = waitStr.toLowerCase() === 'y' || waitStr.toLowerCase() === 'yes';
    const instanceCount = instancesStr ? parseInt(instancesStr, 10) : 1;

    if (!endpoint || isNaN(delay) || (totalStr && isNaN(totalCalls)) || isNaN(instanceCount) || instanceCount < 1) {
        console.error('❗ Invalid input. Please ensure all numeric values are valid and instance count is at least 1.');
        rl.close();
        process.exit(1);
    }

    console.log(`\n🎯 Configuration Summary:`);
    console.log(`   📍 Endpoint: ${endpoint}`);
    console.log(`   ⏱️  Delay: ${delay}ms`);
    console.log(`   🔁 Total calls: ${totalCalls || 'Unlimited'}`);
    console.log(`   ⏳ Mode: ${waitForCompletion ? 'Sequential' : 'Fire-and-forget'}`);
    console.log(`   🔢 Instances: ${instanceCount}`);
    console.log(`\n🚀 Starting ${instanceCount} instance${instanceCount > 1 ? 's' : ''}...\n`);

    // Create and start multiple instances
    const instances = [];
    for (let i = 1; i <= instanceCount; i++) {
        instances.push(startCalling(endpoint, delay, totalCalls, waitForCompletion, i));
    }

    // Wait for all instances to complete
    await Promise.all(instances);
    
    console.log(`\n🎉 All ${instanceCount} instance${instanceCount > 1 ? 's have' : ' has'} completed successfully!`);
    rl.close();
})();
