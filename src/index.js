const startWorker = require('./service/worker');
const pushMessage = require('./service/pushmessage')


async function main() {
    startWorker();
}
main();