//requires express router
const router = require("express").Router();
//pulls in our API bookcontroller and sets our CRUD routes
const bookController = require("../../controllers/bookController");
//consults our home route gets our books from mongo and the .post route posts them to the page
router.route("/")
  .get(bookController.findAll)
  .post(bookController.create);
//this grabs our ID paramerter of our route and gets a book by ID and then .get finds a book by ID and .put updates a book by id .delete removes a book by ID.
router
  .route("/:id")
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.remove);
//exports our defined routes to our router
module.exports = router;
