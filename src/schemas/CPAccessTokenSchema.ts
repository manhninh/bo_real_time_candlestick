import IAccessTokenModel from '@src/models/cpAccessToken/IAccessTokenModel';
import mongoose from 'mongoose';

class CPAccessTokenSchema {
  static get schema() {
    const schema = new mongoose.Schema({
      client_id: {
        type: String,
        required: true,
      },
      id_client: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      updatedAt: {
        type: Date,
        required: true,
      },
    });
    return schema;
  }
}

export default mongoose.model<IAccessTokenModel>('cp_access_token', CPAccessTokenSchema.schema);
