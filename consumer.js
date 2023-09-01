const {Kafka} = require("kafkajs")

run();
async function run() {
    try {
        // establish tcp connection
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ["localhost:29092", "localhost:39092"]
        })

        const consumer = kafka.consumer({groupId: "test"});
        console.log("Connecting..")
        await consumer.connect()
        console.log("Connected!")

        consumer.subscribe({
            topic: "Users-1",
            fromBeginning: true
        })
        
        await consumer.run({
            eachMessage: async result => {
                console.log(`Received MSG: ${result.message.value} on Partition${result.partition}`)
            }
        });

    } catch (err){
        console.error("Something happened: ", err)
    } finally {
        // process.exit(0)
    }
}