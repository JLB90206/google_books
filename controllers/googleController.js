//this requires and obtains axios which is a package that simplifies hitting api's.
const axios = require("axios");
//obtaining our models database
const db = require("../models")
//hitting the google api defining our own findAll method.
module.exports = {
  findAll: function(req, res) {
    // deconstructs our request parameter so that it comes back as an object.  
    const { query: params } = req;
    //sends our query to google to return result.volumeInfo and puts it in form of json.
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
//filters our json response to only the fields we need in a new array. 
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      //searches a book in our database for an ID that only matches the right books and wont display the wrong ones. 
      .then(apiBooks =>
        db.Book.find().then(dbBooks =>
          apiBooks.filter(apiBook =>
            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
          )
        )
      )
// after we get results from google and filter them.. if any are in our database already we send those to our front end. 
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
};
