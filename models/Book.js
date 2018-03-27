//This Model interfaces with the table book_records in the RateMe database
//maintaining the records of books and allowing user to add, modify , fetch book records
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initializing the ORM to connect to the database
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{    
    define:
    {
      timestamps: true // true by default
    }
  });

//creating object of book_records which will be used to map to database

var bookrecords = sequelize.define('book_records', {
  bookId: {
      type: Sequelize.INTEGER,
      field: 'bookID',
      primaryKey: true
    },
  bookName: {
      type: Sequelize.STRING,
      field: 'bookName'
    },
    author:{
      type: Sequelize.STRING,
      field: 'author'
    },
    isbn:{
      type: Sequelize.STRING,
      field: 'isbn'
    },
    price:{
      type: Sequelize.INTEGER,
      field: 'price'
    },
    quantity:{
      type: Sequelize.INTEGER,
      field: 'quantity'
    },
    source: {
        type: Sequelize.STRING,
        field: 'source'
    },
    discountApplicable:{
      type: Sequelize.STRING,
      field: 'discountApplicable'
    },
    discountRate:{
      type: Sequelize.INTEGER,
      field: 'discountRate'
    },
    couponCode:{
      type: Sequelize.STRING,
      field: 'couponCode'
    },
    description:{
        type: Sequelize.STRING,
        field: 'description'
    },
    sellerID:{
      type: Sequelize.STRING,
      field: 'sellerID'
    },
    category:{
      type: Sequelize.STRING,
      field: 'category'
    },
    category1:{
        type: Sequelize.STRING,
        field: 'category1'
    },
    category2:{
        type: Sequelize.STRING,
        field: 'category2'
    },
    language:{
        type: Sequelize.STRING,
        field: 'language'
    },
    format:{
        type: Sequelize.STRING,
        field: 'format'
    },
    condition:{
        type: Sequelize.STRING,
        field: 'condition'
    },
    rating:{
        type: Sequelize.INTEGER,
        field: 'rating'
    },
    bookSoldCount:{
        type: Sequelize.INTEGER,
        field: 'bookSoldCount'
    }
});

//Added by Nikitha for Inventory Management to add new book records
exports.addBookRecords = (req, res) => {
   sequelize.sync().then(function() {
    return bookrecords.create({

      bookName: req.session.imBookName,
      author: req.session.imAuthor,
      description:req.session.imDescription,
      quantity:req.session.imQuantity,
      isbn:req.session.imisbn,
      price:req.session.imPrice,
      category:req.session.imCategory,
      discountApplicable:req.session.imDiscountApplicable,
      discountRate:req.session.imDiscountRate,
      couponCode:req.session.imCouponCode,
      category1:req.session.imCategory1,
      category2:req.session.imCategory2,
      language:req.session.imLanguage,
      condition:req.session.imCondition,
      format:req.session.imFormat,
      sellerID:req.session.sellerID,
      source:req.session.imSource

    });
  }).then(function () {
    //sending success page on successful insertion of new book details
    res.sendFile(path.join(__dirname + '/../views'+'/InventoryBookAddedConfirmPage.html'));
  });
};

//Added by Nikitha for Inventory Management to fetch books on user selecting a bookId
exports.findBookRecords = (req, res) => {

  bookrecords.findById(req.session.bookId).then(function(result) {
    // following parses the result fetches and sends the data in json format
    var bookDetails = {
      name:result.bookName,
      author:result.author,
      description:result.description,
      quantity:result.quantity,
      category:result.category,
      isbn:result.isbn,
      price:result.price,
      discountApplicable:result.discountApplicable,
      discountRate:result.discountRate,
      couponCode:result.couponCode,
      category1:result.category1,
      condition:result.condition,
      category2:result.category2,
      language:result.language,
      format:result.format

    };

    res.json(bookDetails);

  });
}

// Added By Nikitha to update a book record which is modified by the user
exports.modifyBookRecords = (req, res) => {

// updates the book records with new details entered by the user.
  bookrecords.update({
    bookName: req.body.name,
    author: req.body.author,
    description:req.body.description,
    category:req.body.category,
    quantity:req.body.quantity,
    isbn:req.body.isbn,
    price:req.body.price,
    discountApplicable:req.body.discountApplicable,
    discountRate:req.body.discountRate,
    couponCode:req.body.couponCode,
    category1:req.body.category1,
    category2:req.body.category2,
    language:req.body.language,
    condition:req.body.condition,
    format:req.body.format
  },
  {
    where:
    {
      bookID : req.session.bookId
    }
  }).then(function() {
    // sends success page to the user
    res.sendFile(path.join(__dirname + '/../views'+'/InventoryBookModifiedConfirmPage.html'));
  })
};

