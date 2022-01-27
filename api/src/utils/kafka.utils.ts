/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: fix configuration issues prefenting a standard IMPORT here
const Kafka = require("../../node_modules/kafkajs");

// TODO: revert to type when possible
let kafka: any;

function getInstance() {
  console.log(
    "Connecting to",
    process.env.KAFKA_BOOTSTRAP_SERVER,
    "with clientId",
    process.env.KAFKA_CLIENT_ID
  );
  kafka = new Kafka.Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "developer-kafka.logging.middleware",
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER || ""],
  });
  return kafka;
}

async function initialize(): Promise<void> {
    kafka = getInstance();
  const admin = kafka.admin();
  await admin.connect();
  // TODO: return this type to ITopicConfig[] after fixing import
  const topics: any[] = [
    {
      topic:
        process.env.KAFKA_LOGGING_TOPIC || "please-configure-env-variables",
      numPartitions: 1,
      replicationFactor: 1,
    },
  ];
  await admin.createTopics({
    validateOnly: false,
    waitForLeaders: true,
    topics,
  });
  await admin.disconnect();
}

async function write(topic: string, messages: any[]){
  // TODO: revert to strict types
  const kafka: any = getInstance();
  const producer: any = kafka.producer();
  // TODO: generate and store a request guid on the request / session object 
  // so that the END call to the logger can be reliably tied to the beginning call.
  await producer.connect();
  await producer.send({
    topic,
    messages
  });
  await producer.disconnect();
}

export default {
  initialize,
  getInstance,
  write
};
