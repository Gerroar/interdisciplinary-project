-- Create database, tables and structure
CREATE DATABASE inter_project;

USE inter_project;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Created at Time',
    `user_name` VARCHAR(150) NOT NULL COMMENT 'User Name',
    `user_type` CHAR(1) NOT NULL COMMENT 'Type of user, could be B(buyer), S(seller) or H(hybrid)',
    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
    `set_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `user_id` INT COMMENT 'Foreign Key',
    `user_img` TEXT COMMENT 'URL of the image',
    `user_phone` VARCHAR(31) COMMENT 'User Phone Number',
    `user_email` VARCHAR(320) COMMENT 'User Email with the max. length allowed for an email',
    `user_pass`  VARCHAR(15) NOT NULL COMMENT 'User Password',
    PRIMARY KEY(`set_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(id)
);

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
    `post_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `user_id` INT COMMENT 'Foreign Key',
    `title` VARCHAR(100) NOT NULL COMMENT 'Title',
    `content` TEXT NOT NULL COMMENT 'Content of the post',
    `post_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Post creation date',
    PRIMARY KEY(`post_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(id)
);

-- Create database, tables and structure

-- PROCEDURES
DELIMITER //
-- createUser PROCEDURE
CREATE PROCEDURE createUser(
    IN userName VARCHAR(150),
    IN userType CHAR(1)
)
-- createUser PROCEDURE

-- deleteUser PROCEDURE
-- deleteUser PROCEDURE

-- createPost PROCEDURE
-- createPost PROCEDURE

-- deletePost PROCEDURE
-- deletePost PROCEDURE

-- updatePost PROCEDURE
-- updatePost PROCEDURE

-- updateUserInfo PROCEDURE
-- updateUserInfo PROCEDURE

-- getUsers PROCEDURE
-- getUsers PROCEDURE

-- PROCEDURES
DELIMITER ;