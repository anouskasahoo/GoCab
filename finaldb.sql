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
--
-- Dumping data for table `location`
--

INSERT INTO `location`(X_Coordinate,Y_Coordinate,Location_Name) VALUES (-12.1,5.3,'Aerocity'),
(-11.1,8.5,'AIIMS'),
(3.4,-14.5,'Airport Terminal 1'),
(-23.4,-1.5,'Airport Terminal 3'),
(-4.5,20.3,'Akshardham'),
(-2.2,21.2,'Anand Vihar'),
(1.2,7,'Ashram'),
(3.2,11.2,'Azadpur'),
(12.2,-13.2,'Balabhgarh'),
(9.8,12.2,'Bhikaji Cama Place'),
(1.2,3.2,'Botanical Garden'),
(-4.5,12.3,'Chandini Chowk'),
(-8.6,20.3,'Chawri Bazaar'),
(-13.6,1.2,'Chirag Delhi'),
(-2.3,14,'Civil Lies'),
(-1.2,15.6,'Connaught Place'),
(-12.2,4.5,'Delhi Cantt'),
(12.2,13.2,'Dhaula Kuan'),
(8.5,16.5,'Dilshad Garden'),
(-16.5,7.8,'Dwarka'),
(11.5,2.2,'Dwarka Sector 1'),
(-12,12.2,'Dwarka Sector 2'),
(1.1,12.2,'Dwarka Sector 3'),
(20.2,12.2,'Electronic City'),
(21.2,15.4,'Ghaziabad'),
(-1.1,0.4,'Govindpuri'),
(5,7.6,'Greater Kailash'),
(10.2,9.8,'Green Park'),
(3.6,-4.2,'Gurgaon'),
(14.3,12.2,'Hauz Khas'),
(0,0,'IIIT Delhi'),
(11.2,12.8,'IIT Delhi'),
(-6.3,10.3,'INA'),
(11.2,18.9,'Inderlok'),
(3,17,'Indraprashtha'),
(6.5,11.2,'IP Ext'),
(-10.3,11.2,'ITO'),
(-22.1,20.3,'Jahangirpuri'),
(-7.5,18.6,'Jama Masjid'),
(12.2,11.1,'Janakpuri West'),
(-3.4,14.3,'Janpath'),
(1.2,5.6,'Jasola'),
(-14.2,14.5,'Jhandewalan'),
(12.2,12.2,'Jhilmil'),
(7.5,6.5,'JLN Stadium'),
(-4.3,8.4,'Jor Bagh'),
(2.2,3.2,'Kalkaji'),
(-4.6,19.2,'Karkarduma'),
(-2.2,16.7,'Karol Bagh'),
(3.4,6.7,'Kashmere Gate'),
(13.2,15.4,'Kaushambi'),
(-6,9.3,'Khan Market'),
(-14.2,14.5,'Kirti Nagar'),
(-3,12.3,'Lajpat Nagar'),
(-5.6,20.3,'Laxmi Nagar'),
(4.3,12.2,'Lodhi Colony'),
(-18.5,21.2,'Majlis Park'),
(-5.6,5.6,'Malviya Nagar'),
(-2.3,16.5,'Mandi House'),
(3.4,14.5,'Mayur Vihar'),
(-11.2,1.3,'Mehrauli'),
(-19.1,20.2,'Model Town'),
(0.4,-3.1,'Mohan Estate'),
(-12.2,13.2,'Moti Bagh'),
(-6.7,13.2,'Moti Nagar'),
(14.4,-1.2,'Najafgarh'),
(12.2,20.2,'Nangloi'),
(12.2,1.2,'Naraina'),
(-2.3,4.5,'Nehru Place'),
(1,17,'Nizamuddin'),
(3.6,4.2,'Noida'),
(-11.2,13.2,'Palam'),
(-12.2,4.2,'Panschsheel Park'),
(-16.4,17.5,'Paschim Vihar East'),
(-15.8,18.4,'Paschim Vihar West'),
(-12.2,8.9,'Patel Nagar'),
(-3.4,12.2,'Patparganj'),
(-16.4,20.5,'Pitampura'),
(-11.2,9.2,'Pragati Maidaan'),
(-11.5,12.4,'Punjabi Bagh East'),
(-11.1,11,'Punjabi Bagh West'),
(-11.1,3.4,'Rajouri Garden'),
(2.3,4.5,'RK Puram'),
(-12,12.2,'Rohini Sector 1'),
(-12.3,14.3,'Rohini Sector 2'),
(-13.2,15,'Rohini Sector 3'),
(12.2,1.2,'Safdarjung'),
(-4.3,0.5,'Saket'),
(1.2,-4.2,'Sarita Vihar'),
(12.2,5.6,'Sarojini Nagar'),
(-2.2,20.2,'Shahdara'),
(11.2,2.1,'Shaheen Bagh'),
(-13.2,9.4,'Shastri Nagar'),
(-6.2,23.5,'Sonipat'),
(-6.4,10.7,'South Ext'),
(1.2,-13.2,'Tagore Garden'),
(4.5,12.1,'Trilokpuri'),
(2.3,16.5,'Vaishali'),
(-12.2,2.6,'Vasant Vihar'),
(-12.2,9.6,'Vidhan Sabha'),
(-11.2,10.2,'Vishwavidyalaya'),
(2.2,13.2,'Vivek Vihar'),
(-3.2,20.2,'Welcome');