// Added By Nikitha to find all book record for a given sellerID
exports.findAllBookRecords = (req, res) => {  
    bookrecords.findAll(
    {
        where: {
            sellerID :   req.session.sellerID
        }
    }).then(function(result) {
    // sends the result containing the database records in json format    
    res.json(result);
  });
 };

//Added By Nikitha for Deleting a book record
exports.deleteBookRecords= (req, res) => {
  //var check =   JSON.parse(req.body);
  bookrecords.destroy({
    where: {
          bookId : req.session.bookId
    }
  }).then(function(result) {
    // sends success status
    res.sendStatus(200);
  });

  };

  exports.findNewProducts = (req, res) => {
  bookrecords.findAll(
    {
      where:
      {
        createdAt:
         {
           $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
         }
      }
    })
    .then(function(result)
    {
      var x  =result;
      res.json(x);
    });
  };

  exports.findNewOffers = (req, res) => {
  bookrecords.findAll(
    {
      where:
      {
        discountRate:
         {
           $gte: 30
         }
      }
    })
    .then(function(result)
    {
      var x  =result;
      res.json(x);
    });
  };

//module.exports=Book;

//View Books according to user requirement
//Pre-conditions   --> Takes filter and category inputs by the user on the home page
//Post-conditions  --> Returns the Books according to user request

