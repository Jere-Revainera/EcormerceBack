import userMongoManager from "../manager/user.mongo.js";
import User from "../models/user.model.js";

async function create(req, res, next) {
  try {
    const data = req.body;
    const response = await userMongoManager.create(data);
    return res
      .status(201)
      .json({ message: "User created", response: response._id });
  } catch (error) {
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const response = await userMongoManager.readAll();
    return res.status(200).json({ message: "Users read", response });
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await userMongoManager.read(pid);
    return res.status(200).json({ message: "User read", response });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await userMongoManager.update(pid, data);
    return res.status(200).json({ message: "User update", response });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await userMongoManager.destroy(pid);
    if (response) {return res.status(200).json({ message: "User deleted", response });
} else {
    const error= new Error ("User not found")
    error.statusCode(404)
    throw error
}
  } catch (error) {
    return next(error);
  }
}

async function show(req, res, next) {
  try {
    let { mail } = req.query;
    let all;
    if (mail) {
      all = await userMongoManager.readAll();
    } else {
      all = await userMongoManager.readAll(mail);
    }
    if (all.length > 0) {
      return res.render("users", { users: all });
    } else {
      const error = new Error("Not found users");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function showOne(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await userMongoManager.read(uid);
    if (response) {
      return res.render("oneuser", { one: response });
    } else {
      const error = new Error("Not found user");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export  {create, destroy, update, read, readAll, show, showOne}