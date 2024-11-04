const { Kafka } = require('kafkajs');

class KafkaEventProducer {
  constructor() {
    const kafka = new Kafka({
      clientId: 'user-service',
      brokers: ['kafka:9092'],
      connectionTimeout: 30000,
    });
    this.producer = kafka.producer();
  }

  async connect() {
    try {
      await this.producer.connect();
      console.log('Kafka producer connected successfully');
    } catch (error) {
      console.error('Error connecting to Kafka:', error);
    }
  }

  async publish(topic, message) { 

    try {
      console.log(`Publishing message to topic ${topic}:`, message);
      await this.producer.send({
          topic: topic,
          messages: [{ value: JSON.stringify(message) }],
      });
      console.log('Message published successfully');
      
    } catch (error) {
      console.error('Error publishing message to Kafka:', error);
    }
  }

  async disconnect() {
      await this.producer.disconnect();
  }
}

module.exports = KafkaEventProducer;
