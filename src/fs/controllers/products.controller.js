import productsManager from "../data/products.manager.js";

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }
    if (response.length > 0) {
      return res.status(200).json({ message: "Products read", response });
    } else {
      const error = new Error("Not found products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    if (response) {
      return res.status(200).json({ message: "Product read", response });
    } else {
      const error = new Error("Not found product");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const { title, price, stock, photo, category, supplier } = req.body;
    const productSupplier = supplier || "none";
    const productCategory = category || "none";

    const response = await productsManager.create({
      title,
      price,
      stock,
      photo,
      category: productCategory,
      supplier: productSupplier,
    });
    return res.status(201).json({ message: "Product created", response });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const responseManager = await productsManager.update(pid, newData);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: "Product updated", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const responseManager = await productsManager.delete(pid);
    if (!responseManager) {
      const error = new Error(`Product with id ${pid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: "Product deleted", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function showProducts(req, res, next) {
  try {
    let { category } = req.query;
    let all;
    if (!category) {
      all = await productsManager.readAll();
    } else {
      all = await productsManager.readAll(category);
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

async function showOneProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.read(pid);
    if (response) {
      return res.render("oneproduct", { one: response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  showOneProduct,
  showProducts,
};