INSERT INTO `driver` VALUES (1,27,'Nilesh Kumar',2300,'9196758095','nileshkumar41@gmail.com',0,0,'Jasola'),
(2,30,'Nirmal Agarwal',2100,'9892568397','nehaagarwal42@gmail.com',0,0,'IIIT Delhi'),
(3,24,'Vikas Yadav',1200,'7032849705','vikasyadav43@gmail.com',0,0,'Hauz Khas'),
(4,29,'Golu',500,'9788506758','golu44@gmail.com',0,0,'Moti Bagh'),
(5,32,'Amit Shukla',560,'9076850237','amitshukla45@gmail.com',0,0,'Ashram'),
(6,28,'Pawan Verma',2000,'8056930861','pawanverma46@gmail.com',0,0,'Gurgaon'),
(7,26,'Ravi Kumar',1012,'8167028379','ravikumar47@gmail.com',0,0,'Noida'),
(8,31,'Biswajit Chakraborty',200,'9046509287','biswachakraborty48@gmail.com',0,0,'IIT Delhi'),
(9,25,'Sachin Sharma',1200,'9675082360','sachinsharma49@gmail.com',0,0,'Connaught Place'),
(10,33,'Arjun Gupta',210,'8765901280','arjungupta50@gmail.com',0,0,'Mayur Vihar'),
(11,22,'Amit Kumar',500,'9876543210','amitkumar@gmail.com',0,0,'Jasola'),
(12,25,'Ravi Sharma',550,'9876543211','ravisharma@gmail.com',0,0,'IIIT Delhi'),
(13,26,'Sarvesh Singh',575,'9876543212','sarveshsingh@gmail.com',0,0,'Hauz Khas'),
(14,23,'Neeraj Patel',600,'9876543213','neerajpatel@gmail.com',0,0,'Moti Bagh'),
(15,24,'Nilesh Jain',650,'9876543214','nileshjain@gmail.com',0,0,'Ashram'),
(16,27,'Sandeep Verma',550,'9876543215','sandeepverma@gmail.com',0,0,'Gurgaon'),
(17,28,'Vikram Singh',550,'9876543216','vikramsingh@gmail.com',0,0,'Noida'),
(18,29,'Rahul Chauhan',600,'9876543217','rahulchauhan@gmail.com',0,0,'IIT Delhi'),
(19,30,'Anurag Tiwari',550,'9876543218','anuragtiwari@gmail.com',0,0,'Connaught Place'),
(20,31,'Shivanshu Singh',550,'9876543219','shivanshusingh@gmail.com',0,0,'Mayur Vihar'),
(21,32,'Siddharth Srivastava',600,'9876543220','siddharthsrivastava@gmail.com',0,0,'Dwarka'),
(22,33,'Abhishek Agarwal',550,'9876543221','abhishekagarwal@gmail.com',0,0,'Greater Kailash'),
(23,34,'Ankit Kumar',550,'9876543222','ankitkumar@gmail.com',0,0,'Airport Terminal 3'),
(24,35,'Vishal Yadav',550,'9876543223','vishalyadav@gmail.com',0,0,'Vasant Vihar'),
(25,36,'Aditya Chaudhary',550,'9876543224','adityachaudhary@gmail.com',0,0,'Jasola'),
(26,37,'Manoj Kumar',550,'9876543225','manojkumar@gmail.com',0,0,'IIIT Delhi'),
(27,38,'Amit Chauhan',550,'9876543226','amitchauhan@gmail.com',0,0,'Hauz Khas'),
(28,39,'Anurag Singh',550,'9876543227','anuragsingh@gmail.com',0,0,'Moti Bagh'),
(29,40,'Amit Rawat',550,'9876543228','amitrawat@gmail.com',0,0,'Ashram'),
(30,41,'Ravi Verma',550,'9876543229','raviverma@gmail.com',0,0,'Gurgaon'),
(31,26,'Abhishek Kulkarni',120,'9876543210','abhishek.kulkarni@gmail.com',0,0,'Jasola'),
(32,28,'Aadit Shah',1120,'9876543211','aadit.shah@gmail.com',0,0,'IIIT Delhi'),
(33,29,'Amit Patel',2120,'9876543212','amit.patel@gmail.com',0,0,'Hauz Khas'),
(34,30,'Anirban Mehta',320,'9876543213','anirban.mehta@gmail.com',0,0,'Moti Bagh'),
(35,31,'Aryan Singh',2110,'9876543214','aryan.singh@gmail.com',0,0,'Ashram'),
(36,32,'Chitragupta Saini',1110,'9876543215','chitra.saini@gmail.com',0,0,'Gurgaon'),
(37,33,'Dhananjay Singh',1110,'9876543216','dhananjay.singh@gmail.com',0,0,'Noida'),
(38,34,'Hemant Chauhan',2210,'9876543217','hemant.chauhan@gmail.com',0,0,'IIT Delhi'),
(39,35,'Jaideep Kaur',120,'9876543218','jai.kaur@gmail.com',0,0,'Connaught Place'),
(40,36,'Kapil Sharma',2220,'9876543219','kapil.sharma@gmail.com',0,0,'Mayur Vihar'),
(41,37,'Kunal Patel',2110,'9876543220','kunal.patel@gmail.com',0,0,'Dwarka'),
(42,38,'Kavyank Kumar',1210,'9876543221','kavyank.kumar@gmail.com',0,0,'Greater Kailash'),
(43,39,'Manoj Mishra',2220,'9876543222','manoj.mishra@gmail.com',0,0,'Airport Terminal 3'),
(44,40,'Meera Patel',1110,'9876543223','meera.patel@gmail.com',0,0,'Vasant Vihar'),
(45,25,'Ravi Kumar',1890,'+91 1234567890','ravi.kumar@email.com',0,0,'Gurgaon'),
(46,32,'Sunmit Patel',440,'+91 1234567891','sunmit.patel@email.com',0,0,'Moti Bagh'),
(47,27,'Amit Shah',210,'+91 1234567892','amit.shah@email.com',0,0,'Noida'),
(48,29,'Raja Verma',1210,'+91 1234567893','raja.verma@email.com',0,0,'IIT Delhi'),
(49,26,'Deepak Singh',6540,'+91 1234567894','deepak.singh@email.com',0,0,'Ashram'),
(50,24,'Nirav Sharma',5540,'+91 1234567895','nirav.sharma@email.com',0,0,'Mayur Vihar'),
(51,23,'Mohit Agarwal',3220,'+91 1234567896','mohit.agarwal@email.com',0,0,'Jasola'),
(52,31,'Mirza Khan',2110,'+91 1234567897','mirza.khan@email.com',0,0,'Vasant Vihar'),
(53,30,'Vikas Jain',1280,'+91 1234567898','vikas.jain@email.com',0,0,'Connaught Place'),
(54,28,'Narendra Modi',5410,'+91 1234567899','narendra.modi@email.com',0,0,'IIIT Delhi'),
(55,25,'Ravi Kumar',2110,'+91 1234567900','ravi.kumar1@email.com',0,0,'Gurgaon'),
(56,32,'Vicky Patel',0,'+91 1234567901','vicky.patel1@email.com',0,0,'Moti Bagh'),
(57,27,'Amit Shah',2230,'+91 1234567902','amit.shah1@email.com',0,0,'Noida'),
(58,29,'Raman Verma',2210,'+91 1234567903','raman.verma1@email.com',0,0,'IIT Delhi'),
(59,26,'Deepak Singh',1021,'+91 1234567904','deepak.singh1@email.com',0,0,'Ashram'),
(60,24,'Neha Sharma',2110,'+91 1234567905','neha.sharma1@email.com',0,0,'Mayur Vihar'),
(61,23,'Mohit Agarwal',1210,'+91 1234567906','mohit.agarwal1@email.com',0,0,'Jasola'),
(62,25,'Anuj Gupta',5600,'9876543210','anujgupta@email.com',0,0,'Jasola'),
(63,27,'Aman Singh',7200,'9876543211','amansingh@email.com',0,0,'IIIT Delhi'),
(64,29,'Rishabh Shukla',8800,'9876543212','rishabhshukla@email.com',0,0,'Hauz Khas'),
(65,30,'Priyanshu Verma',9600,'9876543213','priyaverma@email.com',0,0,'Moti Bagh'),
(66,26,'Siddharth Chaudhary',6200,'9876543214','siddharthchaudhary@email.com',0,0,'Ashram'),
(67,23,'Nidhvir Mehra',4500,'9876543215','nidhvirmehra@email.com',0,0,'Gurgaon'),
(68,24,'Aditya Shukla',5200,'9876543216','adityashukla@email.com',0,0,'Noida'),
(69,28,'Shreyank Jain',7600,'9876543217','shreyankjain@email.com',0,0,'IIT Delhi'),
(70,32,'Amit Kumar',10200,'9876543218','amitkumar@email.com',0,0,'Connaught Place'),
(71,22,'Nishant Tiwari',4200,'9876543219','nishantiwari@email.com',0,0,'Mayur Vihar'),
(72,33,'Abhishek Mishra',10600,'9876543220','abhishekmishra@email.com',0,0,'Dwarka'),
(73,31,'Karan Singh',9800,'9876543221','karansingh@email.com',0,0,'Greater Kailash'),
(74,25,'Vikram Patel',5800,'9876543222','vikrampatel@email.com',0,0,'Airport Terminal 3'),
(75,35,'Vikas Yadav',11600,'9876543223','vikasyadav@email.com',0,0,'Vasant Vihar'),
(76,20,'Anshika Shah',3500,'9876543224','anshikashah@email.com',0,0,'Jasola'),
(77,36,'Sachin Singh Sharma',12000,'9876543225','sachinsharma@email.com',0,0,'IIIT Delhi'),
(78,27,'Raju Gupta',7000,'9876543226','rajugupta@email.com',0,0,'Hauz Khas'),
(79,25,'Akash Gupta',5600,'9876543210','akashgupta@email.com',0,0,'Jasola'),
(80,27,'Aman Singh',7200,'9876543211','amansingh@email.com',0,0,'IIIT Delhi'),
(81,29,'Rishabh Shukla',8800,'9876543212','rishabhshukla@email.com',0,0,'Hauz Khas'),
(82,30,'Prince Kumar Verma',9600,'9876543213','princeverma@email.com',0,0,'Moti Bagh'),
(83,26,'Siddharth Chaudhary',6200,'9876543214','siddharthchaudhary@email.com',0,0,'Ashram'),
(84,23,'Nishant Das',4500,'9876543215','nidhantdas@email.com',0,0,'Gurgaon'),
(85,24,'Aditya Shukla',5200,'9876543216','adityashukla@email.com',0,0,'Noida'),
(86,28,'Shreya Jain',7600,'9876543217','shreyajain@email.com',0,0,'IIT Delhi'),
(87,32,'Amit Kumar Singh',10200,'9876543218','amitkumar@email.com',0,0,'Connaught Place'),
(88,22,'Niraj Tiwari',4200,'9876543219','nirajtiwari@email.com',0,0,'Mayur Vihar'),
(89,33,'Abhishek Mishra',10600,'9876543220','abhishekmishra@email.com',0,0,'Dwarka'),
(90,31,'Kamal Singh',9800,'9876543221','kamalsingh@email.com',0,0,'Greater Kailash'),
(91,25,'Vikram Patel',5800,'9876543222','vikrampatel@email.com',0,0,'Airport Terminal 3'),
(92,35,'Vikas Yadav',11600,'9876543223','vikasyadav@email.com',0,0,'Vasant Vihar'),
(93,20,'Anshu Garg',3500,'9876543224','anshu.g@email.com',0,0,'Jasola'),
(94,36,'Sambit Agarwak',12000,'9876543225','sagarwal@email.com',0,0,'IIIT Delhi'),
(95,27,'Rajiv Gupta',7000,'9876543226','rajivgupta@email.com',0,0,'Hauz Khas'),
(96,27,'Amit Kumar Singh',6210,'+91 1234567892','amit.ks@email.com',0,0,'INA'),
(97,29,'Raja Jha',1210,'+91 1234567893','raja.jha@email.com',0,0,'Welcome'),
(98,26,'Satyendra Singh',6540,'+91 1234567894','satya.singh@email.com',0,0,'Nehru Place'),
(99,27,'Amitanshu Dabas',210,'+91 1234567892','thegreatdabas@email.com',0,0,'ITO'),
(100,29,'Ram Verma',1240,'+91 1234567893','ram.verma@email.com',0,0,'Janakpuri West'),
(101,26,'Deepanshu Singh',2540,'+91 1234567894','deepanshu.singh@email.com',0,0,'AIIMS'),
(102,26,'kavya',0,'+91 1234567894','kavya@email.com',0,0,'IIIT Delhi');


