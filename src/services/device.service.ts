import { DeviceRepository } from "../repositories/device.repository";

export class DeviceService {
  private deviceRepo = new DeviceRepository();

  async getAllDevices() {
    return this.deviceRepo.getAll();
  }

  async getDeviceById(id: string) {
    return this.deviceRepo.getById(id);
  }

  async getDeviceByObjectId(id: string) {
    return this.deviceRepo.getByObjectId(id);
  }

  async createDevice(device: any) {
    return this.deviceRepo.create(device);
  }

  async updateDevice(id: string, device: any) {
    return this.deviceRepo.update(id, device);
  }

  async updateDeviceByCustomId(id: string, device: any) {
    return this.deviceRepo.updateByCustomId(id, device);
  }

  async deleteDevice(id: string) {
    return this.deviceRepo.delete(id);
  }
}