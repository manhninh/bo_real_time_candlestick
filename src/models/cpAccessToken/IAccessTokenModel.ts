import mongoose from 'mongoose';

export default interface IAccessTokenModel extends mongoose.Document {
  client_id: string;
  id_client: string;
  type: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
