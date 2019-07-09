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
-- Table structure for table `registered`
--

DROP TABLE IF EXISTS `registered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registered` (
  `courseId` varchar(20) NOT NULL,
  `participantId` varchar(20) NOT NULL,
  PRIMARY KEY (`courseId`,`participantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registered`
--

LOCK TABLES `registered` WRITE;
/*!40000 ALTER TABLE `registered` DISABLE KEYS */;
INSERT INTO `registered` VALUES ('1','_1qciqmry7'),('1','_28wzyeicp'),('1','_3253425'),('1','_kh7plxetv'),('1','_ldy6kk2px'),('1','_ygge7n8s9'),('2','_15a7gkwco'),('2','_5473452'),('2','_9897gb2pp'),('2','_abndkinn5'),('2','_bx9e2znqh'),('2','_gunz89kn5'),('2','_ir2ul5twu'),('2','_kyz6mmufs'),('2','_ldy6kk2px'),('2','_lfo4nmfub'),('2','_ljgxxipl4'),('2','_m0454bjdu'),('2','_ml86i3zav'),('2','_nvogx94t3'),('3','_2436717'),('3','_3123245'),('3','_6ris8cijt'),('3','_754dfaqv7'),('3','_9897gb2pp'),('3','_abndkinn5'),('3','_kyz6mmufs'),('3','_ldy6kk2px'),('3','_lfo4nmfub'),('3','_ljgxxipl4'),('3','_t50j7d9hm'),('4','_3cfg5kklc'),('4','_6ris8cijt'),('4','_9897gb2pp'),('4','_abndkinn5'),('4','_betd361k2'),('4','_ldy6kk2px'),('4','_nvogx94t3'),('4','_qlqbej6w9'),('5','_ldy6kk2px'),('5','_m0454bjdu');
/*!40000 ALTER TABLE `registered` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-09  0:59:47
