import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true, index: true },
  photo: {
    type: String,
    default:
      "https://economipedia.com/wp-content/uploads/Definicion-de-Producto-1.jpg",
  },
  category: { type: String, default:"zapatilla", index: true },
  supplier:{type:String, default:"nike", index:true},
  price: { type: Number, default: 1, min: 0, max: 1000 },
  stock: { type: Number, default: 1, min: 0 },
});

schema.plugin(mongoosePaginator)

const Product = model(collection, schema);
export default Product;