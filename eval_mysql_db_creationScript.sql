-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eavl_mysql_scheme
-- -----------------------------------------------------
-- First try to make a scheme using workbench

-- -----------------------------------------------------
-- Schema eavl_mysql_scheme
--
-- First try to make a scheme using workbench
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eavl_mysql_scheme` DEFAULT CHARACTER SET utf8 ;
USE `eavl_mysql_scheme` ;

-- -----------------------------------------------------
-- Table `eavl_mysql_scheme`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eavl_mysql_scheme`.`user` ;

CREATE TABLE IF NOT EXISTS `eavl_mysql_scheme`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  `surname` VARCHAR(255) NULL,
  `img` VARCHAR(255) NULL,
  `password` VARCHAR(40) NOT NULL,
  `isAdmin` TINYINT NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eavl_mysql_scheme`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eavl_mysql_scheme`.`category` ;

CREATE TABLE IF NOT EXISTS `eavl_mysql_scheme`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eavl_mysql_scheme`.`article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eavl_mysql_scheme`.`article` ;

CREATE TABLE IF NOT EXISTS `eavl_mysql_scheme`.`article` (
  `article_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`article_id`),
  INDEX `fk_user_article_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_category_article_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_article`
    FOREIGN KEY (`user_id`)
    REFERENCES `eavl_mysql_scheme`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_article`
    FOREIGN KEY (`category_id`)
    REFERENCES `eavl_mysql_scheme`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eavl_mysql_scheme`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eavl_mysql_scheme`.`comment` ;

CREATE TABLE IF NOT EXISTS `eavl_mysql_scheme`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `article_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_user_comment_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_article_comment_idx` (`article_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_comment`
    FOREIGN KEY (`user_id`)
    REFERENCES `eavl_mysql_scheme`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_comment`
    FOREIGN KEY (`article_id`)
    REFERENCES `eavl_mysql_scheme`.`article` (`article_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
