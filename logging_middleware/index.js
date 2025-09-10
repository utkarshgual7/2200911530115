class LoggingMiddleware {
  constructor(testServerUrl = 'http://localhost:3000/logs') {
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
          'Content-Length': data.length
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