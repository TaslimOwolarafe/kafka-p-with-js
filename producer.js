const {Kafka} = require("kafkajs")


const msg = process.argv[2]; // 0- nodejs app, 1- the file, producer.js, 2- first argument

run();
async function run() {
    try {
        // establish tcp connection
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ["localhost:29092", "localhost:39092"]
        })

        const producer = kafka.producer();
        console.log("Connecting..")
        await producer.connect()
        console.log("Connected!")
        
        //A-M 0, N-Z 1
        console.log(msg)
        const partition = msg[0].toUpperCase() < "N" ? 0 : 1;
        const result = await producer.send({
            topic: "Users-1",
            messages: [
                {
                    // key: 'key1',
                    value: msg,
                    partition: partition
                }
            ]
        })

        console.log(`"Sent Succesfully!.." ${JSON.stringify(result)}`)
        await producer.disconnect();

    } catch (err){
        console.error("Something happened: ", err)
    } finally {
        process.exit(0)
    }
}