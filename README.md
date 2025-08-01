# Bulk API Caller

A simple Node.js tool for making bulk HTTP/HTTPS API calls with configurable delay and fire-and-forget approach. Perfect for load testing, stress testing, or bulk operations on APIs.

## Features

- 🚀 **Fire-and-forget requests**: Sends requests without waiting for responses to maximize throughput
- ⏳ **Sequential mode**: Option to wait for each request to complete before sending the next
- ⏱️ **Configurable delay**: Set custom delay between requests (default: 50ms)
- 🔁 **Flexible call count**: Choose specific number of calls or run unlimited until manual stop
- 🔢 **Multiple instances**: Run multiple concurrent instances for increased load (default: 1)
- 🌐 **HTTP/HTTPS support**: Automatically detects and handles both HTTP and HTTPS endpoints
- 📊 **Real-time progress**: Shows request count and progress in real-time with instance identification
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

5. **Instance Count**: Number of concurrent instances to run (default: 1)
   ```
   🔢 Enter number of instances to run (default is 1): 3
   ```

### Example Sessions

#### Fire-and-Forget Mode (Default)
```
🔗 Enter the API endpoint: https://jsonplaceholder.typicode.com/posts/1
⏱ Enter delay between calls in ms (default is 50): 100
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 10
⏳ Wait for each request to complete before sending the next? (y/N, default is N): N
🔢 Enter number of instances to run (default is 1): 1

🎯 Configuration Summary:
   📍 Endpoint: https://jsonplaceholder.typicode.com/posts/1
   ⏱️  Delay: 100ms
   🔁 Total calls: 10
   ⏳ Mode: Fire-and-forget
   🔢 Instances: 1

🚀 Starting 1 instance...

🚀 [Instance 1] Starting fire-and-forget calls to: https://jsonplaceholder.typicode.com/posts/1
🔁 [Instance 1] Will make 10 calls
➡️  [Instance 1] [1/10] Request sent
➡️  [Instance 1] [2/10] Request sent
...
✅ [Instance 1] Completed all requests

🎉 All 1 instance has completed successfully!
```

#### Sequential Mode
```
🔗 Enter the API endpoint: https://jsonplaceholder.typicode.com/posts/1
⏱ Enter delay between calls in ms (default is 50): 500
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 5
⏳ Wait for each request to complete before sending the next? (y/N, default is N): y
🔢 Enter number of instances to run (default is 1): 1

🎯 Configuration Summary:
   📍 Endpoint: https://jsonplaceholder.typicode.com/posts/1
   ⏱️  Delay: 500ms
   🔁 Total calls: 5
   ⏳ Mode: Sequential
   🔢 Instances: 1

🚀 Starting 1 instance...

🚀 [Instance 1] Starting sequential calls to: https://jsonplaceholder.typicode.com/posts/1
🔁 [Instance 1] Will make 5 calls
➡️  [Instance 1] [1/5] Request completed
➡️  [Instance 1] [2/5] Request completed
...
✅ [Instance 1] Completed all requests

🎉 All 1 instance has completed successfully!
```

#### Multiple Instances Example
```
🔗 Enter the API endpoint: https://api.example.com/test
⏱ Enter delay between calls in ms (default is 50): 100
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 20
⏳ Wait for each request to complete before sending the next? (y/N, default is N): N
🔢 Enter number of instances to run (default is 1): 3

🎯 Configuration Summary:
   📍 Endpoint: https://api.example.com/test
   ⏱️  Delay: 100ms
   🔁 Total calls: 20
   ⏳ Mode: Fire-and-forget
   🔢 Instances: 3

🚀 Starting 3 instances...

🚀 [Instance 1] Starting fire-and-forget calls to: https://api.example.com/test
🚀 [Instance 2] Starting fire-and-forget calls to: https://api.example.com/test
🚀 [Instance 3] Starting fire-and-forget calls to: https://api.example.com/test
🔁 [Instance 1] Will make 20 calls
🔁 [Instance 2] Will make 20 calls
🔁 [Instance 3] Will make 20 calls
➡️  [Instance 1] [1/20] Request sent
➡️  [Instance 2] [1/20] Request sent
➡️  [Instance 3] [1/20] Request sent
...
✅ [Instance 1] Completed all requests
✅ [Instance 2] Completed all requests
✅ [Instance 3] Completed all requests

🎉 All 3 instances have completed successfully!
```

#### Unlimited Calls
```
🔗 Enter the API endpoint: https://api.example.com/health
⏱ Enter delay between calls in ms (default is 50): 
🔁 Enter total number of calls (leave empty for unlimited until Ctrl+C): 
⏳ Wait for each request to complete before sending the next? (y/N, default is N): 
🔢 Enter number of instances to run (default is 1): 

🎯 Configuration Summary:
   📍 Endpoint: https://api.example.com/health
   ⏱️  Delay: 50ms
   🔁 Total calls: Unlimited
   ⏳ Mode: Fire-and-forget
   🔢 Instances: 1

🚀 Starting 1 instance...

🚀 [Instance 1] Starting fire-and-forget calls to: https://api.example.com/health
🔁 [Instance 1] Will keep calling until you press Ctrl+C
➡️  [Instance 1] [1] Request sent
➡️  [Instance 1] [2] Request sent
...
```

## Configuration Options

| Parameter | Description | Default | Example |
|-----------|-------------|---------|----------|
| **Endpoint** | Full URL of the API endpoint | Required | `https://api.example.com/test` |
| **Delay** | Milliseconds between requests | 50ms | `100` (for 100ms) |
| **Total Calls** | Number of requests to make | Unlimited | `1000` (leave empty for unlimited) |
| **Sequential Mode** | Wait for each request to complete before sending next | No (fire-and-forget) | `y` or `yes` for sequential mode |
| **Instance Count** | Number of concurrent instances to run | 1 | `3` (for 3 parallel instances) |

## Use Cases

- **Load Testing**: Test how your API handles multiple concurrent requests with configurable instances
- **Stress Testing**: Push your API to its limits using multiple parallel instances
- **Bulk Operations**: Trigger bulk operations or cache warming with concurrent execution
- **Performance Monitoring**: Monitor API response times under various load conditions
- **Development Testing**: Quick and easy way to generate traffic for testing with scalable instances

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

#### Multiple Instances
The tool supports running multiple concurrent instances:
- **Parallel Execution**: Each instance runs independently and concurrently
- **Instance Identification**: All console output includes instance identification for clarity
- **Coordinated Completion**: All instances must complete before the tool exits
- **Scalable Load**: Easily multiply your load by running multiple instances
- **Benefits**: Generate higher request volumes, test true concurrent scenarios, simulate real-world traffic patterns

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