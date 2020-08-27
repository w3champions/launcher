const logger = window.require("electron-log")

logger.transports.file.level = "debug"
logger.transports.console.level = "debug"

export default logger;