exports.books_data = (req, res) => {
    console.log(req.body);
    
    if(req.body.format == 'null')
        d_format = ["","Paperback","Hardcover","Kindle Edition","Large Print","Audible Audio Edition","Printed Access Code","Digital Access Code","Loose Leaf","Audio CD","Board Book","null"];
    else
        d_format = [req.body.format];
    if(req.body.language == 'null')
        d_language = ["","English","German","French","Spanish","Italian","Arabic","Urdu","Russian","Hindi","Japanese","null"];
    else
        d_language = [req.body.language];
    if(req.body.condition == 'null')
        d_condition = ["","New","Used","Collectible","null"];
    else
        d_condition = [req.body.condition];
    
    d_pricemin = req.body.pricemin;
    d_pricemax = req.body.pricemax;
    
    if(req.body.rating == 'null')
        d_rating = 0;
    else
        d_rating = req.body.rating;
    if(req.body.search == 'null' || req.body.search.toLowerCase() == '%book%' || req.body.search.toLowerCase() == '%books%')
        d_search = "%%";
    else
        d_search = req.body.search;
    if(req.body.books_category1 == 'null')
    {
        d_books_category1 = ["","null","GoodReads", "Knowledge", "Lifestyle"];
        d_books_category2 = ["","null","Children", "Comics", "Humor", "Mystery", "Romance", "ScienceFiction", "Teen", "Business", "Computers", "Education", "History", "Law", "Literature", "Medical", "Politics", "Reference", "Sciences", "Sports", "Arts", "Biographies", "Food", "Health", "LGBT", "Parenthood", "Philosophy", "Religion", "Travel"];
    }
    else
    {
        d_books_category1 = [req.body.books_category1];
        if(req.body.books_category1 == 'GoodReads')
        {
            if (req.body.books_category2 == 'null')
                d_books_category2 = ["","null","Children", "Comics", "Humor", "Mystery", "Romance", "ScienceFiction", "Teen"];
            else
                d_books_category2 = [req.body.books_category2];
        }
        else if(req.body.books_category1 == 'Knowledge')
        {
            if (req.body.books_category2 == 'null')
                d_books_category2 = ["","null","Business", "Computers", "Education", "History", "Law", "Literature", "Medical", "Politics", "Reference", "Sciences", "Sports"];
            else
                d_books_category2 = [req.body.books_category2];
        }
        else if(req.body.books_category1 == 'Lifestyle')
        {
            if (req.body.books_category2 == 'null')
                d_books_category2 = ["","null","Arts", "Biographies", "Food", "Health", "LGBT", "Parenthood", "Philosophy", "Religion", "Travel"];
            else
                d_books_category2 = [req.body.books_category2];
        }

    }
    
    if (req.body.tabDisplays == "tab-latest") {
        /*bookrecords.findAll().then(function (result)
        {
            console.log(result);
            res.json(result);
        });*/

        bookrecords.findAll({
            where: {
                format: {
                    $in: d_format
                },
                language: {
                    $in: d_language
                },
                condition: {
                    $in: d_condition
                },
                /*rating: {
                    $gte: d_rating
                },*/
                price: {
                    $gte: d_pricemin,
                    $lte: d_pricemax
                },
                $and: {
                    $or: {
                        bookName: {
                            $like: d_search
                        },
                        author: {
                            $like: d_search
                        },
                        description: {
                            $like: d_search
                        },
                        category: {
                            $like: d_search
                        },
                        category1: {
                            $like: d_search
                        },
                        format: {
                            $like: d_search
                        },
                        language: {
                            $like: d_search
                        },
                        condition: {
                            $like: d_search
                        }
                    },
                    category: {
                        $in: d_books_category1
                    },
                    category1: {
                        $in: d_books_category2
                    }
                }
            },
            order: [['createdAt', 'DESC']]
        }).then(function (result) {
            console.log(result);
            res.json(result);
        });
    }
    else if (req.body.tabDisplays == "tab-bestseller") {
        bookrecords.findAll({
            where: {
                format: {
                    $in: d_format
                },
                language: {
                    $in: d_language
                },
                condition: {
                    $in: d_condition
                },
                /*rating: {
                    $gte: d_rating
                },*/
                price: {
                    $gte: d_pricemin,
                    $lte: d_pricemax
                },
                $and: {
                    $or: {
                        bookName: {
                            $like: d_search
                        },
                        author: {
                            $like: d_search
                        },
                        description: {
                            $like: d_search
                        },
                        category: {
                            $like: d_search
                        },
                        category1: {
                            $like: d_search
                        },
                        format: {
                            $like: d_search
                        },
                        language: {
                            $like: d_search
                        },
                        condition: {
                            $like: d_search
                        }
                    },
                    category: {
                        $in: d_books_category1
                    },
                    category1: {
                        $in: d_books_category2
                    }
                }
            },
            order: [['bookSoldCount', 'DESC']]
        }).then(function (result) {
            //console.log(result);
            res.json(result);
        });
    }
    else if (req.body.tabDisplays == "tab-highestrated") {
        bookrecords.findAll({
            where: {
                format: {
                    $in: d_format
                },
                language: {
                    $in: d_language
                },
                condition: {
                    $in: d_condition
                },
                /*rating: {
                    $gte: d_rating
                },*/
                price: {
                    $gte: d_pricemin,
                    $lte: d_pricemax
                },
                $and: {
                    $or: {
                        bookName: {
                            $like: d_search
                        },
                        author: {
                            $like: d_search
                        },
                        description: {
                            $like: d_search
                        },
                        category: {
                            $like: d_search
                        },
                        category1: {
                            $like: d_search
                        },
                        format: {
                            $like: d_search
                        },
                        language: {
                            $like: d_search
                        },
                        condition: {
                            $like: d_search
                        }
                    },
                    category: {
                        $in: d_books_category1
                    },
                    category1: {
                        $in: d_books_category2
                    }
                }
            },
            order: [['rating', 'DESC']]
        }).then(function (result) {
            //console.log(result);
            res.json(result);
        });
    }
    else if (req.body.tabDisplays == "tab-under10") {
        bookrecords.findAll({
            where: {
                format: {
                    $in: d_format
                },
                language: {
                    $in: d_language
                },
                condition: {
                    $in: d_condition
                },
                /*rating: {
                    $gte: d_rating
                },*/
                price: {
                    $lte: 10
                },
                $and: {
                    $or: {
                        bookName: {
                            $like: d_search
                        },
                        author: {
                            $like: d_search
                        },
                        description: {
                            $like: d_search
                        },
                        category: {
                            $like: d_search
                        },
                        category1: {
                            $like: d_search
                        },
                        format: {
                            $like: d_search
                        },
                        language: {
                            $like: d_search
                        },
                        condition: {
                            $like: d_search
                        }
                    },
                    category: {
                        $in: d_books_category1
                    },
                    category1: {
                        $in: d_books_category2
                    }
                }
            },
        }).then(function (result) {
            console.log(result.length);
            res.json(result);
        });
    }
}


exports.bookInfo = (req, res) => {
    bookrecords.findAll({
        where: {
            $and: {
                isbn: {
                $like: req.body.isbn
                },
                sellerID: {
                $like: req.body.sellerID
                }
            }
        }
    }).then(function (result) {
        res.json(result);
    });

}
