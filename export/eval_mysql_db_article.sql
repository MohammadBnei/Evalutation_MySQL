-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 192.168.99.100    Database: eval_mysql_db
-- ------------------------------------------------------
-- Server version	8.0.13

 SET NAMES utf8 ;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `title`, `content`, `img`, `createdAt`, `user_id`) VALUES (3,'Article numero uno','The first article, created with no categories','84d007f0-3b96-11e9-b699-59602d3a14d3.jpg','2019-02-28 20:25:17',1),(7,'Article numero dos','Test with category, no pictures',NULL,'2019-02-28 21:38:41',1),(8,'Article numero tres','Test with categories, with picture','1aa02910-3ba4-11e9-8ce7-d335cd9a6576.jpg','2019-02-28 21:39:48',1);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;
