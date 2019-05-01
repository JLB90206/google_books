
//require router from express
const router = require("express").Router();
//requires our custom built controller that hits google's api to retreve data. 
const googleController = require("../../controllers/googleController");
//sets route too home and does a google find all query to google's api. 
router
  .route("/")
  .get(googleController.findAll);
//exporting express.router to be reused at will. 
module.exports = router;
