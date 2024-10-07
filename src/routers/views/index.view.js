import { Router } from "express";
import productsViewRouter from "./products.view.js";
import userViewsRouter from "./user.view.js";



const viewsRouter = Router()

viewsRouter.use("/products", productsViewRouter);
viewsRouter.get("/", (req, res, next)=>{
    try {
       return res.render("index")
    } catch (error) {
        return next(error)
    }
})
viewsRouter.get("/admin", (req, res, next)=>{
    try {
        return res.render("admin")
    } catch (error) {
       return next(error) 
    }
})

viewsRouter.use("/users", userViewsRouter)
viewsRouter.get("/register", (req, res, next)=>{
    try {
        return res.render("register")
    } catch (error) {
        return next(error)
    }
})
viewsRouter.get("/login", (req,res, next)=>{
    try {
        return res.render("login")
    } catch (error) {
        return next (error)
    }
})

export default viewsRouter