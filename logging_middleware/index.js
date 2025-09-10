class LoggingMiddleware {
  constructor(testServerUrl = 'http://20.244.56.144/evaluation-service/logs') {
    this.testServerUrl = testServerUrl;
  }

  async log(stack, level, packageName, message) {
    const logData = {
      stack: stack,
      level: level,
      package: packageName,
      message: message
    };

    try {
      const response = await fetch(this.testServerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer {token}`
        },
        body: JSON.stringify(logData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(`Logging failed: ${error}`);
    }
  }

  async logBackend(level, packageName, message) {
    return this.log('backend', level, packageName, message);
  }

}

const logger = new LoggingMiddleware();

export default {
  LoggingMiddleware,
  logger
};