-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: gymdb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `waiting`
--

DROP TABLE IF EXISTS `waiting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `waiting` (
  `courseId` varchar(20) NOT NULL,
  `participantId` varchar(20) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`courseId`,`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waiting`
--

LOCK TABLES `waiting` WRITE;
/*!40000 ALTER TABLE `waiting` DISABLE KEYS */;
INSERT INTO `waiting` VALUES ('1','_6ae3ak0ns','2019-07-08 13:33:56'),('1','_9897gb2pp','2019-07-08 20:45:46'),('1','_abndkinn5','2019-07-08 13:19:00'),('1','_bx9e2znqh','2019-07-08 12:10:50'),('1','_dyi4hc1se','2019-07-07 10:58:42'),('1','_gunz89kn5','2019-07-08 13:29:04'),('1','_ir2ul5twu','2019-07-08 11:25:43'),('1','_kyz6mmufs','2019-07-08 11:24:16'),('1','_ljgxxipl4','2019-07-08 13:17:01'),('1','_m0454bjdu','2019-07-07 13:22:16'),('1','_nvogx94t3','2019-07-08 20:54:20'),('1','_ox0jjp9gr','2019-07-07 10:56:57'),('1','_oxj49se2g','2019-07-08 13:32:02'),('1','_qlqbej6w9','2019-07-08 14:30:19'),('1','_yz3lga5eb','2019-07-07 10:53:16');
/*!40000 ALTER TABLE `waiting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-09  0:59:48
