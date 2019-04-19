-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2019 at 06:28 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scubashop`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `cid` int(11) NOT NULL,
  `full_cname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipcode` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`cid`, `full_cname`, `email`, `address`, `city`, `state`, `zipcode`, `username`, `password`) VALUES
(1, 'Gabby Tinham', 'gtinham0@macromedia.com', '54101 Fisk Parkway', 'Saint Paul', 'MN', '55127', 'gtinham0', 'EMagL1h'),
(2, 'Griz Birdis', 'gbirdis1@hud.gov', '437 Talisman Junction', 'Biloxi', 'MS', '39534', 'gbirdis1', 'j7Ne6pRY'),
(3, 'Kendall O\'Loughane', 'koloughane2@eepurl.com', '871 Elka Avenue', 'Cincinnati', 'OH', '45243', 'koloughane2', '4B4TfIK'),
(4, 'Amalle Jacson', 'ajacson3@techcrunch.com', '77 Arizona Court', 'Tucson', 'AZ', '85710', 'ajacson3', '4j0qfaujix'),
(5, 'Marilin Chmarny', 'mchmarny4@issuu.com', '69 Namekagon Court', 'Dayton', 'OH', '45403', 'mchmarny4', 'J3OHI0p9b'),
(6, 'Ansley Wakeling', 'awakeling5@amazonaws.com', '8941 Burning Wood Junction', 'Anchorage', 'AK', '99507', 'awakeling5', 'pgwjVnHv5'),
(7, 'Elenore Pol', 'epol6@biglobe.ne.jp', '3 Everett Parkway', 'San Diego', 'CA', '92137', 'epol6', 'AbpbGZi3'),
(8, 'Ricky Spaldin', 'rspaldin7@npr.org', '61 Hoffman Terrace', 'Bonita Springs', 'FL', '34135', 'rspaldin7', '3v9GlGW2D7N'),
(9, 'Catherine Lowing', 'clowing8@comcast.net', '70 Gateway Street', 'Madison', 'WI', '53785', 'clowing8', 'cv3SPWlZ'),
(10, 'Kristofer Yaus', 'kyaus9@goo.gl', '61034 Russell Center', 'Tallahassee', 'FL', '32399', 'kyaus9', 'FRmgOGdZYT'),
(11, 'Evelina Howels', 'ehowelsa@google.co.jp', '56231 Brown Crossing', 'Glendale', 'AZ', '85305', 'ehowelsa', 'BGXX0Ly'),
(12, 'Courtnay Chauvey', 'cchauveyb@sfgate.com', '668 Holy Cross Parkway', 'Tulsa', 'OK', '74193', 'cchauveyb', 'X7MHHJwK'),
(13, 'Yolane Dealy', 'ydealyc@surveymonkey.com', '31 Melody Pass', 'Indianapolis', 'IN', '46207', 'ydealyc', 'BHeNhys3B9'),
(14, 'Winthrop Kisting', 'wkistingd@1und1.de', '5 Kennedy Drive', 'Toledo', 'OH', '43656', 'wkistingd', '30g9n8j77F7y'),
(15, 'Elinor Napper', 'enappere@sina.com.cn', '9953 Acker Point', 'Des Moines', 'IA', '50347', 'enappere', 'SbpPPj'),
(16, 'Boyd Steger', 'bstegerf@angelfire.com', '0 Jenna Circle', 'Colorado Springs', 'CO', '80910', 'bstegerf', 'Dl9cLlslGBA'),
(17, 'Christian Bartolomeazzi', 'cbartolomeazzig@gravatar.com', '6 Duke Point', 'Melbourne', 'FL', '32919', 'cbartolomeazzig', 'LVluyICOpvK'),
(18, 'Adamo Cosbey', 'acosbeyh@sohu.com', '10 Del Mar Park', 'Phoenix', 'AZ', '85053', 'acosbeyh', 'y7k6ms9'),
(19, 'Xenos Molyneaux', 'xmolyneauxi@163.com', '688 Stoughton Lane', 'Las Vegas', 'NV', '89160', 'xmolyneauxi', 'g3dvavtUvxqQ'),
(20, 'Marlie Rigge', 'mriggej@hhs.gov', '8589 Hooker Street', 'Orlando', 'FL', '32859', 'mriggej', 'HdGAVPms6'),
(21, 'tom', 'tom', 'tom', NULL, NULL, NULL, NULL, NULL),
(22, 'Vivien Nguyen', 'vivien.nguyen94@gmail.com', '3010 Grandview Avenue', NULL, NULL, NULL, 'vivien2', 'chachas2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`cid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
