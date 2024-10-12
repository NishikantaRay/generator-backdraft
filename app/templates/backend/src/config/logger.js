import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
    format: format.combine(format.timestamp(), format.simple()),
    transports: [
      new winston.transports.File({
        filename: "logs/server/error.log",
        level: "error",
        handleExceptions: true,
      }),
      new winston.transports.File({
        filename: "logs/server/all.log",
        level: "info",
        handleExceptions: true,
      }),
      new DailyRotateFile({
        maxFiles: "14d",
        level: "info",
        dirname: "logs/server/daily",
        datePattern: "YYYY-MM-DD",
        filename: "%DATE%.log",
      }),
      new winston.transports.Console({
        level: "debug",
        json: false,
        handleExceptions: true,
      }),
    ],
  });
  
  /**
   * morganLogger logs all http request in a dedicated file and on console
   */
  const morganLogger = winston.createLogger({
    format: format.combine(format.simple()),
    transports: [
      new winston.transports.File({
        filename: "logs/requests/all.log",
        level: "debug",
        handleExceptions: true,
      }),
      new winston.transports.Console({
        level: "debug",
        json: false,
        handleExceptions: true,
      }),
      new DailyRotateFile({
        maxFiles: "14d",
        level: "info",
        dirname: "logs/requests/daily",
        datePattern: "YYYY-MM-DD",
        filename: "%DATE%.log",
      }),
    ],
  });
  
  /**
   * A writable stream for winston logger, used with morgan for HTTP request logging.
   */
  export const logStream = {
    write(message) {
      morganLogger.info(message.toString());
    },
  };
  
  export default logger;