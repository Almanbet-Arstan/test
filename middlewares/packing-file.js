module.exports = (req, res, next) =>  {
    let buffer = Buffer.from('');
    req.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
    });
    req.on('end', () => {
        req.file = buffer;
        next();
    })
}