//Author Bhavik--- Controller for Inventory Management Activities
var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var fileUpload = require('express-fileupload');

// Declaring instances of models
var Book  = require('../models/Book.js');

// This function stores the book details entered by the seller when adding new book, in the session.
//Pre-conditions-request with data from seller when adding book detais
//Post-conditions send success status on previous storing
exports.postBook = (req, res) => {

  req.session.imBookName= req.body.name,
  req.session.imAuthor= req.body.author,
  req.session.imDescription=req.body.description,
  req.session.imQuantity=req.body.quantity,
  req.session.imisbn=req.body.isbn,
  req.session.imPrice=req.body.price,
  req.session.imCategory=req.body.category,
  req.session.imDiscountApplicable=req.body.discountApplicable,
  req.session.imDiscountRate=req.body.discountRate,
  req.session.imCouponCode=req.body.couponCode,
  req.session.imCategory1=req.body.category1,
  req.session.imCategory2=req.body.category2,
  req.session.imLanguage=req.body.language,
  req.session.imCondition=req.body.condition,
  req.session.imFormat=req.body.format

  res.sendStatus(200);// sending response to user on setting data in session. Data will be inserted to database when seller uploads image.

}// end of postBook function

app.use(fileUpload());

// This function  uploads the image to folder product images and calls the model method to insert new book details stored in session to database.
exports.uploadImage = (req, res) =>  {
  var sampleFile;

  if (!req.files) {
      res.send('No files were uploaded.');
      return;
  }

  sampleFile = req.files.sellerfile;
  // images are stored in with name isbn + seller id for each book
  sampleFile.mv(__dirname +'/../productImages/'+req.session.imisbn+'_'+req.session.sellerID+'.jpg', function(err) {
    if (err) {
      res.status(500).send(err);
    }


    {
      req.session.imSource= '/../productImages/'+req.session.imisbn+'_'+req.session.sellerID+'.jpg';
      // if the image is uploaded successfully the book details stored in the session will passed to database.
      Book.addBookRecords(req, res);
    }
  });


}//end of uploadImage function

//This function calls the model method to fetch book records selected by the user to modify book details
//Pre-conditions-request with data selected bookid
//Post-conditions proceed to model
exports.getBook = (req, res) => {
  Book.findBookRecords(req, res);
}


// This function calls the model method to fetch all book records
//Pre-conditions request for sellerid stored in session
//Post-conditions //Post-conditions proceed to model
exports.getAllBooks = (req, res) => {
  Book.findAllBookRecords(req, res);
}

// This function calls the model method to update existing book record when seller modifies the book details
exports.editBook = (req, res) => {
  Book.modifyBookRecords(req, res);
}


// this function sends the modify form page when user clicks on modify book record
exports.getEditBookPage = (req, res) => {


  res.sendFile(path.join(__dirname + '/../views'+'/InventoryModifyBooks.html'));

};

// this function sends the add form page when user clicks on add book record
exports.getAddBookPage = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/InventoryAddBooks.html'));

};

exports.setBookIdSession = (req, res) => {
    console.log(req.body.bookId);
  req.session.bookId= req.body.bookId;
  res.sendStatus(200);
  };

// this function sends the form page where user can upload product image

exports.getBookAddSuccessPage = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/InventoryAddBookAddImage.html'));

};


exports.fetchBookDetailsForBookId=( Book.findBookRecords);

//This functions send the confirmation page when the book details have been successfully modified
exports.getBookkEditSuccessPage = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/InventoryBookModifiedConfirmPage.html'));
};

// This function calls the  model function to delete database record
exports.deleteBookRecords = (req, res) => {
  req.session.bookId= req.body.bookId;
  Book.deleteBookRecords(req, res) ;
};