const startWorker = require('./service/worker');
const pushMessage = require('./service/pushmessage')


async function main() {
    const msg = ""
    pushMessage(msg)
      .then((response) => {
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}
main();