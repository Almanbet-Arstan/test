const {createLogger, transports, silly} = require('winston');
const logger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console({level: 'info'}),
        new transports.File({filename: 'app.log', level: 'info'})
    ]
});
module.exports = logger;