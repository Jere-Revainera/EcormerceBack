import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readAll = async (filter) => {
    try {
      const all = await this.model.find(filter, "-__v").lean();

      return all;
    } catch (error) {
      throw error;
    }
  };
  paginate = async (filter, opts) => {
    try {
      opts.lean = true;
      const all = await this.model.paginate(filter, opts);
      return all;
    } catch (error) {
      throw error;
    }
  };
  read = async (id) => {
    try {
      const one = await this.model.findOne({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const opts = { new: true };
      const one = await this.model.findOneAndUpdate({ _id: id }, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const one = await this.model.findOneAndDelete({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  };
  calculateTotal = async (id) => {
    try {
      const total = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(id) } },

        {
          $lookup: {
            foreignField: "_id",
            from: "products",
            localField: "product_id",
            as: "product_id",
          },
        },

        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },

        { $set: { subtotal: { $multiply: ["$quantity", "$price"] } } },

        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },

        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },

        {
          $lookup: {
            foreignField: "_id",
            from: "users",
            localField: "user_id",
            as: "user_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$user_id", 0] }, "$$ROOT"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            user_id: 0,
            password: 0,
            age: 0,
            role: 0,
            __v: 0,
          },
        },
      ]);
      return total;
    } catch (error) {
      throw error;
    }
  };
}

export default MongoManager;