INSERT INTO `vehicle` VALUES ('Go','Ritz',1,4,'DL8576'),
('Moto','Yamaha',2,2,'DL5650'),
('Lux','Audi',3,4,'DL7748'),
('XL','Mobilio',4,6,'DL9830'),
('Lux','Mercedees',5,4,'DL9569'),
('XL','Innova',6,6,'DL4978'),
('Prime','Ciaz',7,4,'DL9707'),
('Moto','Honda',8,2,'DL4210'),
('Lux','BMW',9,4,'DL9377'),
('XL','Mobilio',10,6,'DL1416'),
('Go','Ritz',11,4,'DL1226'),
('Moto','Honda',12,2,'DL1782'),
('Go','Ritz',13,4,'DL2100'),
('XL','Mobilio',14,6,'DL9021'),
('Prime','Ciaz',15,4,'DL6703'),
('Moto','Bajaj',16,2,'DL7750'),
('XL','Celerio',17,6,'DL7010'),
('Go','WagonR',18,4,'DL8360'),
('Prime','Ciaz',19,4,'DL8490'),
('Moto','Bajaj',20,2,'DL3379'),
('Moto','Honda',21,2,'DL5710'),
('Moto','Yamaha',22,2,'DL7950'),
('Moto','Honda',23,2,'DL5135'),
('Lux','Mercedees',24,4,'DL7316'),
('XL','Innova',25,6,'DL4754'),
('Lux','BMW',26,4,'DL7493'),
('XL','Mobilio',27,6,'DL9008'),
('Lux','Audi',28,4,'DL4268'),
('XL','Innova',29,6,'DL7401'),
('Go','Indica',30,4,'DL4897'),
('Prime','Honda City',31,4,'DL9329'),
('Moto','Yamaha',32,2,'DL8735'),
('XL','Mobilio',33,6,'DL5785'),
('Go','Ritz',34,4,'DL4998'),
('Go','Indica',35,4,'DL4836'),
('Go','Indica',36,4,'DL7527'),
('Prime','Ciaz',37,4,'DL1222'),
('Go','WagonR',38,4,'DL6587'),
('Go','Indica',39,4,'DL3632'),
('Go','Indica',40,4,'DL1594'),
('Lux','Audi',41,4,'DL6740'),
('Lux','Audi',42,4,'DL9881'),
('Go','Ritz',43,4,'DL3352'),
('Moto','Bajaj',44,2,'DL8305'),
('Lux','Mercedees',45,4,'DL5798'),
('Go','Ritz',46,4,'DL2813'),
('XL','Celerio',47,6,'DL9480'),
('Moto','Yamaha',48,2,'DL9813'),
('XL','Mobilio',49,6,'DL5390'),
('Moto','Yamaha',50,2,'DL1312'),
('Lux','Audi',51,4,'DL2834'),
('Moto','Yamaha',52,2,'DL6291'),
('Moto','Honda',53,2,'DL3251'),
('XL','Mobilio',54,6,'DL6050'),
('XL','Innova',55,6,'DL7658'),
('Prime','Honda City',56,4,'DL1950'),
('Moto','Yamaha',57,2,'DL1438'),
('Go','Ritz',58,4,'DL8203'),
('Go','Ritz',59,4,'DL7524'),
('Prime','Swift Dzire',60,4,'DL7027'),
('Prime','Ciaz',61,4,'DL5074'),
('Lux','BMW',62,4,'DL9586'),
('Prime','Swift Dzire',63,4,'DL7825'),
('Moto','Yamaha',64,2,'DL3460'),
('Go','Indica',65,4,'DL3645'),
('Lux','Audi',66,4,'DL9818'),
('Go','WagonR',67,4,'DL8776'),
('Lux','Audi',68,4,'DL3345'),
('Moto','Yamaha',69,2,'DL9603'),
('Lux','Audi',70,4,'DL4759'),
('Lux','Audi',71,4,'DL7564'),
('Go','WagonR',72,4,'DL1798'),
('XL','Mobilio',73,6,'DL8318'),
('XL','Innova',74,6,'DL1540'),
('Go','WagonR',75,4,'DL7953'),
('Moto','Bajaj',76,2,'DL4511'),
('Lux','Mercedees',77,4,'DL2829'),
('Moto','Bajaj',78,2,'DL7394'),
('XL','Celerio',79,6,'DL5417'),
('Prime','Honda City',80,4,'DL9521'),
('Lux','Audi',81,4,'DL5554'),
('XL','Mobilio',82,6,'DL5904'),
('Go','Ritz',83,4,'DL7559'),
('Moto','Honda',84,2,'DL6537'),
('Moto','Yamaha',85,2,'DL5108'),
('Go','Ritz',86,4,'DL4538'),
('XL','Innova',87,6,'DL4129'),
('Prime','Ciaz',88,4,'DL7667'),
('Prime','Swift Dzire',89,4,'DL1621'),
('Prime','Honda City',90,4,'DL2766'),
('Prime','Swift Dzire',91,4,'DL9208'),
('Lux','Mercedees',92,4,'DL7872'),
('Prime','Swift Dzire',93,4,'DL9239'),
('Lux','BMW',94,4,'DL2687'),
('Prime','Honda City',95,4,'DL9267'),
('Prime','Honda City',96,4,'DL9979'),
('XL','Celerio',97,6,'DL5808'),
('Prime','Swift Dzire',98,4,'DL1666'),
('Moto','Yamaha',99,2,'DL1538'),
('Moto','Bajaj',100,2,'DL9808'),
('Lux','BMW',101,4,'DL5580');

