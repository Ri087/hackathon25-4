import { DeviceRepository } from "../repositories/device.repository";

export class DeviceService {
  private deviceRepo = new DeviceRepository();

  async getAllDevices() {
    return this.deviceRepo.getAll();
  }

  async getDeviceByLabel(label: string) {
    return this.deviceRepo.getByLabel(label);
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

  async updateDeviceByObjectId(id: string, device: any) {
    return this.deviceRepo.update(id, device);
  }

  async updateDeviceById(id: string, device: any) {
    return this.deviceRepo.updateById(id, device);
  }

  async deleteDevice(id: string) {
    return this.deviceRepo.delete(id);
  }
}