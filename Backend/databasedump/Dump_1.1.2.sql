CREATE DATABASE  IF NOT EXISTS `zakaz` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zakaz`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: zakaz
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (10,'Автоинструкторы'),(7,'Артисты'),(5,'Бухгалтеры и юристы'),(9,'Ветеринары'),(11,'Врачи'),(8,'Домашний персонал'),(3,'Мастера красоты'),(1,'Мастера по ремонту'),(2,'Репетиторы'),(6,'Спортивные тренеры'),(4,'Фрилансеры');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citys`
--

DROP TABLE IF EXISTS `citys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `city_UNIQUE` (`city`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citys`
--

LOCK TABLES `citys` WRITE;
/*!40000 ALTER TABLE `citys` DISABLE KEYS */;
INSERT INTO `citys` VALUES (4,'Екатеринбург'),(1,'Москва'),(999,'Не указан'),(3,'Новосибирск'),(2,'Санкт-Петербург');
/*!40000 ALTER TABLE `citys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Начальное общее образование'),(2,'Основное общее образование'),(3,'Среднее общее образование'),(4,'Среднее профессиональное образование'),(5,'Высшее образование'),(6,'Высшее образование — бакалавриат'),(7,'Высшее образование — специалитет, магистратура');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joblist`
--

DROP TABLE IF EXISTS `joblist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joblist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `joblist_keys_idx` (`category_id`),
  CONSTRAINT `joblist_keys` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joblist`
--

LOCK TABLES `joblist` WRITE;
/*!40000 ALTER TABLE `joblist` DISABLE KEYS */;
INSERT INTO `joblist` VALUES (1,'Сантехники',1),(2,'Электрики',1),(3,'Плиточники',1),(4,'Штукатуры',1),(5,'Ремонт под ключ',1),(6,'Английский язык',2),(7,'Математика',2),(8,'Русский язык',2),(9,'Начальная школа',2),(10,'Музыка',2),(11,'Макияж',3),(12,'Маникюр',3),(13,'Причёски',3),(14,'Эпиляция',3),(15,'Стилисты',3),(16,'Работа с текстами',4),(17,'Дизайнеры',4),(18,'Системные администраторы',4),(19,'Маркетинг',4),(20,'Переводчики',4),(21,'Юристы',5),(22,'Бухгалтеры',5),(23,'Риелторы',5),(24,'Бизнес-консультанты',5),(25,'Кадровики',5),(26,'Фитнес',6),(27,'Йога',6),(28,'Пилатес',6),(29,'Стретчинг',6),(30,'Аэробика',6),(31,'Музыканты',7),(32,'Танцоры',7),(33,'Ведущие',7),(34,'Фокусники',7),(35,'Клоуны',7),(36,'Домработницы',8),(37,'Водители',8),(38,'Выгул собак',8),(39,'Сиделки',8),(40,'Повара',8),(41,'Передержка животных',9),(42,'Груминг',9),(43,'Кинология',9),(44,'Сельскохозяйственные работы',9),(45,'Ветеринарная терапия',9),(46,'Вождение (МКПП)',10),(47,'Вождение (АКПП)',10),(48,'Вождение мотоцикла',10),(49,'Теория ПДД',10),(50,'Контраварийное вождение',10),(51,'Гинекологи',11),(52,'Дерматологи',11),(53,'Отоларингологи',11),(54,'Педиатры',11),(55,'УЗИ',11);
/*!40000 ALTER TABLE `joblist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pwd` char(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` tinyint NOT NULL,
  `phone` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,'1@1','$2a$10$Q4XkQdC7OHSc0e7.Ro1ZFuYixVIjEMNiPTXqnlav7vfvhX5MbgQJC',1,NULL),(2,'2@2','$2a$10$Q4XkQdC7OHSc0e7.Ro1ZFuYixVIjEMNiPTXqnlav7vfvhX5MbgQJC',0,NULL),(3,'3@3','$2a$10$Q4XkQdC7OHSc0e7.Ro1ZFuYixVIjEMNiPTXqnlav7vfvhX5MbgQJC',1,NULL),(15,'8@8','$2a$10$Q4XkQdC7OHSc0e7.Ro1ZFuYixVIjEMNiPTXqnlav7vfvhX5MbgQJC',0,NULL),(18,'44@44','$2a$10$S9z6ZEM7AlI/5c9pEBdsZOjxdMxaail/ceJ3h14ughjV/huNpW4ny',1,NULL),(19,'55@55','$2a$10$2zHfxsBm.GRTqhHySACP3uCXayzh4imLHB7Y3KnmsF0W/X68eBG9u',1,NULL),(20,'33@33','$2a$10$ewqWgEEt/tzk57PdiQRpT.ac1QfWZld/MuBwRIyJNwwQNhuEy9zKu',0,NULL);
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_joblist`
--

DROP TABLE IF EXISTS `master_joblist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_joblist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `master_id` int NOT NULL,
  `joblist_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idmaster_joblist_UNIQUE` (`id`),
  KEY `master_job_key_idx` (`master_id`),
  KEY `joblist_id_key_idx` (`joblist_id`),
  CONSTRAINT `joblist_id_key` FOREIGN KEY (`joblist_id`) REFERENCES `joblist` (`id`),
  CONSTRAINT `master_id_key` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_joblist`
--

LOCK TABLES `master_joblist` WRITE;
/*!40000 ALTER TABLE `master_joblist` DISABLE KEYS */;
INSERT INTO `master_joblist` VALUES (20,3,1),(21,3,2),(22,3,3),(23,1,1),(24,1,4),(25,1,6),(26,1,7),(27,1,8);
/*!40000 ALTER TABLE `master_joblist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masters`
--

DROP TABLE IF EXISTS `masters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `city_id` int DEFAULT '999',
  `education_id` tinyint DEFAULT NULL,
  `experience` tinyint unsigned DEFAULT NULL,
  `price` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `info` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `photo` longblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `citys_key_idx` (`city_id`),
  KEY `edu_keys_idx` (`education_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masters`
--

LOCK TABLES `masters` WRITE;
/*!40000 ALTER TABLE `masters` DISABLE KEYS */;
INSERT INTO `masters` VALUES (1,'Вася','Пупкин','1999-12-22 00:00:00',3,4,99,'ok go','ok go',NULL),(3,'Коля','Пупкин','1990-04-15 00:00:00',1,2,14,'1500 руб за все','Разнорабочий',NULL),(18,NULL,NULL,NULL,999,NULL,NULL,NULL,NULL,NULL),(19,NULL,NULL,NULL,999,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `masters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `master_id` int DEFAULT NULL,
  `status_id` int DEFAULT '1',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `accept_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `job_id` int DEFAULT NULL,
  `job_date` datetime DEFAULT NULL,
  `comment` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idorders_UNIQUE` (`id`),
  KEY `status_key_idx` (`status_id`),
  KEY `user_key_idx` (`user_id`),
  KEY `master_key_idx` (`master_id`),
  KEY `order_service_type_id_idx` (`job_id`),
  CONSTRAINT `order_service_type_id` FOREIGN KEY (`job_id`) REFERENCES `joblist` (`id`),
  CONSTRAINT `order_user_id_key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `oreder_master_id_key` FOREIGN KEY (`master_id`) REFERENCES `masters` (`id`),
  CONSTRAINT `status_key` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1,2,'2020-08-28 06:16:39','2020-09-12 14:38:48','2020-08-28 19:08:11',1,'2020-08-30 11:48:03','комент'),(2,2,3,6,'2020-08-28 06:38:31','2020-09-11 23:52:08','2020-09-26 23:47:08',22,'2020-12-12 11:11:00','14444'),(3,2,3,3,'2020-08-28 06:38:54','2020-09-22 19:43:24','2020-08-28 19:08:11',22,'2020-08-24 11:48:03','3333'),(4,2,1,5,'2020-08-28 08:17:52','2020-08-28 19:07:27','2020-09-11 23:52:08',1,'2020-08-29 11:48:03','комент'),(5,2,1,1,'2020-09-11 16:43:06',NULL,NULL,1,'2020-09-07 11:48:03','Стрижка модельная'),(6,2,3,1,'2020-09-11 20:29:32',NULL,NULL,27,'2020-09-18 11:48:03','addComment'),(7,2,3,1,'2020-09-11 20:31:32',NULL,NULL,27,'2020-09-18 15:48:03','Ключ не задан'),(8,2,3,1,'2020-09-11 20:33:23',NULL,NULL,27,'2020-09-25 11:48:03',''),(9,2,3,1,'2020-09-11 20:43:28',NULL,NULL,27,'2020-09-26 11:48:03',NULL),(10,2,3,1,'2020-09-12 22:54:30',NULL,NULL,27,'2020-09-20 15:00:00','Сделать хорошо');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orders_BO_finish` BEFORE UPDATE ON `orders` FOR EACH ROW BEGIN
SET NEW.finish_date = IF(NEW.status_id in (4,5,6), SYSDATE(), NEW.finish_date);
SET NEW.accept_date = IF(NEW.status_id in (2,3), SYSDATE(), NEW.accept_date);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (3,'Выполняется'),(4,'Завершен'),(5,'Отклонен мастером'),(2,'Принят мастером'),(1,'Создан'),(6,'Удален');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!50001 DROP VIEW IF EXISTS `userprofile`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `userprofile` AS SELECT 
 1 AS `id`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `firstname`,
 1 AS `lastname`,
 1 AS `city`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `city_id` int DEFAULT '999',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `city_key_idx` (`city_id`),
  CONSTRAINT `city_key` FOREIGN KEY (`city_id`) REFERENCES `citys` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Томас','Смит',3),(15,'test','tesoff',4),(20,NULL,NULL,999);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'zakaz'
--

--
-- Dumping routines for database 'zakaz'
--

--
-- Final view structure for view `userprofile`
--

/*!50001 DROP VIEW IF EXISTS `userprofile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userprofile` AS select `logins`.`id` AS `id`,`logins`.`email` AS `email`,`logins`.`phone` AS `phone`,`users`.`firstname` AS `firstname`,`users`.`lastname` AS `lastname`,`citys`.`city` AS `city` from ((`logins` left join `users` on((`logins`.`id` = `users`.`id`))) left join `citys` on((`users`.`city_id` = `citys`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-28  8:59:40