INSERT INTO `customer` VALUES (17,25,'Ravi Kumar',100,'9876543210','ravi.kumar@email.com',0,0,'Jasola'),
(18,30,'Priya Sharma',200,'9876543211','priya.sharma@email.com',0,0,'IIIT Delhi'),
(19,35,'Amit Patel',150,'9876543212','amit.patel@email.com',0,0,'Hauz Khas'),
(20,40,'Sonia Singh',250,'9876543213','sonia.singh@email.com',3.2,1,'Moti Bagh'),
(21,45,'Vijay Kumar',300,'9876543214','vijay.kumar@email.com',4.5,1,'Ashram'),
(22,20,'Abhishek Gupta',50,'9876543215','abhishek.gupta@email.com',0,0,'Gurgaon'),
(23,22,'Neha Verma',75,'9876543216','neha.verma@email.com',0,0,'Noida'),
(24,24,'Rohit Singh',90,'9876543217','rohit.singh@email.com',0,0,'IIT Delhi'),
(25,26,'Sara Khan',110,'9876543218','sara.khan@email.com',0,0,'Connaught Place'),
(26,28,'Kirti Sharma',125,'9876543219','kirti.sharma@email.com',0,0,'Mayur Vihar'),
(27,30,'Ankit Mishra',150,'9876543220','ankit.mishra@email.com',0,0,'Dwarka'),
(28,32,'Anjali Mehra',170,'9876543221','anjali.mehra@email.com',0,0,'Greater Kailash'),
(29,34,'Akshay Patel',200,'9876543222','akshay.patel@email.com',0,0,'Jasola'),
(30,36,'Shweta Verma',220,'9876543223','shweta.verma@email.com',0,0,'IIIT Delhi'),
(31,38,'Vivek Singh',250,'9876543224','vivek.singh@email.com',0,0,'Hauz Khas'),
(32,40,'Deepak Kumar',300,'9876543225','deepak.kumar@email.com',0,0,'Moti Bagh'),
(33,26,'Ravi Kumar',951.75,'+91-9876543212','ravikumar1@email.com',4.7,1,'Jasola'),
(34,29,'Anita Singh',1250.59,'+91-9876543213','anitasingh1@email.com',4.5,1,'IIIT Delhi'),
(35,30,'Amit Yadav',1790.98,'+91-9876543214','amityadav1@email.com',0,0,'Hauz Khas'),
(36,27,'Deepika Sharma',1423.85,'+91-9876543215','deepikasharma1@email.com',0,0,'Moti Bagh'),
(37,31,'Vikas Gupta',1952.35,'+91-9876543216','vikasgupta1@email.com',0,0,'Ashram'),
(38,25,'Sachin Sharma',1761.69,'+91-9876543217','sachinsharma1@email.com',3.9,1,'Gurgaon'),
(39,23,'Radhika Singh',1634.52,'+91-9876543218','radhikasingh1@email.com',0,0,'Noida'),
(40,28,'Neha Patel',1098.36,'+91-9876543219','nehapatel1@email.com',0,0,'IIT Delhi'),
(41,22,'Raman Singh',1767.45,'+91-9876543220','ramansingh1@email.com',4.6,1,'Connaught Place'),
(42,32,'Anjali Jain',1603.98,'+91-9876543221','anjalijain1@email.com',4.8,1,'Mayur Vihar'),
(43,34,'Vinay Kumar',567.21,'+91-9876543222','vinaykumar1@email.com',0,0,'Dwarka'),
(44,33,'Priya Verma',1423.12,'+91-9876543223','priyaverma1@email.com',0,0,'Greater Kailash'),
(45,36,'Abhishek Chaudhary',1723.98,'+91-9876543224','abhishekchaudhary1@email.com',0,0,'Jasola'),
(46,35,'Sonal Patel',1564.25,'+91-9876543225','sonalpatel1@email.com',4.5,2,'IIIT Delhi'),
(47,37,'Amit Rawat',986.47,'+91-9876543226','amitrawat1@email.com',4.6,1,'Hauz Khas'),
(112,19,'Asha Singh',482.44,'9876453210','asha.singh@email.com',4.3,1,'Jasola'),
(113,21,'Ravi Mehta',957.33,'9123456789','ravi.mehta@email.com',0,0,'IIIT Delhi'),
(114,22,'Anjali Shah',746.22,'9817263154','anjali.shah@email.com',0,0,'Hauz Khas'),
(115,26,'Ritesh Patel',1201.11,'8916273540','ritesh.patel@email.com',0,0,'Moti Bagh'),
(116,27,'Arpana Jain',736.99,'7698413257','arpana.jain@email.com',0,0,'Ashram'),
(117,24,'Aman Gupta',879.56,'9316584721','aman.gupta@email.com',4.1,1,'Gurgaon'),
(118,20,'Meera Patel',923.21,'7321689057','meera.patel@email.com',0,0,'Noida'),
(119,25,'Vijay Kumar',567.89,'6917852430','vijay23.kumar@email.com',0,0,'IIT Delhi'),
(120,23,'Neha Singh',901.12,'8907241653','neha.singh@email.com',0,0,'Connaught Place'),
(121,18,'Ankit Shah',769.45,'9512678304','ankit.shah@email.com',3.2,1,'Mayur Vihar'),
(122,29,'Pooja Mehta',654.67,'7859123640','pooja.mehta@email.com',0,0,'Dwarka'),
(123,17,'Aditya Gupta',879.21,'9875361420','aditya.gupta@email.com',0,0,'Greater Kailash'),
(124,19,'Rohan Patel',654.78,'9236917854','rohan.patel@email.com',0,0,'Jasola'),
(125,25,'Priya Shah',901.22,'9086237514','priya.shah@email.com',0,0,'IIIT Delhi'),
(126,27,'Anmol Jain',736.55,'8905673421','anmol.jain@email.com',0,0,'Hauz Khas'),
(127,18,'Sarika Singh',482.33,'9086541327','sarika.singh@email.com',0,0,'Moti Bagh'),
(128,22,'Santoshi Mahajan',785.5,'9596783642','santoshi.mahajan@gmail.com',4.3,1,'Jasola'),
(129,25,'Vineet Sehgal',923.2,'9350708166','vineet.sehgal@gmail.com',0,0,'IIIT Delhi'),
(130,32,'Meenal Singh',542.3,'8860549312','meenal.singh@gmail.com',0,0,'Hauz Khas'),
(131,19,'Vikram Seth',890.7,'9671310876','vikram.seth@gmail.com',0,0,'Moti Bagh'),
(132,26,'Ankur Chadha',612,'9873214596','ankur.chadha@gmail.com',0,0,'Ashram'),
(133,24,'Deepak Khanna',789.6,'9412368570','deepak.khanna@gmail.com',4.3,1,'Gurgaon'),
(134,29,'Deepti Arora',976.3,'7846503219','deepti.arora@gmail.com',0,0,'Noida'),
(135,18,'Amitabh Basu',550.8,'7984503162','amitabh.basu@gmail.com',0,0,'IIT Delhi'),
(136,33,'Rajesh Kholi',690.2,'9560347812','rajesh.kholi@gmail.com',0,0,'Connaught Place'),
(137,31,'Alok Mehra',764.1,'9320674589','alok.mehra@gmail.com',0,0,'Mayur Vihar'),
(138,23,'Vineeta Tandon',830.5,'9047532610','vineeta.tandon@gmail.com',0,0,'Dwarka'),
(139,21,'Anshu Bhatnagar',621.9,'9530894762','anshu.bhatnagar@gmail.com',4.3,1,'Greater Kailash'),
(140,28,'Monika Chopra',742,'9060347895','monika.chopra@gmail.com',0,0,'Jasola'),
(141,20,'Rajeev Talwar',587.2,'9482715609','rajeev.talwar@gmail.com',0,0,'IIIT Delhi'),
(142,35,'Sunil Bhatia',986.3,'7867502914','sunil.bhatia@gmail.com',4,1,'Hauz Khas'),
(143,22,'Manoj Khurana',542,'9561237845','manoj.khurana@gmail.com',4.1,1,'Moti Bagh'),
(264,23,'Arjun Patel',1250.75,'9101112222','arjunpatel@email.com',0,0,'Jasola'),
(265,26,'Ria Mehta',879.5,'9101113333','riamehta@email.com',0,0,'IIIT Delhi'),
(266,19,'Neha Shah',1199,'9101114444','nehashah@email.com',0,0,'Hauz Khas'),
(267,22,'Dhiren Kumar',1799.25,'9101115555','dhirenkumar@email.com',4,1,'Moti Bagh'),
(268,27,'Pooja Patel',979,'9101116666','poojapatel@email.com',0,0,'Ashram'),
(269,20,'Nilesh Shah',1499.75,'9101117777','nileshshah@email.com',3.9,1,'Gurgaon'),
(270,25,'Aman Singh',939.5,'9101118888','amansingh@email.com',0,0,'Noida'),
(271,21,'Priya Sharma',1099.25,'9101119999','priyasharma@email.com',0,0,'IIT Delhi'),
(272,29,'Sachin Agarwal',1699.5,'9101120000','sachinagarwal@email.com',0,0,'Connaught Place'),
(273,24,'Sonia Mehra',1299.75,'9101121111','soniamehra@email.com',0,0,'Mayur Vihar'),
(274,28,'Ravi Sharma',1049.25,'9101122222','ravisharma@email.com',0,0,'Dwarka'),
(275,23,'Vikas Jain',1199.5,'9101133333','vikasjain@email.com',3.9,1,'Greater Kailash'),
(276,26,'Neha Yadav',1499,'9101134444','nehayadav@email.com',0,0,'Jasola'),
(277,19,'Amit Shah',1249.75,'9101135555','amitshah@email.com',4,1,'IIIT Delhi'),
(278,22,'Nidhi Patel',1699.25,'9101136666','nidhipatel@email.com',0,0,'Hauz Khas'),
(279,27,'Vikrant Mehta',949,'9101137777','vikrantmehta@email.com',0,0,'Moti Bagh'),
(280,20,'Anjali Singh',899.75,'9101138888','anjalisingh@email.com',4.2,1,'Ashram'),
(281,28,'Ravi Singh',512.25,'+919999114867','rsingh37@gmail.com',0,0,'Jasola'),
(282,35,'Priya Gupta',867.99,'+919991124576','pgupta89@gmail.com',3.7,1,'Hauz Khas'),
(283,25,'Anjali Shah',951.5,'+919999167853','ashah16@gmail.com',0,0,'Moti Bagh'),
(284,32,'Amit Patel',742.1,'+919991186732','apatel23@gmail.com',4.2,2,'Gurgaon'),
(285,40,'Neha Agarwal',631.75,'+919991148907','nagarwal45@gmail.com',4.5,2,'IIIT Delhi'),
(286,27,'Rahul Mehta',986.55,'+919991145786','rmehta67@gmail.com',0,0,'Noida'),
(287,29,'Ritu Verma',714.2,'+919991112453','rverma89@gmail.com',0,0,'IIT Delhi'),
(288,26,'Vikas Yadav',856.8,'+919999117234','vyadav56@gmail.com',0,0,'Ashram'),
(289,35,'Sunil Kumar',582.15,'+919991112365','skumar89@gmail.com',0,0,'Gurgaon'),
(290,32,'Arti Singh',842.3,'+919991154367','asingh23@gmail.com',0,0,'Mayur Vihar'),
(291,29,'Deepak Mehra',792.45,'+919999117365','dmehra67@gmail.com',0,0,'Dwarka'),
(292,24,'Ravi Kumar',901.75,'+919991156789','rkumar12@gmail.com',0,0,'Greater Kailash'),
(293,31,'Pooja Jain',548.35,'+919999114876','pjain23@gmail.com',0,0,'Jasola'),
(294,34,'Monika Verma',729.8,'+919991137890','mverma56@gmail.com',4.2,1,'Hauz Khas'),
(295,27,'Raman Patel',963.1,'+919999117253','rpatel89@gmail.com',0,0,'Moti Bagh'),
(296,25,'Sonia Singh',812.5,'+919991156378','ssingh34@gmail.com',0,0,'Gurgaon'),
(297,38,'Rajesh Mehra',587.3,'+919999111235','rmehra78@gmail.com',0,0,'IIIT Delhi'),
(298,25,'Priyanka Malhotra',1867.99,'+919971124576','prigupta89@gmail.com',0,0,'Green Park'),
(299,45,'Shyama Sharma',951.5,'+919999167833','ashah154@gmail.com',0,0,'Vasant Vihar'),
(300,62,'Himanshu Patel',742.1,'+919992286732','hmppatel23@gmail.com',4.1,1,'Gurgaon'),
(301,40,'Gurkeerat Oberoi',632.75,'+919991148943','theoberoi@gmail.com',0,0,'Chirag Delhi'),
(302,27,'Sandeep Agarwal',986.55,'+919991445786','sdagar67@gmail.com',4.6,2,'Noida'),
(303,29,'Ranveer Verma',714.2,'+919991112153','ranveerverma89@gmail.com',4.8,1,'Vivek Vihar'),
(304,29,'anoushka',714.2,'+919991112133','anushka@gmail.com',4.8,1,'IIIT Delhi');

INSERT INTO `coupons` VALUES (1,30,13,'2023-06-19'),
(2,123,17,'2023-08-17'),
(3,115,9,'2023-01-12'),
(4,277,6,'2023-01-15'),
(5,36,5,'2023-01-16'),
(6,36,8,'2023-03-17'),
(7,295,5,'2023-03-12'),
(8,22,9,'2023-02-12'),
(9,137,5,'2023-09-11'),
(10,143,16,'2023-08-14'),
(11,32,18,'2023-09-17'),
(12,46,12,'2023-04-10'),
(13,303,6,'2023-06-10'),
(14,275,8,'2023-02-16'),
(15,44,14,'2023-01-15'),
(16,276,10,'2023-05-18'),
(17,283,14,'2023-05-11'),
(18,43,13,'2023-01-18'),
(19,139,10,'2023-08-12'),
(20,267,6,'2023-07-11'),
(21,128,11,'2023-05-14'),
(22,114,15,'2023-02-14'),
(23,32,15,'2023-03-19'),
(24,125,7,'2023-01-16'),
(25,276,11,'2023-04-14'),
(26,136,16,'2023-02-19'),
(27,31,6,'2023-01-19'),
(28,295,12,'2023-09-16'),
(29,266,17,'2023-04-17'),
(30,35,12,'2023-02-19'),
(31,293,13,'2023-05-14'),
(32,280,12,'2023-06-12'),
(33,277,15,'2023-07-10'),
(34,143,10,'2023-01-19'),
(35,274,18,'2023-07-15'),
(36,34,10,'2023-08-16'),
(37,124,18,'2023-05-18'),
(38,118,17,'2023-05-14'),
(39,43,5,'2023-08-18'),
(40,26,7,'2023-03-18'),
(41,44,6,'2023-04-17'),
(42,45,15,'2023-09-15'),
(43,292,7,'2023-01-12'),
(44,32,11,'2023-04-11'),
(45,264,11,'2023-01-18'),
(46,117,18,'2023-06-18'),
(47,271,17,'2023-07-13'),
(48,273,8,'2023-09-18'),
(49,133,13,'2023-07-17'),
(50,275,5,'2023-09-18'),
(51,268,14,'2023-04-13'),
(52,117,6,'2023-01-19'),
(53,125,8,'2023-01-16'),
(54,125,5,'2023-03-15'),
(55,124,11,'2023-09-12'),
(56,137,6,'2023-02-13'),
(57,28,18,'2023-09-11'),
(58,39,11,'2023-06-10'),
(59,43,17,'2023-07-18'),
(60,289,5,'2023-06-14'),
(61,23,14,'2023-09-18'),
(62,114,12,'2023-01-16'),
(63,282,14,'2023-09-13'),
(64,295,14,'2023-03-16'),
(65,114,17,'2023-06-16'),
(66,264,6,'2023-03-17'),
(67,19,11,'2023-06-19'),
(68,121,13,'2023-03-17'),
(69,39,17,'2023-01-14'),
(70,47,9,'2023-03-11'),
(71,266,14,'2023-05-19'),
(72,133,14,'2023-02-14'),
(73,36,11,'2023-04-16'),
(74,37,15,'2023-06-10'),
(75,34,5,'2023-05-10'),
(76,135,8,'2023-09-16'),
(77,142,5,'2023-02-11'),
(78,29,16,'2023-04-18'),
(79,130,12,'2023-09-11'),
(80,121,5,'2023-05-18'),
(81,291,16,'2023-07-10'),
(82,138,14,'2023-05-16'),
(83,292,6,'2023-04-17'),
(84,29,18,'2023-03-13'),
(85,27,15,'2023-08-17'),
(86,17,18,'2023-06-12'),
(87,122,10,'2023-04-19'),
(88,294,14,'2023-01-12'),
(89,269,6,'2023-01-15'),
(90,34,16,'2023-02-12'),
(91,113,5,'2023-06-14'),
(92,41,16,'2023-07-19'),
(93,301,10,'2023-02-13'),
(94,132,9,'2023-01-19'),
(95,116,16,'2023-05-19'),
(96,142,14,'2023-07-17'),
(97,298,17,'2023-02-13'),
(98,284,13,'2023-02-10'),
(99,47,6,'2023-06-14'),
(100,116,6,'2023-07-18'),
(101,113,6,'2023-07-18'),
(102,304,14,'2023-03-12'),
(103,304,30,'2023-03-12'),
(104,304,5,'2023-03-12');

