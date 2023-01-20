const env = require("./environment");
const fs = require('fs');
const path = require('path');
module.exports = (app) => {
    app.locals.assetPath = (filename) => {
        if (env.name == 'development') {
            // console.log("I am too called");
            return filename;
        }
        return JSON.parse(fs.readFileSync(path.join(__dirname, "../public/assets/rev-manifest.json")))[filename];
    }
}