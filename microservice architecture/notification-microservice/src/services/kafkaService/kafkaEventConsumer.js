const { Kafka } = require('kafkajs');

class KafkaEventConsumer {

  constructor(topic) {

    this.kafka = new Kafka({
      clientId: 'notification-service',
      brokers: ['kafka:9092'],
      connectionTimeout: 30000,
    });
    this.consumer = this.kafka.consumer({ groupId: 'notification-group' });
    this.topic = topic;
    this.isRunning = false;
  }

  async consume(processMessageCallback) {
    
    if (this.isRunning) {
      console.log("El consumidor ya está en ejecución.");
      return;
    }

    try {
     
      await this.consumer.connect();

      await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
      this.isRunning = true;

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          
          const event = JSON.parse(message.value.toString());

          await processMessageCallback(event);
        },
      });
      
    } catch (error) {
      console.error("Error in Kafka consumer:", error);
      this.stop();
    }
  }

  async stop() {
    if (!this.isRunning) {
      console.log("El consumidor ya está detenido.");
      return;
    }

    await this.consumer.disconnect();
    console.log("Consumidor desconectado");
    this.isRunning = false;
  }
}

module.exports = KafkaEventConsumer;
