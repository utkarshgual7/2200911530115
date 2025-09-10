class LoggingMiddleware {
  constructor(testServerUrl = 'http://20.244.56.144/evaluation-service/logs') {
    this.testServerUrl = testServerUrl;
  }

  async log(stack, level, packageName, message) {
    const logData = {
      stack: stack,
      level: level,
      package: packageName,
      message: message,
      timestamp: new Date().toISOString()
    };

    const http = require('http');
    
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(logData);
      
      const url = new URL(this.testServerUrl);
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1dGthcnNoZ3VhbEBnbWFpbC5jb20iLCJleHAiOjE3NTc0OTc0OTIsImlhdCI6MTc1NzQ5NjU5MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIxYTcxMmEwLWY5MTAtNDIwMS1iYWJhLWM5ZTUyYzk4MmNkMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InV0a2Fyc2ggZ3VhbCIsInN1YiI6IjhlNzBmYzE5LTQ1MTktNGQ1Ni05MjkyLWJjMzcxMTY5MmNlOSJ9LCJlbWFpbCI6InV0a2Fyc2hndWFsQGdtYWlsLmNvbSIsIm5hbWUiOiJ1dGthcnNoIGd1YWwiLCJyb2xsTm8iOiIyMjAwOTExNTMwMTE1IiwiYWNjZXNzQ29kZSI6Ik5Xa3RCdSIsImNsaWVudElEIjoiOGU3MGZjMTktNDUxOS00ZDU2LTkyOTItYmMzNzExNjkyY2U5IiwiY2xpZW50U2VjcmV0IjoiQVhOS1h4ZE1mVFhWRGVKSyJ9.T_sByd0EUav9GcETcTn2TE3VnTdYdWvwTKolHa_VQdU`

        }
      };
      
      const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Logging failed: ${error}`));
      });
      
      req.write(data);
      req.end();
    });
  }

  // multiple logging  methods
  async logBackend(level, packageName, message) {
    return this.log('backend', level, packageName, message);
  }
  async logFrontend(level, packageName, message) {
    return this.log('frontend', level, packageName, message);
  }

  async debug(stack, packageName, message) {
    return this.log(stack, 'debug', packageName, message);
  }

  async info(stack, packageName, message) {
    return this.log(stack, 'info', packageName, message);
  }

  async warn(stack, packageName, message) {
    return this.log(stack, 'warn', packageName, message);
  }

  async error(stack, packageName, message) {
    return this.log(stack, 'error', packageName, message);
  }

  async fatal(stack, packageName, message) {
    return this.log(stack, 'fatal', packageName, message);
  }


}

const logger = new LoggingMiddleware();

module.exports = {
  LoggingMiddleware,
  logger
};