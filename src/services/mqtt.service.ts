import mqtt from "mqtt";

class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect("mqtt://192.168.243.95:1883");

    this.client.on("connect", () => {
      console.log("✅ Connecté au broker MQTT");
    });

    this.client.on("error", (error) => {
      console.error("❌ Erreur MQTT:", error);
    });

    this.client.on("message", (topic, message) => {
      console.log(`📩 Message reçu sur ${topic}: ${message.toString()}`);
    });
  }

  public publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  public subscribe(topic: string): void {
    this.client.subscribe(topic);
  }

  public onMessage(callback: (topic: string, message: string) => void): void {
    this.client.on("message", (topic, message) => {
      callback(topic, message.toString());
    });
  }
}

export default new MqttService();
