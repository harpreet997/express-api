const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
require('dotenv').config();
const products = require('./routes/product');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productRoute = require('./routes/productroute');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}



app.use('/api/products', products)
app.use('/products', productRoute)
app.use(errorHandlerMiddleware);

start();


