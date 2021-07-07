// Packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const helmet = require("helmet");
// const morgan = require('morgan');
const dotenv = require("dotenv");
const userRoute = require('./router/api/users')
// const authRoute = require("./routes/auth")
// const postRoute = require("./routes/posts")




// Import methods


// Config dotev
  dotenv.config()

// Database Connection

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
  console.log('connect to mongoDB');
});


// const db = require("./mongos/connection")
// db.on('error', console.error.bind(console, 'MongoDB connection error'))
// db.once('open', function(){
//   console.log('MongoDB connected sucessfully..');
// })

// view engine setup


// Middlewares
  app.use(express.json())
  // app.use(helmet())
  // app.use(morgan("common"))


// Use Routes
  app.use("/api/users", userRoute)
  // app.use("/api/auth", authRoute)
  // app.use("/api/posts", postRoute)



//app.use("/api/auth-owner", require("./routes/auth-owner"));



// Error handling middleware
// app.use(function(err, req, res, next) {
//   return res.status(500).json({
//     error: errorHandler(err) || "Something went wrong!"
//   });
// });

// body parser


// asstes path setup


// use cors



//port setup
const PORT = process.env.PORT || 6000
app.listen(PORT, () =>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});