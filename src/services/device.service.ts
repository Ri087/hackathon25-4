import { DeviceRepository } from "../repositories/device.repository";

export class DeviceService {
  private deviceRepo = new DeviceRepository();

  async getAllDevices() {
    return this.deviceRepo.getAll();
  }

  async getDeviceById(id: string) {
    return this.deviceRepo.getById(id);
  }

  async createDevice(device: any) {
    return this.deviceRepo.create(device);
  }

  async updateDevice(id: string, device: any) {
    return this.deviceRepo.update(id, device);
  }

  async deleteDevice(id: string) {
    return this.deviceRepo.delete(id);
  }
}