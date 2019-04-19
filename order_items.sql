-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2019 at 06:29 PM
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
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `orderID` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `ship_status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`orderID`, `pid`, `qty`, `ship_status`) VALUES
(1, 1, 46, 'DELIVERED'),
(2, 2, 21, 'DELIVERED'),
(3, 3, 93, 'SHIPPED'),
(4, 4, 88, 'SHIPPED'),
(5, 5, 38, 'DELIVERED'),
(6, 6, 47, 'SHIPPED'),
(7, 7, 98, 'SHIPPED'),
(8, 8, 23, 'DELIVERED'),
(9, 9, 30, 'SHIPPED'),
(10, 10, 36, 'DELIVERED'),
(11, 11, 32, 'SHIPPED'),
(12, 12, 50, 'DELIVERED'),
(13, 13, 9, 'DELIVERED'),
(14, 14, 8, 'SHIPPED'),
(15, 15, 92, 'DELIVERED'),
(16, 16, 50, 'DELIVERED'),
(17, 17, 73, 'SHIPPED'),
(18, 18, 87, '-'),
(19, 19, 38, 'SHIPPED'),
(20, 20, 54, '-'),
(21, 1, 3, '-'),
(21, 2, 1, '-'),
(22, 4, 5, '-');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`orderID`,`pid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
