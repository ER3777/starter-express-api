const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const Sentry = require("@sentry/node");
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

// Write logs to a file instead of the console
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// app.use((req, res, next) => {
//   const auditLog = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
//   fs.appendFile('audit.log', auditLog, (err) => {
//     if (err) console.error(err);
//   });
//   next();
// });

Sentry.init({
  dsn: "https://4157e0a5a9f04d26a85f824996dab4b4@o4504934737575936.ingest.sentry.io/4504934757236736",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "development",
  name: "Preksha Version 1",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('/api',routesUrls);
app.use('/api/scoreme/',scoreme);
app.use('/api/cloud/',allcloud);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

const start = async () => {
  try {
    app.listen(4000, () => console.log("Server started on port 4000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();