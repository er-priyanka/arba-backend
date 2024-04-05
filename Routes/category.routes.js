const express = require("express");
const { authenticate } = require("../Middlewares/authenticate");
const { CategoryController } = require("../Controllers/category.controller");
const categoryRouter = express.Router();

// create new category
categoryRouter.post("/", authenticate, CategoryController.createCategory);

// get all categories
categoryRouter.get("/", authenticate, CategoryController.getAllCategories);

// get single category by id
categoryRouter.get("/:id", authenticate, CategoryController.getCategoryById);

// update category by id
categoryRouter.patch("/:id", authenticate, CategoryController.updateCategory);

//  delete category by id
categoryRouter.delete("/:id", authenticate, CategoryController.deleteCategory);


module.exports = {
    categoryRouter
};
