UNLOCK TABLES;
DROP DATABASE IF EXISTS dbms;
CREATE DATABASE dbms;
USE dbms;

-- Location Table
CREATE TABLE location (
  Location_Name VARCHAR(255) NOT NULL PRIMARY KEY,
  X_Coordinate FLOAT,
  Y_Coordinate FLOAT
);
-- Driver Table
CREATE TABLE driver (
  Driver_id INT AUTO_INCREMENT PRIMARY KEY,
  Age INT CHECK (Age >= 18),
  Name VARCHAR(255) NOT NULL,
  Earnings FLOAT DEFAULT 0 CHECK (Earnings >= 0),
  Phone_Number VARCHAR(255) NOT NULL,
  Email VARCHAR(255),
  Rating FLOAT DEFAULT 0,
  No_of_Trips INT DEFAULT 0,
  Current_Location VARCHAR(255),
  FOREIGN KEY (Current_Location) REFERENCES location (Location_Name)
);
-- Vehicle Table
CREATE TABLE vehicle (
  Type VARCHAR(255) NOT NULL,
  Model VARCHAR(255) NOT NULL,
  Driver_Id INT UNIQUE NOT NULL,
  Seats INT DEFAULT 4,
  Registration_number VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (Driver_Id, Registration_number),
  FOREIGN KEY (Driver_Id) REFERENCES driver (Driver_Id)
);

-- Customer Table
CREATE TABLE customer (
  Customer_id INT AUTO_INCREMENT PRIMARY KEY,
  Age INT CHECK (Age >= 10),
  Name VARCHAR(255) NOT NULL,
  Wallet FLOAT DEFAULT 0,
  Phone_Number VARCHAR(255) UNIQUE NOT NULL,
  Email_Address VARCHAR(255) UNIQUE,
  Rating FLOAT DEFAULT 0,
  No_of_Trips INT DEFAULT 0,
  Home_Location VARCHAR(255),
  FOREIGN KEY (Home_Location) REFERENCES location (Location_Name)
);



-- Coupons Table
CREATE TABLE coupons (
  Coupon_id INT AUTO_INCREMENT PRIMARY KEY,
  Customer_ID INT,
  Discount_percent FLOAT DEFAULT 10,
  Expiry_Date DATE,
  FOREIGN KEY (Customer_ID) REFERENCES customer (Customer_id)
);

-- Ride Table
CREATE TABLE ride (
  Ride_id INT AUTO_INCREMENT PRIMARY KEY,
  Distance FLOAT,
  Status VARCHAR(255) DEFAULT 'REQUESTED',
  Customer_Id INT NOT NULL,
  Driver_Id INT,
  Start_time TIME NOT NULL,
  End_time TIME NOT NULL,
  Date DATE NOT NULL,
  Cost FLOAT DEFAULT 0,
  Coupon_code VARCHAR(255),
  Payment_method VARCHAR(255) NOT NULL,
  Customer_rating FLOAT DEFAULT 0,
  Driver_rating FLOAT DEFAULT 0,
  OTP INT,
  SourceName VARCHAR(255) NOT NULL,
  DestinationName VARCHAR(255) NOT NULL,
  Vehicle_Type VARCHAR(255) NOT NULL,
  FOREIGN KEY (Customer_Id) REFERENCES customer (Customer_id),
  FOREIGN KEY (Driver_Id) REFERENCES driver (Driver_id),
  FOREIGN KEY (SourceName) REFERENCES location (Location_Name),
  FOREIGN KEY (DestinationName) REFERENCES location (Location_Name)
);

-- Proposed Booking Table
CREATE TABLE proposed_booking (
  Driver_Id INT NOT NULL,
  Ride_Id INT NOT NULL,
  PRIMARY KEY (Driver_Id, Ride_Id),
  FOREIGN KEY (Driver_Id) REFERENCES driver (Driver_id),
  FOREIGN KEY (Ride_Id) REFERENCES ride (Ride_id)
);



-- Admin Table
CREATE TABLE Admin (
  Fname VARCHAR(255) NOT NULL,
  Lname VARCHAR(255) NOT NULL,
  Email VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY,
  pass VARCHAR(255) NOT NULL
);