-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2019 at 10:49 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `configtable`
--

CREATE TABLE `configtable` (
  `ID` int(10) UNSIGNED NOT NULL,
  `OptionType` varchar(20) DEFAULT NULL,
  `OptionValue` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `configtable`
--

INSERT INTO `configtable` (`ID`, `OptionType`, `OptionValue`) VALUES
(1, 'Department', 'Recruitments'),
(2, 'Department', 'Development'),
(3, 'Active', 'No'),
(4, 'Active', 'Yes'),
(5, 'JobBand', 'A1'),
(6, 'JobBand', 'A2'),
(7, 'JobBand', 'A3'),
(8, 'BusinessTitle', 'Assistant Manager'),
(9, 'BusinessTitle', 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `employeemaster`
--

CREATE TABLE `employeemaster` (
  `EmpID` int(5) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Initials` varchar(10) DEFAULT NULL,
  `FullName` varchar(100) NOT NULL,
  `FatherName` varchar(100) DEFAULT NULL,
  `SpouseName` varchar(50) DEFAULT NULL,
  `DOB` date NOT NULL,
  `Department` varchar(50) NOT NULL,
  `JoiningDate` date NOT NULL,
  `BusinessTitle` varchar(50) NOT NULL,
  `CorporateTitle` varchar(50) NOT NULL,
  `MobileNo` char(10) DEFAULT NULL,
  `AlternateContactNo` varchar(15) DEFAULT NULL,
  `PAN` varchar(15) DEFAULT NULL,
  `AADHAAR` varchar(15) DEFAULT NULL,
  `PF_NO` varchar(15) DEFAULT NULL,
  `PF_UAN` varchar(15) DEFAULT NULL,
  `PassportNo` varchar(15) DEFAULT NULL,
  `JobBand` varchar(15) NOT NULL,
  `CompanyID` varchar(15) NOT NULL,
  `LeavingDate` date DEFAULT NULL,
  `ResignationDate` date DEFAULT NULL,
  `Active` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employeemaster`
--

INSERT INTO `employeemaster` (`EmpID`, `FirstName`, `MiddleName`, `LastName`, `Initials`, `FullName`, `FatherName`, `SpouseName`, `DOB`, `Department`, `JoiningDate`, `BusinessTitle`, `CorporateTitle`, `MobileNo`, `AlternateContactNo`, `PAN`, `AADHAAR`, `PF_NO`, `PF_UAN`, `PassportNo`, `JobBand`, `CompanyID`, `LeavingDate`, `ResignationDate`, `Active`) VALUES
(1001, 'Nanda', '', 'Kumar', 'K', 'Nanda Kumar  K', NULL, NULL, '0000-00-00', 'Recruitments', '2018-03-09', 'Assistant Manager', '', NULL, NULL, 'ARBPN4209J', '810080058763', NULL, NULL, NULL, 'A2', 'SITS', NULL, NULL, 'Yes'),
(1002, 'Kavitha', '', 'Siddharth', NULL, 'Kavitha Siddharth', NULL, NULL, '0000-00-00', 'Recruitments', '2018-09-03', 'Assistant Manager', '', NULL, NULL, 'ANAPG9898P', '230808898888', NULL, NULL, NULL, 'A2', 'SITS', NULL, NULL, 'Yes'),
(1003, 'Priyanka  ', '', '  ', 'K M', 'Priyanka  K M', '  S. Shankar', '', '1998-02-03', 'Recruitments', '2018-09-03', 'Assistant Manager', '', '9890790787', '44-4234 3243', 'BWLPK8787N  ', '813423423423', '', '', '', 'A3', 'SITS', '0000-00-00', '0000-00-00', 'Yes'),
(1004, 'James', 'Joseph', 'Raj', 'R', 'James Joseph Raj R', 'Rober', 'Carolin', '1980-10-28', 'Development', '2017-01-01', 'Manager', '', '9083409823', '44 - 4215 2171', 'ADOJI9879F', '987987987897', 'TN/MAS/01673/24', '10034124213432', 'Z34132412', 'A1', 'SUSPL', '2019-01-25', '2019-01-10', 'No'),
(1005, 'TamilSelvan', '', '', 'K', 'TamilSelvan  K', 'Santhanam', 'Aishwar', '2000-02-01', 'Development', '2016-01-01', 'Assistant Manager', '', '8989899989', '434-34324344', 'OIOIJ3424F', '342334323242', 'TN/MAS/0988/343', '100341324001', 'E324981324', 'A2', 'SUSPL', '0000-00-00', '0000-00-00', 'Yes'),
(1006, 'New', '', 'Old', '', 'New  Old ', 'Very Old', '', '1986-10-10', 'Recruitments', '2018-11-01', 'Assistant Manager', '', '', '', '', '', '', '', '', 'A1', 'SITS', '0000-00-00', '0000-00-00', '');

-- --------------------------------------------------------

--
-- Table structure for table `salarymaster`
--

CREATE TABLE `salarymaster` (
  `EmpID` int(5) NOT NULL,
  `PayPeriodType` varchar(15) NOT NULL,
  `BasicPay` int(8) UNSIGNED DEFAULT '0',
  `SpecialAllowance` int(8) UNSIGNED DEFAULT '0',
  `HRA` int(8) UNSIGNED DEFAULT '0',
  `MedicalAllowance` int(8) UNSIGNED DEFAULT '0',
  `ConveyanceAllowance` int(8) UNSIGNED DEFAULT '0',
  `MedicalInsurance` int(8) UNSIGNED DEFAULT '0',
  `TelephoneAllowance` int(8) UNSIGNED DEFAULT '0',
  `Allowance1` int(8) UNSIGNED DEFAULT '0',
  `Allowance2` int(8) UNSIGNED DEFAULT '0',
  `Allowance3` int(8) UNSIGNED DEFAULT '0',
  `PFDeductionEmployee` int(8) UNSIGNED DEFAULT '0',
  `PFDeductionEmployer` int(8) UNSIGNED DEFAULT '0',
  `CTC` int(8) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `salarymaster`
--

INSERT INTO `salarymaster` (`EmpID`, `PayPeriodType`, `BasicPay`, `SpecialAllowance`, `HRA`, `MedicalAllowance`, `ConveyanceAllowance`, `MedicalInsurance`, `TelephoneAllowance`, `Allowance1`, `Allowance2`, `Allowance3`, `PFDeductionEmployee`, `PFDeductionEmployer`, `CTC`) VALUES
(1001, 'monthly', 20767, 9610, 8307, 1250, 1600, 0, 0, 0, 0, 0, 0, 1800, 43333),
(1002, 'monthly', 19934, 9110, 7973, 1250, 1600, 0, 0, 0, 0, 0, 0, 1800, 41667),
(1003, 'monthly', 12579, 497, 5031, 1250, 1600, 0, 0, 0, 0, 0, 0, 1461, 26667);

-- --------------------------------------------------------

--
-- Table structure for table `salarytrans`
--

CREATE TABLE `salarytrans` (
  `ID` int(10) UNSIGNED NOT NULL,
  `EmpID` int(5) NOT NULL,
  `Period` varchar(15) DEFAULT NULL,
  `BasicPay` int(8) UNSIGNED DEFAULT '0',
  `SpecialAllowance` int(8) UNSIGNED DEFAULT '0',
  `HRA` int(8) UNSIGNED DEFAULT '0',
  `MedicalAllowance` int(8) UNSIGNED DEFAULT '0',
  `ConveyanceAllowance` int(8) UNSIGNED DEFAULT '0',
  `Arrears` int(8) UNSIGNED DEFAULT '0',
  `Others` int(8) UNSIGNED DEFAULT '0',
  `GrossSalary` int(8) UNSIGNED DEFAULT '0',
  `PFDeductions` int(8) UNSIGNED DEFAULT '0',
  `ESIDeductions` int(8) UNSIGNED DEFAULT '0',
  `PTDeductions` int(8) UNSIGNED DEFAULT '0',
  `TDS` int(8) UNSIGNED DEFAULT '0',
  `Advance` int(8) UNSIGNED DEFAULT '0',
  `LOP` int(8) UNSIGNED DEFAULT '0',
  `OtherDeductions` int(8) UNSIGNED DEFAULT '0',
  `TotalDeductions` int(8) UNSIGNED DEFAULT '0',
  `TotalEarnings` int(8) UNSIGNED DEFAULT '0',
  `NetPay` int(8) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`ID`, `Name`) VALUES
(10001, 'James Raj'),
(10002, 'Joseph Valan'),
(100003, 'John Doe');

-- --------------------------------------------------------

--
-- Table structure for table `useradmin`
--

CREATE TABLE `useradmin` (
  `UserID` int(5) NOT NULL,
  `Password` varchar(10) NOT NULL,
  `Role` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `useradmin`
--

INSERT INTO `useradmin` (`UserID`, `Password`, `Role`) VALUES
(1001, '1001', 'U'),
(1020, '1020', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `workedhours`
--

CREATE TABLE `workedhours` (
  `ID` int(10) UNSIGNED NOT NULL,
  `EmpID` int(5) UNSIGNED NOT NULL,
  `Period` varchar(15) NOT NULL,
  `DateFrom` date NOT NULL,
  `DateTo` date NOT NULL,
  `TotalUnits` int(3) UNSIGNED DEFAULT '0',
  `WorkedUnits` int(3) UNSIGNED DEFAULT '0',
  `LeaveUnits` int(3) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workedhours`
--

INSERT INTO `workedhours` (`ID`, `EmpID`, `Period`, `DateFrom`, `DateTo`, `TotalUnits`, `WorkedUnits`, `LeaveUnits`) VALUES
(1, 1001, 'monthly', '2018-10-01', '2018-10-31', 31, 29, 2),
(2, 1002, 'monthly', '2018-10-01', '2018-10-31', 31, 31, 0),
(3, 1003, 'monthly', '2018-10-01', '2018-10-31', 31, 30, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configtable`
--
ALTER TABLE `configtable`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `employeemaster`
--
ALTER TABLE `employeemaster`
  ADD PRIMARY KEY (`EmpID`);

--
-- Indexes for table `salarymaster`
--
ALTER TABLE `salarymaster`
  ADD PRIMARY KEY (`EmpID`);

--
-- Indexes for table `salarytrans`
--
ALTER TABLE `salarytrans`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `useradmin`
--
ALTER TABLE `useradmin`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `workedhours`
--
ALTER TABLE `workedhours`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configtable`
--
ALTER TABLE `configtable`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `salarytrans`
--
ALTER TABLE `salarytrans`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workedhours`
--
ALTER TABLE `workedhours`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
