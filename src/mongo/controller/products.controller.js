import productMongoManager from "../manager/product.mongo.js";

async function create(req, res, next) {
  try {
    const data = req.body;
    const response = await productMongoManager.create(data);
    return res
      .status(201)
      .json({ message: "Product created", response: response._id });
  } catch (error) {
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const response = await productMongoManager.readAll();
    return res.status(200).json({ message: "Products read", response });
  } catch (error) {
    return next(error);
  }
}

const paginate = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const response = await productsMongoManager.paginate({}, { page, limit })  
    if (response.docs.length > 0) {
      return res.status(200).json({
        message: "PRODUCTS READ",
        response: response.docs,
        prevPage: response.prevPage,
        hasPrevPage: response.hasPrevPage,
        nextPage: response.nextPage,
        hasNextPage: response.hasNextPage
      });
    } else {
      const error = new Error("PRODUCTS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error)
  }
}

async function read(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productMongoManager.read(pid);
    return res.status(200).json({ message: "Product read", response });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await productMongoManager.update(pid, data);
    return res.status(200).json({ message: "Product update", response });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productMongoManager.destroy(pid);
    if (response) {return res.status(200).json({ message: "Product deleted", response });
} else {
    const error= new Error ("Product not found")
    error.statusCode(404)
    throw error
}
  } catch (error) {
    return next(error);
  }
}

async function show(req, res, next) {
  try {
    let { category } = req.query;
    let all;
    if (!category) {
      all = await productMongoManager.readAll();
    } else {
      all = await productMongoManager.readAll(category);
    }
    if (all.length > 0) {
      return res.render("products", { products: all });
    } else {
      const error = new Error("Not found products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function showOne(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productMongoManager.read(pid);
    if (response) {
      return res.render("oneproduct", { one: response });
    } else {
      const error = new Error("Not found prodcut");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export  {paginate, create, destroy, update, read, readAll, show, showOne}
