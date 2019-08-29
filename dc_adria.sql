-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2019 at 06:41 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dc_adria`
--

-- --------------------------------------------------------

--
-- Table structure for table `abonne`
--

CREATE TABLE `abonne` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `abonne`
--

INSERT INTO `abonne` (`id`, `nom`, `password`, `prenom`, `username`) VALUES
(28, 'amina', '$2a$10$hDR82xftzO3mGnVNiJKImOq1ImSMD0K2ExV3TYA2vRrkdI5.73N1W', 'khushfi', 'the_third'),
(25, 'hakim', '$2a$10$gWJAA7PSCpfWztOnOx9xMewrNin0dM5o8LXExcKSzSF9s2fDHZpzS', 'arhazzal', 'the_one'),
(27, 'laila', '$2a$10$iwuMzBiun2FDIO7PDePtj.i3Fz4lAZFJzSspdHxy6j/cvsY5k.CLi', 'breire', 'the_second');

-- --------------------------------------------------------

--
-- Table structure for table `compte`
--

CREATE TABLE `compte` (
  `id` bigint(20) NOT NULL,
  `beneficiaire` bit(1) NOT NULL,
  `num_compte` int(11) DEFAULT NULL,
  `solde_comptable` double NOT NULL,
  `solde_compte` double NOT NULL,
  `id_abn` bigint(20) DEFAULT NULL,
  `devise` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `compte`
--

INSERT INTO `compte` (`id`, `beneficiaire`, `num_compte`, `solde_comptable`, `solde_compte`, `id_abn`, `devise`) VALUES
(17, b'1', 1, 0, 0, 25, 'MAD'),
(18, b'1', 2, 0, 0, 27, 'MAD'),
(19, b'1', 3, 0, 0, 28, 'EUR'),
(23, b'1', 4, 0, 0, 28, 'USD'),
(24, b'1', 5, 0, 0, 25, 'USD');

-- --------------------------------------------------------

--
-- Table structure for table `demande`
--

CREATE TABLE `demande` (
  `id` bigint(20) NOT NULL,
  `date_creation` date DEFAULT NULL,
  `date_envoie` date DEFAULT NULL,
  `motif` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `id_cpt` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `demande`
--

INSERT INTO `demande` (`id`, `date_creation`, `date_envoie`, `motif`, `status`, `id_cpt`, `type`) VALUES
(105, '2019-08-24', NULL, 'laila test 1', 'abandoned', 18, 'classic'),
(104, '2019-08-24', NULL, 'hakim test 3', 'registred', 17, 'correspondence'),
(103, '2019-08-24', NULL, 'hakim test 2', 'abandoned', 24, 'wallet'),
(102, '2019-08-24', '2019-08-24', 'hakim test 1 ', 'sent', 17, 'classic'),
(106, '2019-08-24', NULL, 'laila test 2', 'registred', 18, 'wallet'),
(107, '2019-08-24', '2019-08-24', 'laila test 3', 'sent', 18, 'correspondence'),
(108, '2019-08-24', NULL, 'amina test 1', 'registred', 19, 'classic'),
(109, '2019-08-24', NULL, 'amina test 2', 'registred', 23, 'wallet'),
(110, '2019-08-24', NULL, 'amina test 3', 'registred', 23, 'correspondence');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abonne`
--
ALTER TABLE `abonne`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_gy9l58qe6eran22q2o4eqxqm1` (`num_compte`),
  ADD KEY `FKms20p2t1v8n0vnso7x0qb77ta` (`id_abn`);

--
-- Indexes for table `demande`
--
ALTER TABLE `demande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKagu3tmqlfse3etnufyc8xgpmt` (`id_cpt`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abonne`
--
ALTER TABLE `abonne`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `compte`
--
ALTER TABLE `compte`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `demande`
--
ALTER TABLE `demande`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
