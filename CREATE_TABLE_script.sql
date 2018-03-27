
# Create database
CREATE DATABASE IF NOT EXISTS OracleCloudDBTest;

# Switch to this database
use OracleCloudDBTest;


# Create schema

CREATE TABLE IF NOT EXISTS `login_details` (
  `login_id` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `book_records` (
  `bookID` int(11) NOT NULL AUTO_INCREMENT,
  `bookName` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `author` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `isbn` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `discountApplicable` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `discountRate` int(11) DEFAULT NULL,
  `couponcode` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `category` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `category1` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `language` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `format` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `bookSoldCount` int(11) DEFAULT NULL,
  `category2` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `condition` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `sellerID` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `source` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookID`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;


CREATE TABLE IF NOT EXISTS `buyer_records` (
  `buyerID` int(11) NOT NULL AUTO_INCREMENT,
  `buyerFirstName` varchar(45) DEFAULT NULL,
  `buyerLastName` varchar(45) DEFAULT NULL,
  `buyerEmail` varchar(45) NOT NULL,
  `buyerAddress1` varchar(45) DEFAULT NULL,
  `buyerAddress2` varchar(45) DEFAULT NULL,
  `buyerCity` varchar(45) DEFAULT NULL,
  `buyerPostcode` varchar(45) DEFAULT NULL,
  `buyerPassword` varchar(200) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `buyerPhoneNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`buyerEmail`),
  UNIQUE KEY `buyerID_UNIQUE` (`buyerID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `reviews` (
  `reviewID` int(11) NOT NULL AUTO_INCREMENT,
  `buyerEmail` varchar(45) DEFAULT NULL,
  `productReview` varchar(45) DEFAULT NULL,
  `isbn` varchar(45) DEFAULT NULL,
  `productRating` int(11) DEFAULT NULL,
  `productName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reviewID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `seller_records` (
  `sellerID` int(11) NOT NULL AUTO_INCREMENT,
  `sellerFirstName` varchar(45) DEFAULT NULL,
  `sellerLastName` varchar(45) DEFAULT NULL,
  `sellerEmail` varchar(45) NOT NULL,
  `sellerCardNum` varchar(45) DEFAULT NULL,
  `sellerCardCVV` varchar(45) DEFAULT NULL,
  `sellerCardExp` varchar(45) DEFAULT NULL,
  `sellerAddress1` varchar(45) DEFAULT NULL,
  `sellerAddress2` varchar(45) DEFAULT NULL,
  `sellerCity` varchar(45) DEFAULT NULL,
  `sellerPostcode` varchar(45) DEFAULT NULL,
  `sellerPassword` varchar(200) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `sellerPhoneNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sellerEmail`),
  UNIQUE KEY `sellerID_UNIQUE` (`sellerID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
