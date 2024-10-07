function isValidDataUser(req, res, next) {
    try {
      const { name, surname, mail, password, photo } = req.body;
      if (!username|| !mail|| !password|| !photo) {
        const error = new Error("userame,mail, password, photoare required");
        error.statusCode = 400;
        throw error;
      } else {
        return next();
      }
    } catch (error) {
      throw error;
    }
  }
   
  export default isValidDataUser