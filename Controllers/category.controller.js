const {Category} = require("../Models/category.model");

const CategoryController = {
    async createCategory(req, res) {
        // create new category
        try{
            const {name, slug, image} = req.body;
            const owner = req.user.userID;

            const category = new Category({name, slug, image, owner});
            await category.save();
            res.status(201).json({
                message: "new category added",
                category
            });

        }catch(err){
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        }
    },
    async getAllCategories(req, res){
        // get all categories

        try{
            const query = req.query.name;
            let categories;

            if(query){
                // if 'name' query parameter provided, perform case-insensitive search
                categories = await Category.find({owner: req.user.userID, name: { $regex: new RegExp(query, 'i')}});
            }else{
                // by default, get all categories created by owner
                categories = await Category.find({owner: req.user.userID});
            }

            res.status(200).json(categories);
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    },
    async getCategoryById(req, res){
        // get category by id

        try{
            const categoryId = req.params.id;
            const category = await Category.findOne({_id:categoryId, owner: req.user.userID});

            if(!category){
                return res.status(404).json({
                    message: "Category not found!"
                });
            }

            res.status(200).json(category);
        }catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    },
    async updateCategory(req, res) {
        // update category
        try{
            const categoryId = req.params.id;
            const {name, slug, image} = req.body;
            const updatedCategory = await Category.findOneAndUpdate(
                {_id:categoryId, owner:req.user.userID}, 
                {name, slug, image}, 
                { new: true }
                );

            if(!updatedCategory){
                return res.status(404).json({
                    message: "Category not found!"
                });
            }

            res.status(200).json(updatedCategory);

        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    },
    async deleteCategory(req, res){
        // delete category 

        try{
            const categoryId = req.params.id;
            const deletedCategory = await Category.findOneAndDelete({_id:categoryId, owner: req.user.userID});

            if(!deletedCategory){
                return res.status(404).json({
                    message:"Category not found!"
                });
            }

            res.status(200).json({
                message: "Category deleted successfully!"
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = { CategoryController };