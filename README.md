# Bulk API Caller

A simple Node.js tool for making bulk HTTP/HTTPS API calls with configurable delay and fire-and-forget approach. Perfect for load testing, stress testing, or bulk operations on APIs.

## Features

- 🚀 **Fire-and-forget requests**: Sends requests without waiting for responses to maximize throughput
- ⏳ **Sequential mode**: Option to wait for each request to complete before sending the next
- ⏱️ **Configurable delay**: Set custom delay between requests (default: 50ms)
- 🔁 **Flexible call count**: Choose specific number of calls or run unlimited until manual stop
- 🌐 **HTTP/HTTPS support**: Automatically detects and handles both HTTP and HTTPS endpoints
- 📊 **Real-time progress**: Shows request count and progress in real-time
- ❌ **Error handling**: Gracefully handles invalid URLs and network errors

## Prerequisites

- Node.js (version 12 or higher)
- No external dependencies required (uses only Node.js built-in modules)

## Installation

1. Clone or download this repository:
   ```bash
   git clone <repository-url>
   cd bulk-api-caller
   ```

2. No additional installation required - uses only Node.js built-in modules!

## Usage

### Basic Usage

Run the script using Node.js:

```bash
node index.js
```

The tool will prompt you for:

1. **API Endpoint**: The full URL of the API you want to call
   ```
   🔗 Enter the API endpoint: https://api.example.com/endpoint
   ```

2. **Delay**: Time between requests in milliseconds (default: 50ms)
   ```
   ⏱ Enter delay between calls in ms (default is 50): 100
   ```

3. **Total Calls**: Number of requests to make (leave empty for unlimited)
   ```
   🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 1000
   ```

4. **Sequential Mode**: Whether to wait for each request to complete before sending the next (default: No)
   ```
   ⏳ Wait for each request to complete before sending the next? (y/N, default is N): N
   ```

### Example Sessions

#### Fire-and-Forget Mode (Default)
```
🔗 Enter the API endpoint: https://jsonplaceholder.typicode.com/posts/1
⏱ Enter delay between calls in ms (default is 50): 100
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 10
⏳ Wait for each request to complete before sending the next? (y/N, default is N): N

🚀 Starting fire-and-forget calls to: https://jsonplaceholder.typicode.com/posts/1
🔁 Will make 10 calls
➡️  [1/10] Request sent
➡️  [2/10] Request sent
...
```

#### Sequential Mode
```
🔗 Enter the API endpoint: https://jsonplaceholder.typicode.com/posts/1
⏱ Enter delay between calls in ms (default is 50): 500
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 5
⏳ Wait for each request to complete before sending the next? (y/N, default is N): y

🚀 Starting sequential calls to: https://jsonplaceholder.typicode.com/posts/1
🔁 Will make 5 calls
➡️  [1/5] Request completed
➡️  [2/5] Request completed
...
```

#### Unlimited Calls
```
🔗 Enter the API endpoint: https://api.example.com/health
⏱ Enter delay between calls in ms (default is 50): 
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 
⏳ Wait for each request to complete before sending the next? (y/N, default is N): 

🚀 Starting fire-and-forget calls to: https://api.example.com/health
🔁 Will keep calling until you press Ctrl+C
➡️  [1] Request sent
➡️  [2] Request sent
...
```

## Configuration Options

| Parameter | Description | Default | Example |
|-----------|-------------|---------|----------|
| **Endpoint** | Full URL of the API endpoint | Required | `https://api.example.com/test` |
| **Delay** | Milliseconds between requests | 50ms | `100` (for 100ms) |
| **Total Calls** | Number of requests to make | Unlimited | `1000` (leave empty for unlimited) |
| **Sequential Mode** | Wait for each request to complete before sending next | No (fire-and-forget) | `y` or `yes` for sequential mode |

## Use Cases

- **Load Testing**: Test how your API handles multiple concurrent requests
- **Stress Testing**: Push your API to its limits to find breaking points
- **Bulk Operations**: Trigger bulk operations or cache warming
- **Performance Monitoring**: Monitor API response times under load
- **Development Testing**: Quick and easy way to generate traffic for testing

## Technical Details

### Request Modes

#### Fire-and-Forget Mode (Default)
This is the default mode that:
- Sends requests without waiting for responses
- Maximizes request throughput
- Errors are silently ignored to maintain performance
- Perfect for high-volume load testing scenarios

#### Sequential Mode
This alternative mode:
- Waits for each request to complete before sending the next
- Provides more controlled request pacing
- Better for testing response handling and avoiding overwhelming the target
- Useful for scenarios where request order and completion matter

### Protocol Support

- **HTTP**: Automatically detected for `http://` URLs
- **HTTPS**: Automatically detected for `https://` URLs
- Uses Node.js built-in `http` and `https` modules

### Error Handling

- Invalid URLs are caught and logged
- Network errors are silently ignored (fire-and-forget)
- Input validation prevents crashes from invalid parameters

## Stopping the Tool

- **Limited calls**: Tool stops automatically after reaching the specified count
- **Unlimited calls**: Press `Ctrl+C` to stop the tool

## Safety Considerations

⚠️ **Important**: This tool can generate significant load on target APIs. Please:

- Only test APIs you own or have permission to test
- Start with small delays and limited calls
- Monitor your target system's performance
- Respect rate limits and terms of service
- Use responsibly and ethically

## Troubleshooting

### Common Issues

1. **"Invalid URL" error**
   - Ensure the URL includes the protocol (`http://` or `https://`)
   - Check for typos in the URL

2. **Tool not stopping**
   - Press `Ctrl+C` to force stop
   - Check if you're in unlimited mode

3. **High CPU usage**
   - Increase the delay between requests
   - Reduce the number of concurrent calls

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this tool.

## License

This project is open source and available under the [MIT License](LICENSE).

## Changelog

### v1.1.0
- Added sequential mode option
- Enhanced request control with wait-for-completion feature
- Improved function documentation and comments
- Updated user interface with new prompt

### v1.0.0
- Initial release
- Fire-and-forget HTTP/HTTPS requests
- Configurable delay and call count
- Real-time progress tracking
- Error handling and input validation