INSERT INTO `ride` VALUES (1,6,'COMPLETED',128,40,'04:54:51','04:35:36','2024-03-10',0,NULL,'Wallet',4,4,4594,'Majlis Park','Govindpuri','Go'),
(2,24,'COMPLETED',275,30,'11:48:23','11:49:17','2024-03-10',1606,NULL,'Wallet',3.4,4.7,6271,'JLN Stadium','Pragati Maidaan','Go'),
(3,20,'COMPLETED',135,4,'12:55:42','12:20:25','2024-03-10',0,NULL,'Wallet',3,4,2602,'Patparganj','Jhilmil','XL'),
(4,23,'COMPLETED',38,2,'02:31:35','02:13:54','2024-03-10',477,NULL,'Wallet',3.7,4.6,1379,'Kashmere Gate','Punjabi Bagh West','Moto'),
(5,31,'COMPLETED',128,7,'04:52:53','04:14:19','2024-03-10',0,NULL,'Wallet',3.1,4.3,1702,'Karol Bagh','Delhi Cantt','Lux'),
(6,6,'COMPLETED',128,8,'10:36:30','10:59:28','2024-03-10',606,NULL,'Wallet',3.7,4.4,6016,'Chandini Chowk','Pitampura','Moto'),
(7,25,'COMPLETED',286,75,'07:50:56','07:44:53','2024-03-10',0,NULL,'Wallet',3.4,3.2,6150,'Model Town','Chawri Bazaar','Go'),
(8,27,'COMPLETED',280,98,'21:20:59','21:45:32','2024-02-10',0,NULL,'Wallet',4.4,3.3,1577,'Janpath','Model Town','Prime'),
(9,35,'COMPLETED',34,93,'10:29:35','10:18:31','2024-02-10',1740,NULL,'Wallet',4.5,4.3,5138,'Welcome','Jama Masjid','Prime'),
(10,12,'COMPLETED',280,39,'05:57:57','05:55:43','2024-02-10',1001,NULL,'Wallet',4.4,4.2,2945,'Ashram','Govindpuri','Go'),
(11,31,'COMPLETED',294,83,'10:15:28','10:31:51','2024-02-10',0,NULL,'Wallet',3,3.1,2791,'AIIMS','RK Puram','Go'),
(12,17,'COMPLETED',113,6,'13:13:26','13:31:17','2024-02-10',0,NULL,'Wallet',3.1,5,4772,'Mayur Vihar','Palam','XL'),
(13,28,'COMPLETED',116,96,'21:29:21','21:27:15','2024-02-10',0,NULL,'Wallet',3.9,3.2,7882,'Jhilmil','Lodhi Colony','Prime'),
(14,8,'COMPLETED',289,2,'14:51:32','14:22:38','2024-04-10',0,NULL,'Wallet',3.7,4.5,1511,'Mohan Estate','Najafgarh','Moto'),
(15,14,'COMPLETED',39,73,'12:36:58','12:33:13','2024-04-10',0,NULL,'Wallet',3.5,3.4,5398,'Civil Lies','Balabhgarh','XL'),
(16,22,'COMPLETED',268,1,'06:23:10','06:19:26','2024-04-10',0,NULL,'Wallet',3.8,3.3,1789,'Kashmere Gate','Trilokpuri','XL'),
(17,34,'COMPLETED',284,29,'20:46:36','20:58:43','2024-04-10',1073,NULL,'Wallet',4.4,3.8,5376,'Chawri Bazaar','Balabhgarh','XL'),
(18,33,'COMPLETED',32,1,'15:18:55','15:19:32','2024-04-10',0,NULL,'Wallet',3.4,5,4165,'Jahangirpuri','Malviya Nagar','Go'),
(19,18,'COMPLETED',291,1,'03:22:54','03:28:37','2024-04-10',0,NULL,'Wallet',3.3,3.6,4146,'Janpath','IIIT Delhi','Prime'),
(20,9,'COMPLETED',46,10,'10:12:38','10:42:14','2024-04-10',1500,NULL,'Wallet',4.6,4.7,4224,'Rohini Sector 3','IIIT Delhi','XL'),
(21,25,'COMPLETED',34,93,'16:12:33','16:27:24','2024-05-10',0,NULL,'Wallet',3.1,3.2,4185,'Paschim Vihar West','Sonipat','Prime'),
(22,26,'COMPLETED',22,6,'17:21:28','17:28:38','2024-05-10',0,NULL,'Wallet',4,4,5750,'Vivek Vihar','Welcome','Go'),
(23,15,'COMPLETED',122,6,'11:53:22','11:57:31','2024-05-10',0,NULL,'Wallet',3.5,4.8,1436,'Chandini Chowk','Dhaula Kuan','Go'),
(24,34,'COMPLETED',302,27,'19:44:51','19:23:24','2024-05-10',1166,NULL,'Wallet',3.2,4.7,9967,'Malviya Nagar','Patel Nagar','XL'),
(25,28,'COMPLETED',302,6,'01:30:57','01:22:28','2024-05-10',0,NULL,'Wallet',3.2,4.2,1013,'Akshardham','Lodhi Colony','Moto'),
(26,21,'COMPLETED',300,55,'17:53:26','17:52:28','2024-05-10',0,NULL,'Wallet',4.7,4.3,8086,'Dwarka Sector 2','Green Park','XL'),
(27,11,'COMPLETED',21,17,'15:55:13','15:32:31','2024-05-10',0,NULL,'Wallet',4,4.7,7910,'Airport Terminal 1','IIIT Delhi','XL'),
(28,31,'COMPLETED',33,65,'14:10:16','14:55:18','2024-05-10',0,NULL,'Wallet',4.5,3.7,6858,'Janpath','Shastri Nagar','Go'),
(29,17,'COMPLETED',141,35,'16:48:36','16:12:58','2024-05-10',0,NULL,'Wallet',3.6,4.9,3139,'Paschim Vihar West','Palam','Go'),
(30,18,'COMPLETED',117,32,'11:42:21','11:16:59','2024-05-10',1212,NULL,'Wallet',4.4,4.5,3761,'Delhi Cantt','IP Ext','Moto'),
(31,34,'COMPLETED',47,67,'04:41:16','04:45:53','2024-05-10',1964,NULL,'Wallet',4.2,4.5,9519,'Moti Bagh','Karol Bagh','Go'),
(32,8,'COMPLETED',133,16,'11:44:16','11:42:24','2024-05-10',997,NULL,'Wallet',3.5,3.3,1283,'Karkarduma','Mandi House','Moto'),
(33,20,'COMPLETED',40,47,'01:31:37','01:30:18','2024-06-10',0,NULL,'Wallet',4.6,4.9,5920,'Moti Bagh','Noida','XL'),
(34,16,'COMPLETED',119,9,'18:32:34','18:14:34','2024-06-10',0,NULL,'Wallet',3.7,3.1,5540,'IIT Delhi','Green Park','Go'),
(35,16,'COMPLETED',126,9,'04:54:47','04:56:19','2024-06-10',0,NULL,'Wallet',4.8,3.5,6820,'Rajouri Garden','Airport Terminal 1','Prime'),
(36,14,'COMPLETED',25,12,'04:59:39','04:47:27','2024-06-10',0,NULL,'Wallet',4,4.2,7291,'Dilshad Garden','Najafgarh','Moto'),
(37,28,'COMPLETED',300,1,'07:40:30','07:25:14','2024-06-10',222,NULL,'Wallet',3.2,3.3,1886,'Laxmi Nagar','Greater Kailash','Go'),
(38,28,'COMPLETED',129,10,'02:23:57','02:22:59','2024-06-10',0,NULL,'Wallet',4.2,4.2,1109,'Vaishali','Najafgarh','XL'),
(39,27,'COMPLETED',112,34,'23:21:58','23:41:10','2024-06-10',203,NULL,'Wallet',3.2,3.2,6778,'ITO','Nehru Place','Go'),
(40,15,'COMPLETED',37,1,'09:49:49','09:16:33','2024-06-10',0,NULL,'Wallet',3.3,4.9,5184,'Naraina','Ashram','XL'),
(41,12,'COMPLETED',284,18,'03:23:22','03:37:48','2024-06-10',1273,NULL,'Wallet',4.4,4.5,8203,'Dwarka Sector 2','Civil Lies','Go'),
(42,26,'COMPLETED',286,88,'09:36:49','09:49:31','2024-06-10',0,NULL,'Wallet',4.1,4.6,2977,'Dwarka Sector 3','Rohini Sector 3','Moto'),
(43,8,'COMPLETED',19,22,'09:23:51','09:54:18','2024-10-10',0,NULL,'Wallet',3.5,3.2,8360,'Dwarka Sector 1','Punjabi Bagh West','Prime'),
(44,14,'COMPLETED',291,33,'16:48:36','16:57:12','2024-10-10',0,NULL,'Wallet',3.2,3.7,2224,'Welcome','Dwarka Sector 3','Moto'),
(45,18,'COMPLETED',139,27,'02:49:46','02:20:17','2024-10-10',0,NULL,'Wallet',4.4,3.4,1141,'Vivek Vihar','Majlis Park','XL'),
(46,14,'COMPLETED',26,55,'14:27:53','14:56:21','2024-10-10',0,NULL,'Wallet',3.3,4.3,8515,'Trilokpuri','Karol Bagh','Prime'),
(47,29,'COMPLETED',277,37,'04:47:16','04:24:20','2024-10-10',1876,NULL,'Wallet',5,3.1,4244,'Govindpuri','Lodhi Colony','Prime'),
(48,13,'COMPLETED',137,85,'02:41:31','02:48:15','2024-10-10',0,NULL,'Wallet',4.7,4.7,9456,'Airport Terminal 1','Shastri Nagar','Moto'),
(49,6,'COMPLETED',32,73,'20:38:39','20:33:41','2024-10-10',0,NULL,'Wallet',4.2,3.3,9411,'Balabhgarh','JLN Stadium','XL'),
(50,25,'COMPLETED',19,55,'13:16:18','13:15:40','2024-10-10',0,NULL,'Wallet',3.2,4.9,6526,'Janpath','Bhikaji Cama Place','Prime'),
(51,7,'COMPLETED',301,91,'12:49:16','12:52:52','2024-10-10',0,NULL,'Wallet',4.4,4.4,4845,'Sarita Vihar','Inderlok','Prime'),
(52,11,'COMPLETED',127,11,'12:32:36','12:16:49','2024-10-10',0,NULL,'Wallet',4,3.3,7522,'Patel Nagar','Botanical Garden','Lux'),
(53,25,'COMPLETED',113,34,'17:10:24','17:19:44','2024-10-10',0,NULL,'Wallet',4.8,3.1,7015,'ITO','Balabhgarh','Moto'),
(54,19,'COMPLETED',303,84,'10:28:24','10:30:24','2024-10-10',1691,NULL,'Wallet',4.6,4.1,5913,'Punjabi Bagh East','Airport Terminal 3','Moto'),
(55,35,'COMPLETED',46,60,'13:50:58','13:43:54','2024-10-10',1781,NULL,'Wallet',4.6,3.1,5226,'Kaushambi','Rohini Sector 2','Prime'),
(56,15,'COMPLETED',119,35,'20:32:31','20:59:24','2024-10-10',0,NULL,'Wallet',3.6,3.9,8125,'Laxmi Nagar','Chirag Delhi','Lux'),
(57,22,'COMPLETED',112,41,'06:13:37','06:30:40','2024-10-10',0,NULL,'Wallet',3.8,4.2,7224,'Welcome','Delhi Cantt','Lux'),
(58,23,'COMPLETED',302,84,'22:35:22','22:31:59','2024-11-10',948,NULL,'Wallet',5,3.1,1976,'Balabhgarh','Janpath','Moto'),
(59,14,'COMPLETED',42,71,'17:50:37','17:59:48','2024-11-10',1310,NULL,'Wallet',3.1,4.3,8466,'Hauz Khas','Malviya Nagar','Lux'),
(60,30,'COMPLETED',287,19,'13:44:23','13:52:22','2024-11-10',0,NULL,'Wallet',3.3,3.8,5985,'Lodhi Colony','Jama Masjid','Prime'),
(61,30,'COMPLETED',284,27,'19:36:11','19:59:17','2024-11-10',0,NULL,'Wallet',4.1,4.4,8561,'Jhilmil','Nehru Place','XL'),
(62,20,'COMPLETED',138,51,'13:43:25','13:57:56','2024-11-10',0,NULL,'Wallet',4.5,3.3,8986,'Anand Vihar','IIT Delhi','Lux'),
(63,26,'COMPLETED',119,36,'21:33:13','21:25:10','2024-11-10',0,NULL,'Wallet',4.1,4.4,6226,'Airport Terminal 1','Trilokpuri','Lux'),
(64,28,'COMPLETED',296,86,'10:32:32','10:41:15','2024-11-10',0,NULL,'Wallet',3.1,4.7,7966,'Dwarka Sector 2','Jahangirpuri','Go'),
(65,23,'COMPLETED',21,41,'04:31:53','04:13:16','2024-11-10',1289,NULL,'Wallet',3.1,4.8,2194,'IIIT Delhi','Dilshad Garden','Lux'),
(66,24,'COMPLETED',133,33,'13:55:45','13:54:28','2024-11-10',0,NULL,'Wallet',4.9,4.2,2484,'Nehru Place','Dwarka Sector 2','Prime'),
(67,7,'COMPLETED',130,32,'05:31:40','05:58:13','2024-11-10',0,NULL,'Wallet',3.3,4.9,2317,'Safdarjung','Jor Bagh','Prime'),
(68,31,'COMPLETED',113,3,'18:47:50','18:54:14','2024-11-10',0,NULL,'Wallet',4.8,3.1,2503,'Najafgarh','Mandi House','XL'),
(69,27,'COMPLETED',20,39,'07:37:46','07:46:35','2024-11-10',1978,NULL,'Wallet',4.3,3.2,7730,'Airport Terminal 1','Civil Lies','Go'),
(70,15,'COMPLETED',139,11,'06:59:55','06:55:37','2024-11-10',248,NULL,'Wallet',4.2,4.6,7294,'Safdarjung','IP Ext','Go'),
(71,22,'COMPLETED',288,81,'03:47:56','03:42:41','2024-11-10',0,NULL,'Wallet',5,5,9919,'IIT Delhi','Malviya Nagar','Lux'),
(72,33,'COMPLETED',266,19,'22:25:28','22:41:11','2024-11-10',0,NULL,'Wallet',4.3,4.1,6501,'Patparganj','Chawri Bazaar','Prime'),
(73,12,'COMPLETED',266,22,'20:26:27','20:49:16','2024-11-10',0,NULL,'Wallet',4.9,4.3,6909,'Ashram','Jahangirpuri','Moto'),
(74,13,'COMPLETED',294,30,'16:44:41','16:27:49','2024-11-10',1305,NULL,'Wallet',3.9,3.9,7377,'Shastri Nagar','Connaught Place','Go'),
(75,31,'COMPLETED',285,28,'23:59:12','23:30:46','2024-11-10',887,NULL,'Wallet',3.8,4.5,4815,'Airport Terminal 3','Chawri Bazaar','Lux'),
(76,15,'COMPLETED',116,31,'09:55:28','09:39:55','2024-11-10',0,NULL,'Wallet',3.6,3.7,3092,'Jor Bagh','Rohini Sector 2','Moto'),
(77,29,'COMPLETED',142,58,'01:46:47','01:10:14','2024-11-10',1903,NULL,'Wallet',3.8,4.1,7256,'Safdarjung','Gurgaon','Go'),
(78,11,'COMPLETED',130,30,'05:37:22','05:35:55','2024-11-10',0,NULL,'Wallet',3.1,4.6,5846,'Nangloi','Karol Bagh','Moto'),
(79,28,'COMPLETED',277,29,'05:42:34','05:23:36','2024-11-10',0,NULL,'Wallet',4.3,3.7,9045,'Vaishali','Sarojini Nagar','Go'),
(80,27,'COMPLETED',282,39,'21:36:33','21:23:10','2024-12-10',1590,NULL,'Wallet',3.8,4.8,7071,'Mandi House','AIIMS','Go'),
(81,16,'COMPLETED',285,64,'19:13:56','19:12:32','2024-12-10',1515,NULL,'Wallet',3.1,3.1,5249,'Botanical Garden','Janpath','Moto'),
(82,34,'COMPLETED',36,93,'03:31:10','03:20:14','2024-12-10',0,NULL,'Wallet',4.7,4.6,8585,'Anand Vihar','Mayur Vihar','Prime'),
(83,35,'COMPLETED',127,29,'17:40:14','17:30:48','2024-12-10',0,NULL,'Wallet',4.7,4.3,2950,'Malviya Nagar','Indraprashtha','Prime'),
(84,27,'COMPLETED',281,49,'20:44:53','20:48:43','2024-12-10',0,NULL,'Wallet',4.7,3.6,8603,'Govindpuri','Kalkaji','XL'),
(85,15,'COMPLETED',264,27,'13:23:18','13:44:30','2024-12-10',0,NULL,'Wallet',3.4,4.2,1497,'Najafgarh','Vidhan Sabha','Go'),
(86,6,'COMPLETED',267,72,'10:33:50','10:15:32','2024-12-10',1555,NULL,'Wallet',3.7,3.3,1558,'Welcome','Palam','Go'),
(87,20,'COMPLETED',121,9,'18:21:10','18:28:11','2024-12-10',254,NULL,'Wallet',3.7,4.9,9330,'Shahdara','Laxmi Nagar','Lux'),
(88,34,'COMPLETED',120,87,'21:15:54','21:13:20','2024-12-10',0,NULL,'Wallet',4.2,3.8,5500,'South Ext','IIIT Delhi','XL'),
(89,30,'COMPLETED',289,67,'13:40:29','13:42:21','2024-12-10',0,NULL,'Wallet',3.7,3.9,6399,'Green Park','Noida','Go'),
(90,12,'COMPLETED',271,29,'20:51:24','20:11:16','2024-12-10',0,NULL,'Wallet',4.1,4.2,3091,'Akshardham','Vidhan Sabha','XL'),
(91,19,'COMPLETED',297,46,'18:48:56','18:24:49','2024-12-10',0,NULL,'Wallet',3.4,3.7,5881,'Laxmi Nagar','Moti Nagar','Go'),
(92,11,'COMPLETED',117,14,'14:33:20','14:46:26','2024-12-10',0,NULL,'Wallet',3.6,4.2,3946,'AIIMS','Inderlok','XL'),
(93,24,'COMPLETED',21,27,'10:49:29','10:51:25','2024-12-10',0,NULL,'Wallet',3.1,3.8,3713,'Chandini Chowk','Chirag Delhi','XL'),
(94,10,'COMPLETED',269,18,'14:39:24','14:22:29','2024-12-10',1886,NULL,'Wallet',4.3,4.8,8222,'Kaushambi','Vidhan Sabha','Go'),
(95,16,'COMPLETED',44,25,'16:42:15','16:56:15','2024-12-10',0,NULL,'Wallet',3.3,3.3,8641,'Rohini Sector 2','Kalkaji','Lux'),
(96,10,'COMPLETED',141,24,'18:25:29','18:40:54','2024-12-10',0,NULL,'Wallet',4.6,4.4,4866,'Dwarka Sector 2','ITO','Prime'),
(97,26,'COMPLETED',119,24,'07:18:49','07:43:58','2024-12-10',0,NULL,'Wallet',3.8,4,9991,'Green Park','Jahangirpuri','XL'),
(98,21,'COMPLETED',41,53,'16:48:44','16:57:39','2024-12-10',1194,NULL,'Wallet',4.4,3.3,3397,'Nehru Place','Pitampura','Moto'),
(99,32,'COMPLETED',33,58,'16:59:27','16:20:37','2024-12-10',985,NULL,'Wallet',4,3.9,7995,'Vidhan Sabha','Jhilmil','Go'),
(100,7,'COMPLETED',36,23,'15:57:12','15:12:13','2024-12-10',0,NULL,'Wallet',5,4.1,5391,'Moti Nagar','Model Town','Moto'),
(101,10,'COMPLETED',143,21,'10:34:38','10:38:45','2025-01-10',1809,NULL,'Wallet',5,4.3,9492,'Vaishali','AIIMS','Moto');

