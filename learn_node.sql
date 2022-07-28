-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 28, 2022 at 04:32 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learn_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_data`
--

CREATE TABLE `tb_data` (
  `id` int(8) NOT NULL,
  `id_data` int(8) NOT NULL,
  `judul` varchar(50) NOT NULL,
  `link` text NOT NULL,
  `text` text NOT NULL,
  `ins` datetime DEFAULT NULL,
  `ins_l` int(11) DEFAULT NULL,
  `upd` datetime DEFAULT NULL,
  `upd_l` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `tb_data`
--

INSERT INTO `tb_data` (`id`, `id_data`, `judul`, `link`, `text`, `ins`, `ins_l`, `upd`, `upd_l`) VALUES
(1, 2, 'Adakah Yang Baru', 'adakahyangbaru.com', 'testsdsd', '2021-01-03 21:50:51', 1, '2021-01-05 19:50:47', 1),
(2, 5, 'dddd', 'www', 'eeesss', '2021-01-03 21:56:17', 1, '2021-01-05 23:26:13', 1),
(3, 3, 'asd', 'asd', 'asd', '2022-01-13 09:41:10', 1, '2022-01-13 09:41:10', 1),
(4, 4, 'asd', 'asd', 'asd', '2022-07-28 00:31:29', 1, '2022-07-28 00:31:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id_users` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` enum('admin','users') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id_users`, `nama`, `email`, `foto`, `username`, `password`, `level`) VALUES
(1, 'Alan Lengkoan', 'alan@gmail.com', 'attachment.jpg', 'admin', '$2a$08$8Hzx/7ZTwROq/rxwJJFI9.pmECdKlJ3LpzGYLEQIDXybjaqeB3SLe', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_data`
--
ALTER TABLE `tb_data`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `id_data` (`id_data`) USING BTREE;

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id_users`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_data`
--
ALTER TABLE `tb_data`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
