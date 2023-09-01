const {Kafka} = require("kafkajs")
run();
async function run() {
    try {
        // establish tcp connection
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ["localhost:29092", "localhost:39092"],
        })

        const admin = kafka.admin();
        console.log("Connecting..")
        await admin.connect()
        console.log("Connected!")
        // A-M, N-Z
        const topics = await admin.createTopics({
            topics: [{
                topic: "Users-1",
                numPartitions: 2
            }]
    });
    console.log("Created SUccesfully!..", topics)
    await admin.disconnect();

    } catch (err){
        console.error("something happened", err)
    } finally {
        process.exit(0)
    }
}