INSERT INTO `proposed_booking` VALUES (4,3),
(6,3),
(10,3),
(14,3),
(17,3),
(25,3),
(27,3),
(29,3),
(33,3),
(47,3),
(49,3),(54,3),(55,3),(73,3),(74,3),(79,3),(82,3),(87,3),(97,3),(3,5),(5,5),(9,5),(24,5),(26,5),(28,5),(41,5),(42,5),(45,5),(51,5),(62,5),(66,5),(68,5),(70,5),(71,5),(77,5),(81,5),(92,5),(94,5),(101,5),(4,16),(6,16),(10,16),(14,16),(17,16),(25,16),(27,16),(29,16),(33,16),(47,16),(49,16),(54,16),(55,16),(73,16),(74,16),(79,16),(82,16),(87,16),(97,16),(1,18),(11,18),(13,18),(18,18),(30,18),(34,18),(35,18),(36,18),(38,18),(39,18),(40,18),(43,18),(46,18),(58,18),(59,18),(65,18),(67,18),(72,18),(75,18),(83,18),(86,18),(7,19),(15,19),(19,19),(31,19),(37,19),(56,19),(60,19),(61,19),(63,19),(80,19),(88,19),(89,19),(90,19),(91,19),(93,19),(95,19),(96,19),(98,19),(1,22),(11,22),(13,22),(18,22),(30,22),(34,22),(35,22),(36,22),(38,22),(39,22),(40,22),(43,22),(46,22),(58,22),(59,22),(65,22),(67,22),(72,22),(75,22),(83,22),(86,22),(1,23),(11,23),(13,23),(18,23),(30,23),(34,23),(35,23),(36,23),(38,23),(39,23),(40,23),(43,23),(46,23),(58,23),(59,23),(65,23),(67,23),(72,23),(75,23),(83,23),(86,23),(2,25),(8,25),(12,25),(16,25),(20,25),(21,25),(22,25),(23,25),(32,25),(44,25),(48,25),(50,25),(52,25),(53,25),(57,25),(64,25),(69,25),(76,25),(78,25),(84,25),(85,25),(99,25),(100,25),(1,34),(11,34),(13,34),(18,34),(30,34),(34,34),(35,34),(36,34),(38,34),(39,34),(40,34),(43,34),(46,34),(58,34),(59,34),(65,34),(67,34),(72,34),(75,34),(83,34),(86,34),(7,35),(15,35),(19,35),(31,35),(37,35),(56,35),(60,35),(61,35),(63,35),(80,35),(88,35),(89,35),(90,35),(91,35),(93,35),(95,35),(96,35),(98,35),(4,38),(6,38),(10,38),(14,38),(17,38),(25,38),(27,38),(29,38),(33,38),(47,38),(49,38),(54,38),(55,38),(73,38),(74,38),(79,38),(82,38),(87,38),(97,38),(4,40),(6,40),(10,40),(14,40),(17,40),(25,40),(27,40),(29,40),(33,40),(47,40),(49,40),(54,40),(55,40),(73,40),(74,40),(79,40),(82,40),(87,40),(97,40),(2,42),(8,42),(12,42),(16,42),(20,42),(21,42),(22,42),(23,42),(32,42),(44,42),(48,42),(50,42),(52,42),(53,42),(57,42),(64,42),(69,42),(76,42),(78,42),(84,42),(85,42),(99,42),(100,42),(7,43),(15,43),(19,43),(31,43),(37,43),(56,43),(60,43),(61,43),(63,43),(80,43),(88,43),(89,43),(90,43),(91,43),(93,43),(95,43),(96,43),(98,43),(2,44),(8,44),(12,44),(16,44),(20,44),(21,44),(22,44),(23,44),(32,44),(44,44),(48,44),(50,44),(52,44),(53,44),(57,44),(64,44),(69,44),(76,44),(78,44),(84,44),(85,44),(99,44),(100,44),(7,46),(15,46),(19,46),(31,46),(37,46),(56,46),(60,46),(61,46),(63,46),(80,46),(88,46),(89,46),(90,46),(91,46),(93,46),(95,46),(96,46),(98,46),(7,50),(15,50),(19,50),(31,50),(37,50),(56,50),(60,50),(61,50),(63,50),(80,50),(88,50),(89,50),(90,50),(91,50),(93,50),(95,50),(96,50),(98,50),(3,52),(5,52),(9,52),(24,52),(26,52),(28,52),(41,52),(42,52),(45,52),(51,52),(62,52),(66,52),(68,52),(70,52),(71,52),(77,52),(81,52),(92,52),(94,52),(101,52),(2,53),(8,53),(12,53),(16,53),(20,53),(21,53),(22,53),(23,53),(32,53),(44,53),(48,53),(50,53),(52,53),(53,53),(57,53),(64,53),(69,53),(76,53),(78,53),(84,53),(85,53),(99,53),(100,53),(3,56),(5,56),(9,56),(24,56),(26,56),(28,56),(41,56),(42,56),(45,56),(51,56),(62,56),(66,56),(68,56),(70,56),(71,56),(77,56),(81,56),(92,56),(94,56),(101,56),(3,63),(5,63),(9,63),(24,63),(26,63),(28,63),(41,63),(42,63),(45,63),(51,63),(62,63),(66,63),(68,63),(70,63),(71,63),(77,63),(81,63),(92,63),(94,63),(101,63),(7,66),(15,66),(19,66),(31,66),(37,66),(56,66),(60,66),(61,66),(63,66),(80,66),(88,66),(89,66),(90,66),(91,66),(93,66),(95,66),(96,66),(98,66),(7,67),(15,67),(19,67),(31,67),(37,67),(56,67),(60,67),(61,67),(63,67),(80,67),(88,67),(89,67),(90,67),(91,67),(93,67),(95,67),(96,67),(98,67),(2,76),(8,76),(12,76),(16,76),(20,76),(21,76),(22,76),(23,76),(32,76),(44,76),(48,76),(50,76),(52,76),(53,76),(57,76),(64,76),(69,76),(76,76),(78,76),(84,76),(85,76),(99,76),(100,76),(2,78),(8,78),(12,78),(16,78),(20,78),(21,78),(22,78),(23,78),(32,78),(44,78),(48,78),(50,78),(52,78),(53,78),(57,78),(64,78),(69,78),(76,78),(78,78),(84,78),(85,78),(99,78),(100,78),(1,79),(11,79),(13,79),(18,79),(30,79),(34,79),(35,79),(36,79),(38,79),(39,79),(40,79),(43,79),(46,79),(58,79),(59,79),(65,79),(67,79),(72,79),(75,79),(83,79),(86,79),(7,83),(15,83),(19,83),(31,83),(37,83),(56,83),(60,83),(61,83),(63,83),(80,83),(88,83),(89,83),(90,83),(91,83),(93,83),(95,83),(96,83),(98,83),(1,85),(11,85),(13,85),(18,85),(30,85),(34,85),(35,85),(36,85),(38,85),(39,85),(40,85),(43,85),(46,85),(58,85),(59,85),(65,85),(67,85),(72,85),(75,85),(83,85),(86,85),(4,90),(6,90),(10,90),(14,90),(17,90),(25,90),(27,90),(29,90),(33,90),(47,90),(49,90),(54,90),(55,90),(73,90),(74,90),(79,90),(82,90),(87,90),(97,90),(3,95),(5,95),(9,95),(24,95),(26,95),(28,95),(41,95),(42,95),(45,95),(51,95),(62,95),(66,95),(68,95),(70,95),(71,95),(77,95),(81,95),(92,95),(94,95),(101,95),(7,96),(15,96),(19,96),(31,96),(37,96),(56,96),(60,96),(61,96),(63,96),(80,96),(88,96),(89,96),(90,96),(91,96),(93,96),(95,96),(96,96),(98,96),(4,97),(6,97),(10,97),(14,97),(17,97),(25,97),(27,97),(29,97),(33,97),(47,97),(49,97),(54,97),(55,97),(73,97),(74,97),(79,97),(82,97),(87,97),(97,97),(2,100),(8,100),(12,100),(16,100),(20,100),(21,100),(22,100),(23,100),(32,100),(44,100),(48,100),(50,100),(52,100),(53,100),(57,100),(64,100),(69,100),(76,100),(78,100),(84,100),(85,100),(99,100),(100,100);

