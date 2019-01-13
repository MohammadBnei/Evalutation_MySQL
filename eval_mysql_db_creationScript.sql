-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
-- First try to make a scheme using workbench

-- -----------------------------------------------------
-- Schema test
--
-- First try to make a scheme using workbench
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8 ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  `surname` VARCHAR(255) NULL,
  `img` VARCHAR(255) NULL,
  `password` VARCHAR(40) NULL,
  `isAdmin` TINYINT NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`article` (
  `article_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`article_id`),
  INDEX `fk_user_article_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_category_article_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_article`
    FOREIGN KEY (`user_id`)
    REFERENCES `test`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_article`
    FOREIGN KEY (`category_id`)
    REFERENCES `test`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`comment` (
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
    REFERENCES `test`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_comment`
    FOREIGN KEY (`article_id`)
    REFERENCES `test`.`article` (`article_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
