//The const's establish requirements for the app to run and assigns a variable to the packages we need.
//app.use brings in our custom designed routes for our server and creates an instance of express.

const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
// const port assigns port to 3001 for app to run in. 
const PORT = process.env.PORT || 3001;

//sets up middleware to parse json and pull into mongodb

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//in the production environment this sets up our front end. 
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//using our custom routes above 
app.use(routes);

//connecting to mongoose and setting up db/models for collections. 
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);
//the listener and also the text to appears in your terminal. 
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
