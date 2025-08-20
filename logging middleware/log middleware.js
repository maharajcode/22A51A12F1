// index.js
const axios = require('axios');

/**
 * Log event to AffordMed API.
 * @param {string} stack - "backend" or "frontend" (lowercase)
 * @param {string} level - "debug", "trace", "info", "warn", "error", or "fatal" (lowercase)
 * @param {string} packageName - e.g. "auth", "config", "middleware", "utils", "handler" (lowercase)
 * @param {string} message - Description of the event/error
 * @param {string} token - Your Bearer access token from AffordMed
 */
async function logEvent(stack, level, packageName, message, token) {
    const logData = {
        stack: stack,
        level: level,
        package: packageName,
        message: message
    };

    try {
        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/logs',
            logData,
            {
                headers: {
                    'Authorization': Bearer ${token},
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Log sent. Server Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error from API:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}

module.exports = logEvent;

// USAGE EXAMPLE (Uncomment to test, set your token below)
// const token = "PASTE_YOUR_TOKEN_HERE";
// logEvent("backend", "error", "handler", "received string, expected bool", token);