require("dotenv").config();
const express = require('express');
const { connection } = require("./Configs/db");
const cors = require('cors');
const { userRoute } = require("./Routes/user.routes");
const { categoryRouter } = require("./Routes/category.routes");
const { ProductRouter } = require("./Routes/product.routes");

const PORT = process.env.PORT;

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// All routes
app.use('/auth', userRoute);
app.use('/category', categoryRouter);
app.use('/product', ProductRouter);


app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db");
    }catch(err){
        console.log(err);
    }
    console.log(`server started on http://localhost:${PORT}`)

});


// module.exports = app;