import cartsMongoManager from "../manager/carts.mongo.js";

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await cartsMongoManager.create(data);
    return res.status(201).json({
      message: "Cart CREATED",
      response: response._id,
    });
  } catch (error) {
    return next(error);
  }
};
const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const response = await cartsMongoManager.readAll(filter);
    if (response.length > 0) {
      return res.status(200).json({ message: "Carts read", response });
    } else {
      const error = new Error("CartS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const read = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await cartsMongoManager.read(cid);
    if (response) {
      return res.status(200).json({ message: "Cart read", response });
    } else {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const data = req.body;
    const response = await cartsMongoManager.update(cid, data);
    if (response) {
      return res.status(200).json({ message: "Cart update", response });
    } else {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await cartsMongoManager.destroy(cid);
    if (response) {
      return res.status(200).json({ message: "Cart deleted", response });
    } else {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
const calculateTotal = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await cartsMongoManager.calculateTotal(uid);
    return res.status(200).json({ response });
  } catch (error) {
    return next(error);
  }
};

export { create, readAll, read, update, destroy, calculateTotal };
