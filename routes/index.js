//again with const's they define what is required for our app and defines which packages will be downloaded. 

const path = require("path");
const router = require("express").Router();
//pulls all of our routes defined for our api 
const apiRoutes = require("./api");

//this sets all of our routes to have the -api at the beginning. 
router.use("/api", apiRoutes);


//this joins the directory with the path. 
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);
//exports router to server.js
module.exports = router;
