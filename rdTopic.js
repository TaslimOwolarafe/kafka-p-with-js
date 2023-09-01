const Kafka = require('node-rdkafka');

const kafkaConfig = {
  'metadata.broker.list': ["localhost:9092", "9092:9092"], // Replace with your Kafka broker's address
  'client.id': 'app1'
};

const admin = Kafka.AdminClient.create(kafkaConfig);

const topicsToCreate = [
  {
    topic: 'Use',
    num_partitions: 2,
    replication_factor: 1
  },
];

admin.createTopic({ topics: topicsToCreate }, (err, result) => {
  if (err) {
    console.error('Error creating topics:', err);
  } else {
    console.log('Topics created successfully:', result);
  }

  admin.disconnect();
});