insert into Admin(Fname , Lname , Email, pass)
values("Kavya", "Anosuka", "1","rana");


create view v4 as
(Select ride.Date date,ride.Start_time st,ride.End_time et, proposed_booking.Ride_Id,proposed_booking.Driver_Id,a.Location_Name cl,b.Location_Name s from proposed_booking
Join ride on ride.Ride_id=proposed_booking.Ride_Id
Join driver on driver.Driver_id=proposed_booking.Driver_id
Join location a on a.Location_Name=driver.Current_Location
Join location b on b.Location_Name=ride.SourceName
order by proposed_booking.Ride_Id);
Select Driver_Id,v4.s SourceName,v4.cl CurrentLocation, v4.Ride_id,v4.date,
sqrt(power((a.X_Coordinate-b.X_Coordinate),2)+power((a.Y_Coordinate-b.Y_Coordinate),2)) as Distance from v4
Join location a on a.Location_Name=v4.s
Join location b on b.Location_Name=v4.cl
where Driver_Id=93 and v4.date not in
(Select ride.Date from ride where Driver_id=93 and Status='Booked')
order by Distance;


-- Triggers


-- 1)


delimiter |
CREATE TRIGGER update_distance Before INSERT ON ride
FOR EACH ROW
	Begin
	set NEW.Distance=(select sqrt(power((l1.X_Coordinate-l2.X_Coordinate),2)+power((l1.Y_Coordinate-l2.Y_Coordinate),2)) 
    from location l1,location l2
	where NEW.SourceName=l1.Location_Name And NEW.DestinationName=l2.Location_Name);
    set NEW.OTP=(SELECT FLOOR(RAND() * 10000));
