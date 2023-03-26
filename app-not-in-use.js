const express = require('express');
const app = express();
//const mongoose = require('mongoose');
//const dotenv = require('dotenv')
const routesUrls = require('./routes/routes');
const scoreme = require('./routes/scoreme');
const allcloud = require('./routes/allcloud');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

// database connection 
// dotenv encryption and error handling  ===> rakesh 
require('dotenv').config();

const mongoose = require('mongoose');
//database_uri = "mongodb+srv://mahendra:1fzcgBjjwGLSm6ZW@cluster0.qn2ou0y.mongodb.net/mytable?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});


app.use(express.json())
app.use(cors())
app.use('/api',routesUrls);

app.listen(4000,()=>console.log("server is up and running"));