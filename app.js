//File to connect database,server and all third party API integrations


var express = require('express');
var app = express();
var path = require('path');


//Body Parser to  be written here in the app1.js file
//No need to include body-parser in controller and model file
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//Variable declarations to access Controller files
var inventoryManagementController= require('./controllers/InventoryManagement');
var dashboardController= require('./controllers/Dashboard');
var sellerDashboardController= require('./controllers/SellerDashboard');
var inventoryManagementController= require('./controllers/InventoryManagement');
var homeController = require ('./controllers/home');
var all_productController = require ('./controllers/all_product');

var productReviewController = require('./controllers/SubmitReview');
var loginController = require('./controllers/Login');
var registerBuyerController = require('./controllers/Registersuccessbuyer');
var registerSellerController = require('./controllers/Registersuccessseller');
var resetPassword = require('./controllers/Resetpassword');


//Variable declaration to use file upload API
var fileUpload = require('express-fileupload');
app.use(fileUpload());


//To use sessions in the website
app.use(express.static(__dirname));
var session = require('client-sessions');
app.use(session
  ({
      cookieName: 'session',
      secret: 'random_string_goes_here',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,
  }));


// To Route user to index.html Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to index.html Page
app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});


// To Route user to MyDashboard.html Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to MyDashboard.html Page
app.get('/MyDashboard', function(req, res)
{
    res.sendFile(path.join(__dirname + '/views/MyDashboard.html'));
});


// To Route user to SellerDashboard.html Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to SellerDashboard.html Page
app.get('/SellerDashboard', function(req, res)
{
    res.sendFile(path.join(__dirname + '/views/SellerDashboard.html'));
});


// To Route user to AdminDashboard.html Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to AdminDashboard.html Page
app.get('/AdminDashboard', function(req, res)
{
    res.sendFile(path.join(__dirname + '/views/AdminDashboard.html'));
});

// To Route user to Register/Login Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to Register/Login Page

app.get('/login',homeController.login);

// To Route user to Buyer Dashboard Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to Buyer Dashboard Page

app.get('/MyDashboard',homeController.dashboard);

// To Route user to Product Information Page
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to the product information

app.get('/product',homeController.product);




//-----------------------START OF BUYER DASHBOARD----------------------------//

// To Route user to reviewRating function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to reviewRating function of Buyer Dashboard controller
app.get('/ReviewRating', dashboardController.reviewRating);

// To Route user to personalInformation function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to personalInformation function of Buyer Dashboard controller
app.get('/PersonalInformation', dashboardController.personalInformation);

// To Route user to getbuyerProfile function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getbuyerProfile function of Buyer Dashboard controller
app.post('/buyerProfile',dashboardController.getbuyerProfile);

// To Route user to updateBuyer function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to updateBuyer function of Buyer Dashboard controller
app.put('/updatebuyer',dashboardController.updateBuyer);

// To Route user to getAllReviews function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getAllReviews function of Buyer Dashboard controller
app.post('/reviewlist',dashboardController.getAllReviews);

// To Route user to setBuyerIdSession function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to setBuyerIdSession function of Buyer Dashboard controller
app.post('/setbuyerid',dashboardController.setBuyerIdSession);

// To Route user to getTopRated function of Buyer Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getTopRated function of Buyer Dashboard controller
app.post('/getTopRated', dashboardController.getTopRated);


//-----------------------END OF BUYER DASHBOARD----------------------------//



//-----------------------START OF SELLER DASHBOARD----------------------------//


// To Route user to addBook function of Seller Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getBook function of Seller Dashboard controll
app.get('/AddBook', sellerDashboardController.addBook);

app.get('/SellerProfile',sellerDashboardController.sellerProfile);

// To Route user to getsellerProfile function of Seller Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getsellerProfile function of Seller Dashboard controller
app.post('/sellerProfile',sellerDashboardController.getsellerProfile);

// To Route user to updateSeller function of Seller Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to updateSeller function of Seller Dashboard controller
app.put('/updateseller',sellerDashboardController.updateSeller);

// To Route user to getnewProducts function of Seller Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getnewProducts function of Seller Dashboard controller
app.post('/getnewProducts', sellerDashboardController.getnewProducts);

// To Route user to getNewOffers function of Seller Dashboard controller
//Pre-conditions   --> Takes input request from the user clicks (browser)
//Post-conditions  --> Routes the user to getNewOffers function of Seller Dashboard controller
app.post('/getNewOffers', sellerDashboardController.getNewOffers);


//-----------------------END OF SELLER DASHBOARD----------------------------//


//call to page to fetch books in inventory of the seller
app.get('/managebooks', function(req, res) {
                        //req.session.emailID=  'nikithauc@gmail.com';
 req.session.sellerID=  req.session.emailID;
//  req.session.sdOrderId='51';

    res.sendFile(path.join(__dirname + '/views/ManageBooks.html'));

});


// call to page to enter new book records

app.get('/addbookpage', inventoryManagementController.getAddBookPage);


//login and payment 'gets'
app.get('/Register', loginController.register);
app.get('/RegisterSeller', loginController.registerSeller);
app.get('/ForgotPassword', loginController.forgotPassword);
app.get('/product', loginController.getProductPage);
app.get('/UserLogout', loginController.confirmLogout);
app.get('/index',homeController.homepage);
app.get('/ResetPasswordPage', resetPassword.gotoReset);
///////////////////


//login and payment post's
app.post('/UserLogin', loginController.confirmLogin);
app.post('/Registersuccessbuyer', registerBuyerController.confirmRegistrationbuyer);
app.post('/Registersuccessseller', registerSellerController.confirmsellerRegistration);
app.post('/Reset', resetPassword.confirmPasswordreset);
app.post('/CheckPassword', resetPassword.resetPasswordCheck);
//////////////


app.post('/SubmitReview', productReviewController.submitReview);
app.post('/bookReview',productReviewController.getReview);
app.get('/checkuserlogin', loginController.checkuserlogin);
//////////////////


// inserts book to daddclassnotespageatabase
app.post('/book', inventoryManagementController.postBook);

// fetches list if all books for a given seller id
app.post('/sellerbooklist',inventoryManagementController.getAllBooks);

// fetches book record for selected book id to be modified by seller
app.post('/getbookforid', inventoryManagementController.getBook);

//call to update book with modified details for a given id
app.put('/modifybook',inventoryManagementController.editBook);

//app.get('/editbook/:id',inventoryManagementController.getEditBookPage );

//call to get modify book form page
app.get('/editbook',inventoryManagementController.getEditBookPage);

// setting selected book id in session
app.post('/setbookid',inventoryManagementController.setBookIdSession);

//call to get the confirmation /succcess pages
app.get('/editbooksuccess',inventoryManagementController.getBookkEditSuccessPage );
app.get('/addbookimage',inventoryManagementController.getBookAddSuccessPage );
app.post('/addbooksuccess',inventoryManagementController.uploadImage);

// call to delete selected book id
app.delete('/deletebook',inventoryManagementController.deleteBookRecords);

// fetches required books from the database
app.post('/books_data',all_productController.booksData);

// fetches required books for PRODUCT.html from the database
app.post('/bookInfo',all_productController.bookInfo);

var port = process.env.PORT || 8080;
console.log('Starting server...');
app.listen(port,function(){
  console.log('App running on ' + port);
});


app.get('/faq', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/FFSFaq.html'));
});


//add for product html
app.post('/bookInfo',all_productController.bookInfo);
