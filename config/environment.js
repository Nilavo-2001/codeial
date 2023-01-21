const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahblah',
    db: 'codeial_development',
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "habraking2001@gmail.com",
            pass: "dmafmwwksjtpivco",
        },
    },
    google_client_id: "470129943327-f8ek0a0ei0u72cv1mt6b6h0diasg6aj6.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}



// this line decides the mode in which our server would run....if development object is passed then it would run on development mode and if the production object is passed then it will run on production mode
module.exports = development;
// we set the value of NODE_ENV dynamically while running the server using prod_start script