end
|
delimiter ;    

-- 2)

delimiter |
create trigger book_ride after Update on ride for each row
        Begin
			Delete from proposed_booking pb
			where NEW.Ride_Id=pb.Ride_Id And New.Status='Booked' And Old.Status!='Booked';
end
|
delimiter ;

-- 3)

Create Trigger insert_into_pb after insert on ride 
for each row
insert into proposed_booking(Driver_Id,Ride_Id) 
Select Driver_Id,NEW.Ride_Id from vehicle where vehicle.Type=NEW.Vehicle_Type;

Drop Trigger insert_into_pb;

-- -- OLAP
-- UPDATE ride r
-- JOIN location src ON r.SourceName = src.Location_Name
-- JOIN location dest ON r.DestinationName = dest.Location_Name
-- SET r.Distance = SQRT(POWER(dest.X_Coordinate - src.X_Coordinate, 2) +
--                       POWER(dest.Y_Coordinate - src.Y_Coordinate, 2))
-- WHERE r.Ride_id = 101;
-- SELECT Ride_id, SourceName, DestinationName, Distance
-- FROM ride
-- WHERE Ride_id = 101;


-- -- 2nd
-- SELECT * FROM coupons WHERE Customer_ID = (SELECT Customer_ID FROM ride WHERE Ride_id = 70);
-- SELECT * FROM ride WHERE Ride_id = 70;

--  UPDATE ride  
--  INNER JOIN (  
--      SELECT ride.Customer_id AS r,  
--             a.Discount_percent AS d,  
--             a.Expiry_Date AS exp,  
--             a.Coupon_id AS cc  
--      FROM ride  
--      JOIN coupons a ON a.Customer_ID = ride.Customer_id  
--      WHERE ride.Ride_id = 70  
--            AND ride.Date <= a.Expiry_Date  -- Compare with ride date instead of CURDATE()  
--      ORDER BY Discount_percent DESC  
--      LIMIT 1  
--  ) t1  
--  ON ride.Ride_id = 70  
--  SET Coupon_code = t1.cc  
--  WHERE cc IS NOT NULL;

-- -- 3rd 
-- SELECT 
--     a.Location_Name AS Source,
--     b.Location_Name AS Destination,
--     v.Type,
--     SQRT(POWER(a.X_Coordinate - b.X_Coordinate, 2) + POWER(a.Y_Coordinate - b.Y_Coordinate, 2)) AS Distance,
--     AVG(
--         CASE 
--             WHEN v.Type = 'Go' THEN 7.8  
--             WHEN v.Type = 'Prime' THEN 10.6  
--             WHEN v.Type = 'XL' THEN 14.5  
--             WHEN v.Type = 'Moto' THEN 3.6  
--             WHEN v.Type = 'Lux' THEN 20  
--         END * SQRT(POWER(a.X_Coordinate - b.X_Coordinate, 2) + POWER(a.Y_Coordinate - b.Y_Coordinate, 2))
--     ) AS Cost
-- FROM vehicle v
-- JOIN location a ON a.Location_Name = 'Hauz Khas'
-- JOIN location b ON b.Location_Name = 'IIIT Delhi'
-- GROUP BY v.Type
-- ORDER BY Cost;

-- -- 4th
-- SELECT * FROM ride WHERE ride_id = 3;

-- UPDATE ride  
-- SET status = 'BOOKED'  
-- WHERE OTP = 2602 AND ride_id = 3 AND status = 'REQUESTED';


-- -- 5th
-- SELECT d.Driver_id, d.Name
-- FROM driver d
-- LEFT JOIN ride r ON d.Driver_id = r.Driver_Id
-- WHERE r.Ride_id IS NULL;


-- -- 6th
-- -- SELECT d.Driver_id, d.Name, COUNT(r.Ride_id) AS Total_Trips
-- -- FROM driver d
-- -- LEFT JOIN ride r ON d.Driver_id = r.Driver_Id
-- -- GROUP BY d.Driver_id, d.Name
-- -- ORDER BY Total_Trips DESC;




-- -- 7th
-- UPDATE driver AS d
-- JOIN (
--     SELECT 
--         Driver_Id, 
--         COUNT(*) AS total_trips,
--         AVG(Driver_rating) AS avg_rating
--     FROM ride
--     WHERE Driver_Id IS NOT NULL
--     GROUP BY Driver_Id
-- ) AS r ON d.Driver_id = r.Driver_Id
-- SET 
--     d.No_of_Trips = r.total_trips,
--     d.Rating = IFNULL(r.avg_rating, 0);


-- UPDATE customer AS c
-- JOIN (
--     SELECT 
--         Customer_Id, 
--         COUNT(*) AS total_trips,
--         AVG(Customer_rating) AS avg_rating
--     FROM ride
--     WHERE Customer_Id IS NOT NULL
--     GROUP BY Customer_Id
-- ) AS r ON c.Customer_id = c.Customer_Id
-- SET 
--     c.No_of_Trips = r.total_trips,
--     c.Rating = IFNULL(r.avg_rating, 0);




-- -- 8th
-- SELECT 
--     d.Driver_id, 
--     d.Name AS Driver_name, 
--     d.Rating AS Driver_rating, 
--     v.Type AS Vehicle_type, 
--     v.Model AS Vehicle_model, 
--     v.Seats 
-- FROM 
--     driver d 
-- JOIN 
--     vehicle v 
-- ON 
--     d.Driver_id = v.Driver_Id 
-- WHERE 
--     v.Seats >= 4 
--     AND d.Current_Location = 'Jasola' 
--     AND d.Rating > 2 
--     AND d.Driver_id NOT IN (
--         SELECT Driver_Id 
--         FROM ride 
--         WHERE Status NOT IN ('REQUESTED', 'BOOKED')
--     );


-- -- 9th
-- SELECT Driver_id, Name, Rating,
--     CASE 
--         WHEN Rating > 4.0 AND No_of_Trips > 2 THEN 'Gold'
--         WHEN Rating > 3.5 AND No_of_Trips > 2 THEN 'Silver'
--         WHEN Rating > 3.0 AND No_of_Trips > 1 THEN 'Bronze'
--         ELSE NULL
--     END AS Reward_Category
-- FROM driver
-- WHERE (Rating > 4.0 AND No_of_Trips > 2) 
--    OR (Rating > 3.5 AND No_of_Trips > 2 AND NOT (Rating > 4.0 AND No_of_Trips > 2)) 
--    OR (Rating > 3.0 AND No_of_Trips > 1 AND NOT (Rating > 3.5 AND No_of_Trips > 2) AND NOT (Rating > 4.0 AND No_of_Trips > 2))
-- ORDER BY 
--     CASE 
--         WHEN Rating > 4.0 AND No_of_Trips > 2 THEN 1
--         WHEN Rating > 3.5 AND No_of_Trips > 2 THEN 2
--         WHEN Rating > 3.0 AND No_of_Trips > 1 THEN 3
--     END, Rating DESC, No_of_Trips DESC;

-- -- 10th
-- SELECT 
--     pb.Ride_Id,
--     r.Customer_Id,
--     r.SourceName,
--     r.DestinationName,
--     r.Distance,
--     SQRT(POW(l.X_Coordinate - dl.X_Coordinate, 2) + POW(l.Y_Coordinate - dl.Y_Coordinate, 2)) AS Distance_From_Driver
-- FROM 
--     proposed_booking pb
--     JOIN ride r ON pb.Ride_Id = r.Ride_id
--     JOIN driver d ON pb.Driver_Id = d.Driver_id
--     JOIN location dl ON d.Current_Location = dl.Location_Name
--     JOIN location l ON r.SourceName = l.Location_Name
-- WHERE 
--     pb.Driver_Id = 93 AND r.Status = 'REQUESTED'
-- ORDER BY 
--     Distance_From_Driver ASC
-- LIMIT 5;




	
INSERT INTO `coupons` VALUES (201,304,13,'2025-06-19')


