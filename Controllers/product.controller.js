const { Product } = require("../Models/product.model");

const ProductController = {
    async createProduct(req, res){
        try{
            const {title, description, price, category, image} = req.body;
            const owner = req.user.userID;

            const product = new Product({title, description, price, category, image, owner});
            await product.save();
            res.status(201).json(product);
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    },
    async getAllProducts(req, res){
        try{
            const {title, sortByPrice, category} = req.query;
            
            // initialized query object
            let query = {owner: req.user.userID};

            // get products based on query parameters
            if(title){
                // perform case-insensitive search by title
                query.title = { $regex: new RegExp(title, 'i') };
            }

            if(sortByPrice === 'asc'){
                // sort by price in ascending order
                query = {...query, $orderby: {price: 1}};
            }else if(sortByPrice === 'desc'){
                // sort by price in descending order
                query = { ...query, $orderby: {price: -1}};
            }

            if(category){
                // filter by category
                query.category = category;
            }

            // get products according to query parameters
            const products = await Product.find(query).populate('category');
            res.status(200).json(products);
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    },
    async getProductById(req, res){
        try{
            const productId = req.params.id;
            const product = await Product.findOne({_id:productId, owner: req.user.userID});

            if(!product){
                return res.status(404).json({
                    message: "Product not found!"
                });
            }

            res.status(200).json(product);
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    },
    async updateProduct(req, res){
        try{
            const productId = req.params.id;
            const {title, description, price, category, image} = req.body;

            const updatedProduct = await Product.findOneAndUpdate(
                {_id: productId, owner: req.user.userID},
                {title, description, price, category, image},
                {new:true}
            );

            if(!updatedProduct){
                return res.status(404).json({
                    message: 'Product not found!'
                });
            }

            res.status(200).json(product);
            

        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    },
    async deleteProduct(req, res){
        try{
            const productId = req.params.id;
            const deletedProduct = await Product.findOneAndDelete({_id: productId, owner: req.user.userID});
            if(!deletedProduct){
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.status(200).json({
                message: "Product deleted successfully!"
            });

        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
};

module.exports = {
    ProductController
}