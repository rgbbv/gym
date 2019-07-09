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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('_15a7gkwco','asdasd','qdd'),('_1qciqmry7','zxca','zxcac'),('_28wzyeicp','dfs','rsgr'),('_3aap4lrg0','asdace','asd@asc.co'),('_3cfg5kklc','yjftyfa','ytkvotu'),('_6ae3ak0ns','aaa','aaa'),('_6ris8cijt','sdcsdc','rgrgdb@gmail.com'),('_754dfaqv7','zcx','asd@asd.com'),('_9897gb2pp','aqz','aqz@gmail.com'),('_abndkinn5','asdq','asdac'),('_betd361k2','wef','erv'),('_brpf8r8dm','sdf','sdv'),('_dyi4hc1se','zxc','zxc'),('_gunz89kn5','qqqq','qqqq'),('_ir2ul5twu','xcac','xasx'),('_kh7plxetv','zae','zae'),('_kyz6mmufs','sdf','csd'),('_ldy6kk2px','rg','rg'),('_lfo4nmfub','sdf','sdf'),('_ljgxxipl4','acxdg','axczxc'),('_ml86i3zav','ergsdf','fsdffsdf'),('_nvogx94t3','zxc','rgb@gmail.com'),('_oik1dt5dc','asdfasd','asdfa'),('_oxj49se2g','qwez','qwer'),('_ppzfwxo38','eddd','asd@'),('_qlqbej6w9','asdwef','rgbbv23@gmail.com'),('_rap9derm1','reg','wrg'),('_t50j7d9hm','rgbbv','rgbbv@gmail.com'),('_wzv4lks2u','erw','erw'),('_ygge7n8s9','qwe','qwe'),('_yz3lga5eb','axzc','zxc');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
