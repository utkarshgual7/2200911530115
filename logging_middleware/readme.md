# Logging Middleware

This middleware allows you to send log messages to a logging endpoint.

## API Endpoint

```
http://20.244.56.144/evaluation-service/logs
```

## Methods

### log(stack, level, package, message)

Logs a message with the specified parameters:
- stack: The stack context (e.g., 'backend', 'frontend')
- level: The log level (e.g., 'info', 'warn', 'error')
- package: The package or module name
- message: The log message



```