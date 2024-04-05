const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
       type: String,
       required: true 
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };

