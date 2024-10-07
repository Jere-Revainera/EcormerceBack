import usersManager from "../data/users.manager.js";

async function getAllUsers(req, res, next) {
  try {
    let { username } = req.query;
    let response;
    if (!username) {
      response = await usersManager.readAll();
    } else {
      response = await usersManager.readAll(username);
    }
    if (response.length > 0) {
      return res.status(200).json({ message: "User read", response });
    } else {
      const error = new Error("Not found user");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    if (response) {
      return res.status(200).json({ message: "User read", response });
    } else {
      const error = new Error("Not found user");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { username, mail, password, photo,role  } = req.body;
  const userRoler = role || 0 ;

    const response = await usersManager.create({
      username,
      mail,
      password,
      photo,
      role :userRoler,
    });
    return res.status(201).json({ message: "User created", response });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const responseManager = await usersManager.update(uid, newData);
    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: "User updated", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);
    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: "User deleted", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function showUsers(req, res, next) {
  try {
    let { username } = req.query;
    let all;
    if (username) {
      all = await usersManager.readAll();
    } else {
      all = await usersManager.readAll(username);
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

async function showOneUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
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

export{
  createUser,
  getUsers,
  getAllUsers,
  deleteUser,
  updateUser,
  showOneUser,
  showUsers,
};