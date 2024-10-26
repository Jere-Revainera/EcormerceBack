import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

const collection = "users";
const schema = new Schema({
name:{type: String, required:true},
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://iconduck.com/icons/22546/user?shared",
  },
  role: { type: String, enum: [0,1,2], default: 0, index: true},
});

schema.plugin(mongoosePaginator)
const User = model(collection, schema);
export default User;