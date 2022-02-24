-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: sandcrawler
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `sandcrawler`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sandcrawler` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sandcrawler`;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `address_one` varchar(255) NOT NULL,
  `address_two` varchar(255) DEFAULT NULL,
  `address_three` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses__customers` (`customer_id`),
  CONSTRAINT `addresses__customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` varchar(36) NOT NULL,
  `cart_id` varchar(36) NOT NULL,
  `item_id` int NOT NULL,
  `price_on_add` int NOT NULL,
  `created` varchar(25) NOT NULL,
  `updated` varchar(25) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items__carts` (`cart_id`),
  KEY `cart_items__items` (`item_id`),
  CONSTRAINT `cart_items__carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `cart_items__items` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` varchar(36) NOT NULL,
  `created` varchar(25) NOT NULL,
  `updated` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email_idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_pricing_books`
--

DROP TABLE IF EXISTS `item_pricing_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_pricing_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `amount` int NOT NULL,
  `sale_name` varchar(100) DEFAULT NULL,
  `valid_from` varchar(25) DEFAULT NULL,
  `valid_to` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_pricing_books__items` (`item_id`),
  CONSTRAINT `item_pricing_books__items` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_pricing_books`
--

LOCK TABLES `item_pricing_books` WRITE;
/*!40000 ALTER TABLE `item_pricing_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_pricing_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_specs`
--

DROP TABLE IF EXISTS `item_specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_specs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `label` varchar(255) NOT NULL,
  `spec_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_specs__items` (`item_id`),
  CONSTRAINT `item_specs__items` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_specs`
--

LOCK TABLES `item_specs` WRITE;
/*!40000 ALTER TABLE `item_specs` DISABLE KEYS */;
INSERT INTO `item_specs` VALUES (1,1,'Height','1.7 meters'),(2,1,'Photoreceptors','2 (human range)'),(3,1,'Auditory receptors','2 (human range)'),(4,1,'Olfactory receptor','1'),(5,1,'Class','Protocol droid'),(6,1,'Restraining bolt mount','1 (included)');
/*!40000 ALTER TABLE `item_specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `msrp` int NOT NULL DEFAULT '0',
  `manufacturer` varchar(255) DEFAULT NULL,
  `description` blob,
  `overview` blob,
  `warranty` blob,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'3PO-series protocol droid',299999,'Cybot Galactica',_binary 'The typical 3PO-series droid stands 1.7 meters in height with a humanoid build. Units are programmed with a subservient, service oriented personality and will never attack, under any circumstances even in self-defense.\n\nWith its standard components (head, torso, legs, arms and hands), a 3PO unit weighs 77.6 kg, and its maximal speed is 21km/hr.\n\nEach droid is equipped with a SyntheTech AA-1 VerboBrain making them capable of storing enormous amounts of information, the additional memory space is often used to keep communication modules in the active memory so that long delays may be avoided while searching for linguistic information on mid-translation. A TranLang III communications module allows them to be fluent in over six million forms of communication, even if they can not respond in all of them for a lack of proper communication appendages. They also have the skills necessary to quickly analyze new unregistered languages and translate them into more well-known ones.\n\nThey are even provided with an olfactory sensor that allows them to comprehend pheromonal communication.',_binary '3PO-series protocol droids are eequipped with a SyntheTech AA-1 VerboBrain making them capable of storing enormous amounts of information, the additional memory space is often used to keep communication modules in the active memory so that long delays can be avoided while searching for linguistic information on mid-translation.',_binary 'In no event shall Cybot Galactica be liable for consequential damages for breach of this warranty. Some States do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to the buyer.\n\nCybot Galactica warrants the Covered Product to be free of all defects in material and workmanship for 30 from date of delivery. This warranty extends to the original buyer (only or and each successive buyer within the warranty period).\n\nWithin the period of this warranty, Cybot Galactica will repair or replace, free of charge; any part proving defective in material or workmanship. All warranty repairs and service must be performed by an authorized Cybot Galactica technician, or at an authorized Cybot Galactica service facility.','https://static.wikia.nocookie.net/starwars/images/8/85/PrissyAndPrissier-ST.jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` varchar(36) NOT NULL,
  `order_summary_id` varchar(36) NOT NULL,
  `item_id` int NOT NULL,
  `cart_item_id` varchar(36) NOT NULL,
  `unit_price` int NOT NULL,
  `unit_discount` int DEFAULT '0',
  `quantity` int NOT NULL DEFAULT '1',
  `volume_discount` int DEFAULT '0',
  `subtotal` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details__order_summaries` (`order_summary_id`),
  KEY `order_details__cart_items` (`cart_item_id`),
  KEY `order_details__items` (`item_id`),
  CONSTRAINT `order_details__cart_items` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_items` (`id`),
  CONSTRAINT `order_details__items` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `order_details__order_summary` FOREIGN KEY (`order_summary_id`) REFERENCES `order_summaries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_summaries`
--

DROP TABLE IF EXISTS `order_summaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_summaries` (
  `id` varchar(36) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `ship_to_address_id` varchar(36) NOT NULL,
  `bill_to_address_id` varchar(36) NOT NULL,
  `subtotal` int NOT NULL,
  `tax_total` int NOT NULL DEFAULT '0',
  `total` int NOT NULL,
  `cart_id` varchar(36) NOT NULL,
  `charge_id` varchar(50) NOT NULL,
  `charged` tinyint(1) DEFAULT '0',
  `created` varchar(25) NOT NULL,
  `updated` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_idx` (`created`),
  KEY `charged_idx` (`charged`),
  KEY `order_summaries__carts` (`cart_id`),
  KEY `order_summaries_shipping__addresses` (`ship_to_address_id`),
  KEY `order_summaries_billing__addresses` (`bill_to_address_id`),
  KEY `order_summaries__customers` (`customer_id`),
  CONSTRAINT `order_summaries__carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `order_summaries__customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `order_summaries_billing__addresses` FOREIGN KEY (`bill_to_address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `order_summaries_shipping__addresses` FOREIGN KEY (`ship_to_address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_summaries`
--

LOCK TABLES `order_summaries` WRITE;
/*!40000 ALTER TABLE `order_summaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_summaries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-24  5:07:07
