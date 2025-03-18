import { Device, DeviceSchema } from "./../models/device.model";
import mqtt from "mqtt";
import { DeviceService } from "../services/device.service";

class MqttService {
  private client: mqtt.MqttClient;
  private deviceService = new DeviceService();

  constructor() {
    this.client = mqtt.connect("mqtt://192.168.243.95:1883");

    this.client.on("connect", () => {
      console.log("✅ Connecté au broker MQTT");

      this.client.subscribe("HomeConnect/#", (err) => {
        if (err) {
          console.error("❌ Erreur lors de l'abonnement :", err);
        } else {
          console.log("📡 Abonné au topic HomeConnect/# (écoute tous les appareils)");
        }
      });
    });

    this.client.on("error", (error) => {
      console.error("❌ Erreur MQTT:", error);
    });

    this.client.on("offline", () => {
      console.warn("⚠️ MQTT client hors ligne, tentative de reconnexion...");
    });

    this.client.on("reconnect", () => {
      console.log("🔄 Tentative de reconnexion au broker MQTT...");
    });

    this.client.on("message", async (topic, message): Promise<void> => {
      console.log(`📩 Message reçu sur ${topic}: ${message.toString()}`);

      const topicParts = topic.split("/");
      if (topicParts.length < 2) {
        console.warn(`⚠️ Topic inattendu: ${topic}`);
        return;
      }
      const deviceId = topicParts[1];

      if (deviceId === "Devices") {
        const newDevice = {
          id: message.toString(),
          label: message.toString(),
          type: "light",
        };

        try {
          const existingDevice = await this.deviceService.getDeviceById(newDevice.id);

          if (existingDevice) {
            console.log(`📌 Device ${newDevice.id} already exists. Envoi de son état actuel: ${existingDevice.status}`);

            this.client.publish(`HomeConnect/${newDevice.id}`, existingDevice.status ? "ON" : "OFF");
            return;
          }

          const parsedDevice = DeviceSchema.parse({
            ...newDevice,
            status: false,
            createdAt: new Date(),
          });

          await this.deviceService.createDevice(parsedDevice);
          console.log(`✅ Device ${newDevice.id} créé`);

          this.client.publish(`HomeConnect/${newDevice.id}`, "OFF");

        } catch (error) {
          console.error("❌ Erreur lors de la création du device:", error);
        }
      }
      else {
        try {
          const device = await this.deviceService.getDeviceById(deviceId);

          if (!device) {
            console.error(`❌ Device ${deviceId} non trouvé`);
            return;
          }

          const updatedDevice = { ...device, status: message.toString() === "ON" };
          await this.deviceService.updateDeviceById(deviceId, updatedDevice);
          console.log(`🔄 Device ${deviceId} mis à jour avec status: ${updatedDevice.status}`);
        } catch (error) {
          console.error("❌ Erreur lors de la mise à jour du device:", error);
        }
      }
    });
  }

  public publish(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error("❌ Erreur lors de l'envoi du message:", err);
      } else {
        console.log(`📤 Message publié sur ${topic}: ${message}`);
      }
    });
  }

  public subscribe(topic: string): void {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`❌ Erreur lors de la souscription à ${topic}:`, err);
      } else {
        console.log(`📡 Abonné avec succès au topic: ${topic}`);
      }
    });
  }
}

export default new MqttService();
