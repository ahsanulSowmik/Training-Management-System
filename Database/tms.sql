-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: tranning_management_system
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_email` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin@gmail.com',NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `assignment_id` bigint NOT NULL AUTO_INCREMENT,
  `assignment_file` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,'ahsanul_CV.pdf','2023-07-26T18:30','Explain the concept of polymorphism in Java.'),(2,'download (1).png','2023-07-26T19:11','Dummy Assignment 02');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_answer`
--

DROP TABLE IF EXISTS `assignment_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_answer` (
  `answer_id` bigint NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `answer_file` varchar(255) DEFAULT NULL,
  `evaluation` varchar(255) DEFAULT NULL,
  `trainee_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_answer`
--

LOCK TABLES `assignment_answer` WRITE;
/*!40000 ALTER TABLE `assignment_answer` DISABLE KEYS */;
INSERT INTO `assignment_answer` VALUES (3,'dummy ans 02','download (1) (1).png','30','arif@gmail.com');
/*!40000 ALTER TABLE `assignment_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_answer_seq`
--

DROP TABLE IF EXISTS `assignment_answer_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_answer_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_answer_seq`
--

LOCK TABLES `assignment_answer_seq` WRITE;
/*!40000 ALTER TABLE `assignment_answer_seq` DISABLE KEYS */;
INSERT INTO `assignment_answer_seq` VALUES (101);
/*!40000 ALTER TABLE `assignment_answer_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_answers`
--

DROP TABLE IF EXISTS `assignment_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_answers` (
  `assignment_assignment_id` bigint NOT NULL,
  `answers_answer_id` bigint NOT NULL,
  PRIMARY KEY (`assignment_assignment_id`,`answers_answer_id`),
  UNIQUE KEY `UK_suwu4qvgungsahw73agqixb53` (`answers_answer_id`),
  CONSTRAINT `FKp87uxaabxyhespxe6mr4u45yr` FOREIGN KEY (`answers_answer_id`) REFERENCES `assignment_answer` (`answer_id`),
  CONSTRAINT `FKsyrhetd4ounr6yid03olhfjqe` FOREIGN KEY (`assignment_assignment_id`) REFERENCES `assignment` (`assignment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_answers`
--

LOCK TABLES `assignment_answers` WRITE;
/*!40000 ALTER TABLE `assignment_answers` DISABLE KEYS */;
INSERT INTO `assignment_answers` VALUES (2,3);
/*!40000 ALTER TABLE `assignment_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `batch_code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `classroom_classroom_id` bigint DEFAULT NULL,
  PRIMARY KEY (`batch_code`),
  KEY `FKit0ws5vdracsmnoqd6rnk5hhk` (`classroom_classroom_id`),
  CONSTRAINT `FKit0ws5vdracsmnoqd6rnk5hhk` FOREIGN KEY (`classroom_classroom_id`) REFERENCES `classrooms` (`classroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES ('DevOps','DevOps is a set of practices that combine software development (Dev) and IT operations (Ops) to streamline the software development lifecycle, enabling continuous integration, continuous delivery, and automation, fostering collaboration and improvin..','2023-08-31','DevOps','2023-07-01',3),('J2EE','Spring Boot is a powerful Java framework that simplifies the development of production-ready, stand-alone, and microservices-based applications, providing easy configuration, robust dependency management, and rapid development capabilities.','2023-08-31','J2EE','2023-07-01',1),('MERN','MERN is a full-stack development framework that leverages MongoDB, Express.js, React.js, and Node.js to build modern and scalable web applications, providing a seamless end-to-end development experience for front-end and back-end components.','2023-11-30','MERN','2023-08-01',4),('SQA','Software Quality Assurance (SQA) is a systematic and methodical approach to ensure the quality and reliability of software products throughout the software development lifecycle, involving processes such as testing, code reviews.','2023-11-30','SQA','2023-08-01',6);
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_schedules`
--

DROP TABLE IF EXISTS `batch_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_schedules` (
  `batch_batch_code` varchar(255) NOT NULL,
  `schedules_schedule_id` bigint NOT NULL,
  PRIMARY KEY (`batch_batch_code`,`schedules_schedule_id`),
  KEY `FKhsolo1jhtxd7ee3tboh5i9ijh` (`schedules_schedule_id`),
  CONSTRAINT `FKej4wanb6jiafpu8dtnkqr7qr0` FOREIGN KEY (`batch_batch_code`) REFERENCES `batch` (`batch_code`),
  CONSTRAINT `FKhsolo1jhtxd7ee3tboh5i9ijh` FOREIGN KEY (`schedules_schedule_id`) REFERENCES `course_schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_schedules`
--

LOCK TABLES `batch_schedules` WRITE;
/*!40000 ALTER TABLE `batch_schedules` DISABLE KEYS */;
INSERT INTO `batch_schedules` VALUES ('J2EE',1),('J2EE',2),('DevOps',3);
/*!40000 ALTER TABLE `batch_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_trainees`
--

DROP TABLE IF EXISTS `batch_trainees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_trainees` (
  `batch_batch_code` varchar(255) NOT NULL,
  `trainees` varchar(255) DEFAULT NULL,
  KEY `FKl9l16f6cbwbghfhqvv80b4pon` (`batch_batch_code`),
  CONSTRAINT `FKl9l16f6cbwbghfhqvv80b4pon` FOREIGN KEY (`batch_batch_code`) REFERENCES `batch` (`batch_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_trainees`
--

LOCK TABLES `batch_trainees` WRITE;
/*!40000 ALTER TABLE `batch_trainees` DISABLE KEYS */;
INSERT INTO `batch_trainees` VALUES ('J2EE','akash@gmail.com'),('J2EE','alamin@gmail.com'),('DevOps','antu@gmail.com'),('J2EE','arif@gmail.com'),('J2EE','ariful@gmail.com'),('J2EE','arup@gmail.com'),('J2EE','habibullah@gmail.com'),('J2EE','khalid@gmail.com'),('DevOps','rony@gmail.com');
/*!40000 ALTER TABLE `batch_trainees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_room_notice`
--

DROP TABLE IF EXISTS `class_room_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_room_notice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `notice_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_room_notice`
--

LOCK TABLES `class_room_notice` WRITE;
/*!40000 ALTER TABLE `class_room_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_room_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classrooms` (
  `classroom_id` bigint NOT NULL AUTO_INCREMENT,
  `batch_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`classroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classrooms`
--

LOCK TABLES `classrooms` WRITE;
/*!40000 ALTER TABLE `classrooms` DISABLE KEYS */;
INSERT INTO `classrooms` VALUES (1,'Java','Advance Java'),(2,'DevOps','DevOps'),(3,'DevOps','DevOps'),(4,'MERN','MERN'),(5,'SQA','SQA'),(6,'SQA','SQA');
/*!40000 ALTER TABLE `classrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classrooms_class_room_notice`
--

DROP TABLE IF EXISTS `classrooms_class_room_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classrooms_class_room_notice` (
  `classroom_classroom_id` bigint NOT NULL,
  `class_room_notice_id` bigint NOT NULL,
  UNIQUE KEY `UK_1b9jg9lsgi2rgqrbdm9mpksun` (`class_room_notice_id`),
  KEY `FKmox2xgomm069tbkkd5xgt8ecn` (`classroom_classroom_id`),
  CONSTRAINT `FK9ilgif9fna38i6wsvrqnrf2e1` FOREIGN KEY (`class_room_notice_id`) REFERENCES `class_room_notice` (`id`),
  CONSTRAINT `FKmox2xgomm069tbkkd5xgt8ecn` FOREIGN KEY (`classroom_classroom_id`) REFERENCES `classrooms` (`classroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classrooms_class_room_notice`
--

LOCK TABLES `classrooms_class_room_notice` WRITE;
/*!40000 ALTER TABLE `classrooms_class_room_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `classrooms_class_room_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classrooms_posts`
--

DROP TABLE IF EXISTS `classrooms_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classrooms_posts` (
  `classroom_classroom_id` bigint NOT NULL,
  `posts_id` bigint NOT NULL,
  UNIQUE KEY `UK_auw2rk8h5ri3wudvfsvvg9pxn` (`posts_id`),
  KEY `FKmq14e8ifphg08gmnaaevwaflr` (`classroom_classroom_id`),
  CONSTRAINT `FK2yjd1rkg7p72vpi67jw60omt4` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FKmq14e8ifphg08gmnaaevwaflr` FOREIGN KEY (`classroom_classroom_id`) REFERENCES `classrooms` (`classroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classrooms_posts`
--

LOCK TABLES `classrooms_posts` WRITE;
/*!40000 ALTER TABLE `classrooms_posts` DISABLE KEYS */;
INSERT INTO `classrooms_posts` VALUES (1,1);
/*!40000 ALTER TABLE `classrooms_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Thank you san. It\'s very helpful for us.',NULL,'Arif Akmal'),(2,'Thank you san for this.',NULL,'Md Habibullah Howlader');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('devops01','AWS (Amazon Web Services) is a comprehensive and widely adopted cloud computing platform that offers a vast array of scalable and reliable cloud services, including computing power, storage, databases, machine learning,','AWS','running'),('j2ee01','Advance Java refers to advanced features and functionalities in the Java programming language, including advanced APIs, multi-threading, networking, database connectivity, and enterprise-level development support.','Advance Java','Running'),('j2ee02','Spring Boot is a powerful Java framework that simplifies the development of production-ready, stand-alone, and microservices-based applications, providing easy configuration, robust dependency management.','Spring Boot','running');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_schedule`
--

DROP TABLE IF EXISTS `course_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_schedule` (
  `schedule_id` bigint NOT NULL AUTO_INCREMENT,
  `batch_code` varchar(255) DEFAULT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `schedule_end_time` varchar(255) DEFAULT NULL,
  `schedule_start_time` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `trainer_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_schedule`
--

LOCK TABLES `course_schedule` WRITE;
/*!40000 ALTER TABLE `course_schedule` DISABLE KEYS */;
INSERT INTO `course_schedule` VALUES (1,'J2EE','j2ee01','2023-07-31','18:18','18:18','2023-07-01','sarwar@gmail.com'),(2,'J2EE','j2ee02','2023-08-05','18:18','18:18','2023-08-01','rezaur@gmail.com'),(3,'DevOps','devops01','2023-07-31','18:19','18:19','2023-07-01','amir@gmail.com');
/*!40000 ALTER TABLE `course_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_schedule_assignment`
--

DROP TABLE IF EXISTS `course_schedule_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_schedule_assignment` (
  `schedule_id` bigint NOT NULL,
  `assignment_id` bigint NOT NULL,
  PRIMARY KEY (`schedule_id`,`assignment_id`),
  UNIQUE KEY `UK_qx3xb72wqv0qifs1k841je61p` (`assignment_id`),
  CONSTRAINT `FK4uu7n6cws5ioftcurw58sjym8` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`),
  CONSTRAINT `FKkdnu2fpj72wyyupq521jaj491` FOREIGN KEY (`schedule_id`) REFERENCES `course_schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_schedule_assignment`
--

LOCK TABLES `course_schedule_assignment` WRITE;
/*!40000 ALTER TABLE `course_schedule_assignment` DISABLE KEYS */;
INSERT INTO `course_schedule_assignment` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `course_schedule_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_chat`
--

DROP TABLE IF EXISTS `group_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_chat` (
  `id` bigint NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_chat`
--

LOCK TABLES `group_chat` WRITE;
/*!40000 ALTER TABLE `group_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_id` bigint NOT NULL AUTO_INCREMENT,
  `notice_text` longtext,
  `notice_title` longtext,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'Join us for a hands-on web development workshop covering HTML, CSS, and JavaScript.\nLearn from industry experts and build real-world projects. Limited seats available!','Upcoming Web Development Workshop'),(2,'Enhance your coding skills with our comprehensive Java programming course.\nDevelop applications and work on challenging projects under expert guidance.','Java Programming Course Starting Soon'),(3,'Become a certified project manager and boost your career with our practical certification program.\nMaster project planning, execution, and risk management.','Project Management Certification Program'),(4,'Gain expertise in Agile and Scrum methodologies with our certified Scrum Master training.\nLead successful Agile teams and deliver high-value products.','Certified Scrum Master Training');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `classroom_id` bigint DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Are you looking to kickstart your Java web development journey? Look no further! Spring Boot, the powerful framework, offers a simple and efficient way to build production-ready applications. Whether you\'re a seasoned developer or just starting, Spring Boot\'s convention-over-configuration approach and auto-configuration magic will streamline your development process. Embrace the simplicity, unleash the productivity, and let Spring Boot take your projects to new heights! ??','springBoot.jpg','Sarwar Miral');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_comments`
--

DROP TABLE IF EXISTS `posts_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts_comments` (
  `post_id` bigint NOT NULL,
  `comments_id` bigint NOT NULL,
  UNIQUE KEY `UK_sjeadiuvloecnqe9psjjdcjqr` (`comments_id`),
  KEY `FKbjdq8a62c5siv1mk27umswg9` (`post_id`),
  CONSTRAINT `FKbjdq8a62c5siv1mk27umswg9` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FKgfwb3n0tyt6x3lro7kavj8fui` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_comments`
--

LOCK TABLES `posts_comments` WRITE;
/*!40000 ALTER TABLE `posts_comments` DISABLE KEYS */;
INSERT INTO `posts_comments` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `posts_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('ADMIN','role_admin'),('TRAINEE','trainee'),('TRAINER','trainer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainee`
--

DROP TABLE IF EXISTS `trainee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainee` (
  `trainee_email` varchar(255) NOT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `cgpa` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `institute` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`trainee_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainee`
--

LOCK TABLES `trainee` WRITE;
/*!40000 ALTER TABLE `trainee` DISABLE KEYS */;
INSERT INTO `trainee` VALUES ('akash@gmail.com','','','','',NULL),('alamin@gmail.com','','','','',NULL),('antu@gmail.com','','','','',NULL),('arif@gmail.com','','','','',NULL),('ariful@gmail.com','','','','',NULL),('arup@gmail.com','','','','',NULL),('habibullah@gmail.com','','','','',NULL),('khalid@gmail.com','','','','',NULL),('mehedi@gmail.com','','','','',NULL),('mohidul@gmail.com','','','','',NULL),('rahat@gmail.com','','','','',NULL),('rony@gmail.com','','','','',NULL),('sajal@gmail.com','','','','',NULL);
/*!40000 ALTER TABLE `trainee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer` (
  `trainer_email` varchar(255) NOT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`trainer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES ('amir@gmail.com',NULL,NULL,NULL),('raihan@gmail.com',NULL,NULL,NULL),('rezaur@gmail.com',NULL,NULL,NULL),('sarwar@gmail.com',NULL,NULL,NULL);
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin@gmail.com','123 Main St','1990-01-01','Admin','Male','','$2a$10$CPXzBGGD01MA3O4P6L63POdBPmPQ0o5gRiAgDVbzCEuOOkKcvVwCC','1234567890','download (1).png'),('akash@gmail.com','Puran Dhaka, Dhaka','2023-07-01','Akash ','Male','Chakrabarty','$2a$10$VMuGRm/xMYWtAAPb/NKnJu91htrwRN.qWSZBWCqt/aJCVM00diYD2','01791001128','Screenshot (56).png'),('alamin@gmail.com','Bashundhara, Dhaka','2023-07-01','Al Amin','Male','Amin','$2a$10$YUQUAvVUaIMda1qdMpDolOqEGZ9Ha6uI00XDvbCBf.fDdiBUhmhty','01791001120','Screenshot (61).png'),('amir@gmail.com','Mohammadpur, Dhaka','2023-07-01','Amir ','Male','Hossain','$2a$10$YJp6jY9.obLQpkq6yIns/u/P7wWkSzzUhY37nkcnLPP5c4QmY3Ss6','01791001128','1671348622326.jpg'),('antu@gmail.com','Mohammadpur, Dhaka','2023-07-01','Antu ','Male','Acharjee','$2a$10$ypZ1kZ/sWvgwoVKk9kyQieU5a8MBfKDcWIjGrVXr6KXExoCWEvLtC','01791001125','Screenshot (63).png'),('arif@gmail.com','Mohammadpur, Dhaka','2023-07-01','Arif','Male','Akmal','$2a$10$3AEz4N/1E9XKiJz4qj3w9uKJ8Lre7G43bYCDkcwdA/4dYgsSZwNYi','01791001120','Screenshot (49).png'),('ariful@gmail.com','Mohammadpur, Dhaka','2023-07-01','Md. Ariful ','Male','Islam','$2a$10$qzvnM3BSkS5vqwUVPJkctOHojS3eCgGYavfebH4SNhef3MQrBDWzC','01791001128','Screenshot (55).png'),('arup@gmail.com','Mohammadpur, Dhaka','2023-07-01','Arup ','Male','Chakrabarty','$2a$10$c8zIFbL6wfg15HWcLYmsSuoW6ohIDIND4TCcDxYZ/Yy4kfn6d97ri','01791001124','Screenshot (53).png'),('habibullah@gmail.com','Bashundhara, Dhaka','2023-07-01','Md Habibullah','Male','Howlader','$2a$10$.dMiUqiNmRUuoHySXndh2ejpFIE1rjSxt1wfaqbiu2p4oJ8wD8XNy','01791001122','Screenshot (51).png'),('khalid@gmail.com','Mohammadpur, Dhaka','2023-07-01','Khalid','Male','Shifullah','$2a$10$MkVxS2OREADCo2OIviXUXeeXGVkGfxDASbtHLhpqJCkcP2ncETrOy','01791001129','Screenshot (59).png'),('mehedi@gmail.com','Mirpur, Dhaka','2023-07-01','Md. Mehedi','Male','Hasan','$2a$10$JUBCjb3Goz8InHL/kr9pHOGzWLsgeUfz8y9JJr7fkpf5Kw7RMI5Da','01791001130','Screenshot (60).png'),('mohidul@gmail.com','Jahangirnagar, Dhaka','2023-07-01','Md. Mohidul','Male','Islam','$2a$10$uM9ozAquG0TaV86uMR9RU.rIAg/2AEbT8pBVW6/7BqXmCppxzg1lm','01791001125','Screenshot (54).png'),('rahat@gmail.com','Mohammadpur, Dhaka','2023-07-01','Md. Rahat','Male','Ibna Hossain','$2a$10$fioa20OnC9Nb15HBBzrb7eoyhg/uuq5fs3EzyeZV3U1X0WVQwEMjW','01791001121','Screenshot (50).png'),('raihan@gmail.com','Mohammadpur, Dhaka','2023-07-01','Raihan ','Male','Uddin','$2a$10$VO3PhvbJSDFpFKe1K4kDRe2u/l0x5HS7glQSxRavFNqSaODLIOJue','01791001122','Screenshot (65).png'),('rezaur@gmail.com','Mohammadpur, Dhaka','2023-07-01','Rezaur ','Male','Rahman ','$2a$10$6bskgUeCNz3mxMaXggHHteBSH43lKS58WDWltgDA0SQsUEkn5eerq','01791001128','1635519942813.jpg'),('rony@gmail.com','Mohammadpur, Dhaka','2023-07-01','Mohammad','Male','Rony','$2a$10$OCtalTVFLx5g.ZLfg7GVv.ulPtHeEFVAV45SUp7Xqb00S3I4aGTMi','01791001121','Screenshot (64).png'),('sajal@gmail.com','Mohammadpur, Dhaka','2023-07-01','Sajal','Male','Halder','$2a$10$bzTm7YAWgDAa7/EAwbAjgOwU/Ppk1/eZG8dPETIapx0xRgljOhhNi','01791001122','Screenshot (52).png'),('sarwar@gmail.com','Mohammadpur, Dhaka','2023-07-01','Sarwar','Male','Miral','$2a$10$v5vbVUn8ihAlUx6z6zGKqufZDrRF9wTOAlymO314ylKCRjKcCdJZW','01791001122','Screenshot (58).png'),('tashdid@gmail.com','Mohammadpur, Dhaka','2023-07-01','Tashdid','Male','Alam','$2a$10$u7bJz1Fy.FsKei9PTAX1c.HHhB7so14IFpS7jw5UX9UStthKE12YO','01791001122',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_admin`
--

DROP TABLE IF EXISTS `user_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_admin` (
  `admin_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`email`),
  KEY `FK7fitwtxxhml6xdlr7025ogyb9` (`admin_email`),
  CONSTRAINT `FK7fitwtxxhml6xdlr7025ogyb9` FOREIGN KEY (`admin_email`) REFERENCES `admin` (`admin_email`),
  CONSTRAINT `FK7vteae4t5s42ux5sr1apg50eh` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_admin`
--

LOCK TABLES `user_admin` WRITE;
/*!40000 ALTER TABLE `user_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `email` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`email`,`role_name`),
  KEY `FKn6r4465stkbdy93a9p8cw7u24` (`role_name`),
  CONSTRAINT `FKn6r4465stkbdy93a9p8cw7u24` FOREIGN KEY (`role_name`) REFERENCES `role` (`role_name`),
  CONSTRAINT `FKoeajw7klgdq5xlmfsulsjc0ak` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('admin@gmail.com','ADMIN'),('akash@gmail.com','TRAINEE'),('alamin@gmail.com','TRAINEE'),('antu@gmail.com','TRAINEE'),('arif@gmail.com','TRAINEE'),('ariful@gmail.com','TRAINEE'),('arup@gmail.com','TRAINEE'),('habibullah@gmail.com','TRAINEE'),('khalid@gmail.com','TRAINEE'),('mehedi@gmail.com','TRAINEE'),('mohidul@gmail.com','TRAINEE'),('rahat@gmail.com','TRAINEE'),('rony@gmail.com','TRAINEE'),('sajal@gmail.com','TRAINEE'),('amir@gmail.com','TRAINER'),('raihan@gmail.com','TRAINER'),('rezaur@gmail.com','TRAINER'),('sarwar@gmail.com','TRAINER');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_trainee`
--

DROP TABLE IF EXISTS `user_trainee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_trainee` (
  `trainee_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`email`),
  KEY `FKpum2n5uqu3x3p166luray3axv` (`trainee_email`),
  CONSTRAINT `FKpum2n5uqu3x3p166luray3axv` FOREIGN KEY (`trainee_email`) REFERENCES `trainee` (`trainee_email`),
  CONSTRAINT `FKsx2tfrp3t365ja7hsyqnwxm8b` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_trainee`
--

LOCK TABLES `user_trainee` WRITE;
/*!40000 ALTER TABLE `user_trainee` DISABLE KEYS */;
INSERT INTO `user_trainee` VALUES ('akash@gmail.com','akash@gmail.com'),('alamin@gmail.com','alamin@gmail.com'),('antu@gmail.com','antu@gmail.com'),('arif@gmail.com','arif@gmail.com'),('ariful@gmail.com','ariful@gmail.com'),('arup@gmail.com','arup@gmail.com'),('habibullah@gmail.com','habibullah@gmail.com'),('khalid@gmail.com','khalid@gmail.com'),('mehedi@gmail.com','mehedi@gmail.com'),('mohidul@gmail.com','mohidul@gmail.com'),('rahat@gmail.com','rahat@gmail.com'),('rony@gmail.com','rony@gmail.com'),('sajal@gmail.com','sajal@gmail.com');
/*!40000 ALTER TABLE `user_trainee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_trainer`
--

DROP TABLE IF EXISTS `user_trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_trainer` (
  `trainer_email` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`email`),
  KEY `FK7rc9njm8e0am7tjwi17mmti97` (`trainer_email`),
  CONSTRAINT `FK1y9x44ehcky0jl6fwstto25qj` FOREIGN KEY (`email`) REFERENCES `user` (`email`),
  CONSTRAINT `FK7rc9njm8e0am7tjwi17mmti97` FOREIGN KEY (`trainer_email`) REFERENCES `trainer` (`trainer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_trainer`
--

LOCK TABLES `user_trainer` WRITE;
/*!40000 ALTER TABLE `user_trainer` DISABLE KEYS */;
INSERT INTO `user_trainer` VALUES ('amir@gmail.com','amir@gmail.com'),('raihan@gmail.com','raihan@gmail.com'),('rezaur@gmail.com','rezaur@gmail.com'),('sarwar@gmail.com','sarwar@gmail.com');
/*!40000 ALTER TABLE `user_trainer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-26 20:20:07
