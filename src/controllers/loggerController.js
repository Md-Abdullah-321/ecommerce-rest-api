const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
    format: winston.format.combine(winston.format.timestamp(
        {
          format: 'YY-MM-DD HH:mm:ss'
      }
  ), winston.format.json()),
    transports: [
        new winston.transports.File({
            filename: 'src/logs/info.log',
            level: 'info',
            maxsize: 5242880,
            maxFiles: 5
        }),
        new winston.transports.File({
            filename: 'src/logs/error.log',
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5
        }),
    //     new winston.transports.Console({
    //   format: winston.format.combine(winston.format.colorize(), winston.format.simple()),      
  ],
});

module.exports = logger;