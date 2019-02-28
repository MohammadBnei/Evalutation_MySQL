-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 192.168.99.100    Database: eval_mysql_db
-- ------------------------------------------------------
-- Server version	8.0.13
 SET NAMES utf8 ;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `email`, `name`, `surname`, `img`, `password`, `isAdmin`, `createdAt`) VALUES (1,'admin@eval.com','Super','Admin','2c29af10-3ba6-11e9-8f56-43c827115205.jpg','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',1,'2019-02-28 21:54:37'),(2,'test@dummy.com','Test','Dummy','40de6f40-3ba6-11e9-8f56-43c827115205.jpg','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',0,'2019-02-28 21:55:11');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-28 23:37:15
