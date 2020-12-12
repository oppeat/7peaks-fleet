CREATE DATABASE  IF NOT EXISTS `db_vehicletracking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_vehicletracking`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_vehicletracking
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_vehicles`
--

DROP TABLE IF EXISTS `user_vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `vehicleId` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vehicles`
--

LOCK TABLES `user_vehicles` WRITE;
/*!40000 ALTER TABLE `user_vehicles` DISABLE KEYS */;
INSERT INTO `user_vehicles` VALUES (5,'1','100000987654'),(6,'1','100000987655'),(7,'1','100000987656'),(8,'1','100000987657'),(9,'1','100000987658'),(10,'1','100000987659'),(11,'1','100000987660'),(12,'2','100000987661'),(13,'2','100000987662'),(14,'2','40000098763'),(15,'2','40000098764');
/*!40000 ALTER TABLE `user_vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'TestUser01'),(2,'TestUser02'),(3,'TestUser03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_location`
--

DROP TABLE IF EXISTS `vehicle_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicleId` varchar(45) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_location`
--

LOCK TABLES `vehicle_location` WRITE;
/*!40000 ALTER TABLE `vehicle_location` DISABLE KEYS */;
INSERT INTO `vehicle_location` VALUES (1,'100000987654','100.142','78.997','2020-12-12 11:04:41'),(2,'100000987654','100.654','79.168','2020-12-12 11:52:11'),(3,'100000987654','100.656','79.164','2020-12-12 12:16:21'),(4,'40000098764','100.656','79.164','2020-12-12 12:43:08'),(5,'40000098764','100.657','79.164','2020-12-12 12:43:15'),(6,'40000098764','100.660','79.182','2020-12-12 12:43:22'),(7,'40000098764','100.660','79.189','2020-12-12 12:43:26'),(8,'40000098764','100.660','79.189','2020-12-12 12:43:31'),(9,'40000098764','100.660','79.189','2020-12-12 12:43:32'),(10,'40000098764','100.660','81.75','2020-12-12 12:43:40');
/*!40000 ALTER TABLE `vehicle_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `Gid` int NOT NULL AUTO_INCREMENT,
  `vehicleId` varchar(45) DEFAULT NULL,
  `dateCreate` datetime DEFAULT NULL,
  PRIMARY KEY (`Gid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (5,'100000987654','2020-12-12 11:04:41'),(6,'100000987655','2020-12-12 11:26:09'),(7,'100000987656','2020-12-12 11:26:17'),(8,'100000987657','2020-12-12 11:26:21'),(9,'100000987658','2020-12-12 11:26:25'),(10,'100000987659','2020-12-12 11:26:30'),(11,'100000987660','2020-12-12 11:26:38'),(12,'100000987661','2020-12-12 11:26:48'),(13,'100000987662','2020-12-12 11:26:52'),(14,'40000098763','2020-12-12 11:27:02'),(15,'40000098764','2020-12-12 11:27:08');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-12 13:04:00
