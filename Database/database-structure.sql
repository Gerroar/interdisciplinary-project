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
    FOREIGN KEY (`user_id`) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
    `post_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `user_id` INT COMMENT 'Foreign Key',
    `title` VARCHAR(100) NOT NULL COMMENT 'Title',
    `content` TEXT NOT NULL COMMENT 'Content of the post',
    `post_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Post creation date',
    PRIMARY KEY(`post_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(id) ON DELETE CASCADE
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
    IF (SELECT @isThere = 0) THEN
        SET result = 1;
        INSERT INTO users(user_name, user_type) VALUES(LOWER(userName), LOWER(userType));

        SET @userId := (SELECT id
                       FROM users
                       WHERE user_name = userName);

        INSERT INTO settings(user_id, user_img, user_phone, user_email, user_pass) VALUES(@userId, userImg, userPhone, userEmail, userPass);
    ELSE
       SET result = 0;
    END IF;
    SELECT result;
END //

DELIMITER ;

-- createUser PROCEDURE

-- deleteUser PROCEDURE

/*REASON : Automate the process of deleting a user*/

/*HOW IT WORKS : By giving the userName the procedure
 search for coincidences to get the userId, it will be
 imposible that the user doesn't exists because this
 option will be only available for the user to delete
 it's own account or for the administrator with the 
 actual users, also, the procedure detects if the user
 have any posts created and delete them*/

DELIMITER //

CREATE PROCEDURE deleteUser(
    IN userName VARCHAR(150)
)
BEGIN
    SET @userId := (SELECT id
                    FROM users
                    WHERE user_name = LOWER(userName));

    IF EXISTS (
        SELECT user_id
        FROM posts
        WHERE user_id = @userId
    ) THEN 
    DELETE FROM posts WHERE user_id = @userId;
    END IF;

    DELETE users, settings
    FROM users INNER JOIN settings ON users.id = settings.user_id
    WHERE users.id = @userId;


END //
DELIMITER ;

-- deleteUser PROCEDURE

-- createPost PROCEDURE

/*REASON : Automate the process of creating a post*/

/*HOW IT WORKS : By giving the userName it will search
 the userId in users, after the rest of the info will
 be added on posts */
DELIMITER //

CREATE PROCEDURE createPost(
    IN userName VARCHAR(250),
    IN postTitle VARCHAR(100),
    IN postContent TEXT
)
BEGIN 
    SET @userId := (SELECT id
                    FROM users
                    WHERE user_name = userName);
    INSERT INTO posts(user_id, title, content) VALUES(@userId, postTitle, postContent);
END //
DELIMITER ;
-- createPost PROCEDURE

-- deletePost PROCEDURE

/*REASON : Automate the process of creating a post*/
/*HOW IT WORKS : By giving the postId we locate the 
  post, we don't need to check if the post exists or
  not because the user or the admin will only be able
  to delete posts that are visible for them*/
DELIMITER //

CREATE PROCEDURE deletePost(
    IN postId INT
)
BEGIN
    DELETE FROM posts WHERE post_id = postId;
END //
DELIMITER ;
-- deletePost PROCEDURE

-- updatePost PROCEDURE

DELIMITER //

CREATE PROCEDURE updatePost(
    IN postId INT,
    IN 
)
DELIMITER ;
-- updatePost PROCEDURE

-- updateUserInfo PROCEDURE
-- updateUserInfo PROCEDURE

-- getUsers PROCEDURE
-- getUsers PROCEDURE

-- STORED PROCEDURES

CALL createUser('gerroar', 'b', null, '636339804', 'germanariasrodriguez@gmail.com', '123456', @result);
CALL createUser('gerroar97', 'b', null, '636339804', 'germanariasrodriguez@gmail.com', '123456', @result);
ALTER TABLE posts AUTO_INCREMENT = 0;

CALL createPost('gerroar', 'Hello world!', 'lorem ipsum');
CALL `deletePost`(3);

CALL deleteUser('gerroar');
ALTER TABLE users AUTO_INCREMENT = 0;
ALTER TABLE settings AUTO_INCREMENT = 0;
ALTER TABLE posts AUTO_INCREMENT = 0;