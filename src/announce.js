const pushMessage = require('./service/pushmessage')
require("dotenv").config();

async function main() {
    const msg = process.env.ANNOUNCE
    pushMessage(msg);
}
main();