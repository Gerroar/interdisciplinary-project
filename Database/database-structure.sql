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

-- STORED PROCEDURES

DELIMITER //

-- userExists PROCEDURE

/*REASON : The query of the existence of a 
  user will be constant in the use of the 
  application.*/

/*HOW IT WORKS : By using two parameters,
  one for giving the userName to search
  and other as the result of the procedure,
  we find out if that user exists with a
  simple query, if exists it will return
  a 1 also known as true and if not 0 or false
  also if we need to see it we need to pass
  a 1 or true to showR in order to see the
  result or pass a 0 or false to avoid 
  seeing the result*/

CREATE PROCEDURE userExists(
    IN userName VARCHAR(150),
    IN showR BIT,
    OUT isThere BIT
)
BEGIN
    IF EXISTS (
        SELECT user_name
        FROM users
        WHERE user_name = LOWER(userName)
    )
        THEN SET isThere = 1;
    ELSE
        SET isThere = 0;
    END IF;

    IF showR = 1 THEN
        SELECT isThere;
    END IF;
END//

DELIMITER ;
-- userExists PROCEDURE

-- createUser PROCEDURE

/*REASON : Automate the process of creating a new user
  checking first if it exists or not*/

/*HOW IT WORKS : Giving the userName(users), userType(users),
 userImg(settings), userPhone(settings), userEmail(settings)
 and userPass(settings). Will check if the user is already registered
 if is not it will insert the values and give a 1 as a 
 result, if it's registered it will give a 0 to indicate
 that that user already exists */

 DROP PROCEDURE createUser;
DELIMITER //

CREATE PROCEDURE createUser(
    IN userName VARCHAR(150),
    IN userType CHAR(1),
    IN userImg TEXT,
    IN userPhone VARCHAR(31),
    IN userEmail VARCHAR(320),
    IN userPass VARCHAR(15),
    OUT result BIT
)
BEGIN
    CALL userExists(userName, false, @isThere);
    IF @isThere = 0 THEN

        DECLARE userId INT;

        SET 
        SET result = 1;
        INSERT INTO users(user_name, user_type) VALUES(LOWER(userName), LOWER(userType));
        INSERT INTO settings()
    ELSE
        SET result = 0;
    END IF;
    SELECT result;
END //

DELIMITER;

-- createUser PROCEDURE

-- deleteUser PROCEDURE

DELIMITER //

CREATE PROCEDURE deleteUser()
DELIMITER ;
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

-- STORED PROCEDURES

