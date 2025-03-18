import { connectDB } from "../config/database";
import { ObjectId } from "mongodb";

export class DeviceRepository {
  private collection = "devices";

  async getAll() {
    const db = await connectDB();
    return db.collection(this.collection).find().toArray();
  }

  async getByLabel(label: string) {
    const db = await connectDB();
    return db.collection(this.collection).findOne({ label });
  }

  async getById(id: string) {
    const db = await connectDB();
    return db.collection(this.collection).findOne({ id });
  }

  async getByObjectId(id: string) {
    const db = await connectDB();
    return db.collection(this.collection).findOne({ _id: new ObjectId(id) });
  }

  async create(device: any) {
    const db = await connectDB();
    return db.collection(this.collection).insertOne(device);
  }

  async update(id: string, device: any) {
    const db = await connectDB();
    return db.collection(this.collection).updateOne(
      { _id: new ObjectId(id) },
      { $set: device }
    );
  }

  async updateById(id: string, device: any) {
    const db = await connectDB();
    return db.collection(this.collection).updateOne(
      { id: id },
      { $set: device }
    );
  }

  async delete(id: string) {
    const db = await connectDB();
    return db.collection(this.collection).deleteOne({ _id: new ObjectId(id) });
  }
}