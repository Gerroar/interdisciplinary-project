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
    `user_img` MEDIUMBLOB COMMENT 'URL of the image',
    `user_phone` VARCHAR(31) NOT NULL COMMENT 'User Phone Number',
    `user_email` VARCHAR(320) NOT NULL COMMENT 'User Email with the max. length allowed for an email',
    `user_pass`  VARCHAR(255) NOT NULL COMMENT 'User Password',
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

-- GENERAL STORED PROCEDURES

-- userExists PROCEDURE
DELIMITER //

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

DROP PROCEDURE checkEmail;

-- checkEmail PROCEDURE
DELIMITER //
/*REASON: Automate the process of checking if user exists by looking for the email*/
/*HOW IT WORKS: It will work the same as userExists just using the passed email*/
CREATE PROCEDURE checkEmail(
    IN userEmail VARCHAR(320),
    IN showR BIT,
    OUT emailExists BIT
)
BEGIN
    IF EXISTS(
        SELECT u_email
        FROM full_user_info
        WHERE u_email = userEmail
    )THEN
        SET emailExists = 1;
    ELSE
        SET emailExists = 0;
    END IF;

    IF showR = 1 THEN
        SELECT emailExists;
    END IF;
END//
DELIMITER ;
-- checkEmail PROCEDURE

-- correctType PROCEDURE

DROP PROCEDURE correctType;
DELIMITER //

/*REASON : Check if the type value is the proper one
 of the possibilities*/

 /*HOW IT WORKS : By passing the userType, the parameter
   will be checked with something similar to a switch-case
   statement, in case that is correct the OUT value will be
   SET to 1, otherwise will be SET to 0*/
CREATE PROCEDURE correctType(
    IN userType CHAR(1),
    OUT correctT BIT
)
BEGIN
    CASE LOWER(userType)
        WHEN 'b' THEN
            SET correctT = 1;
        WHEN 's' THEN
            SET correctT = 1;
        WHEN 't' THEN
            SET correctT = 1;
        ELSE
            SET correctT = 0;
    END CASE;
END//
DELIMITER ;
--correctType PROCEDURE

-- createUser PROCEDURE

/*REASON : Automate the process of creating a new user
  checking first if it exists or not*/

/*HOW IT WORKS : Giving the userName(users), userType(users),
 userImg(settings), userPhone(settings), userEmail(settings)
 and userPass(settings). Will check if the user is already registered
 if is not it will insert the values and give a 1 as a 
 result, if it's registered it will give a 0 to indicate
 that that user already exists , and also checks if the
 userType is correct*/

DROP PROCEDURE createUser;
DELIMITER //

CREATE PROCEDURE createUser(
    IN userName VARCHAR(150),
    IN userType CHAR(1),
    IN userImg TEXT,
    IN userPhone VARCHAR(31),
    IN userEmail VARCHAR(320),
    IN userPass VARCHAR(255),
    OUT result VARCHAR(200)
    
)
BEGIN
    CALL `correctType`(userType, @correctT);
    CALL `checkEmail`(userEmail, false, @emailExists);
    CALL `userExists`(userName, false, @isThere);
    IF ((SELECT @isThere = 0) AND (SELECT @correctT = 1) AND (SELECT @emailExists = 0)) THEN
        INSERT INTO users(user_name, user_type) VALUES(LOWER(userName), LOWER(userType));

        SET @userId := (SELECT id
                       FROM users
                       WHERE user_name = userName);

        INSERT INTO settings(user_id, user_img, user_phone, user_email, user_pass) VALUES(@userId, userImg, userPhone, userEmail, userPass);
        SET result = 1;
        SELECT result;
    ELSE
        SET result = 0;
        SELECT result;
    END IF;
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

/*HOW IT WORKS : Creates a post from the userId*/

DROP PROCEDURE createPost;
DELIMITER //

CREATE PROCEDURE createPost(
    IN userId INT,
    IN postTitle VARCHAR(100),
    IN postContent TEXT,
    OUT created BIT
)
BEGIN 
    SET @userType := (SELECT user_type
                      FROM users
                      WHERE id = userId);
    IF (@userType IN ('s', 't')) THEN
        INSERT INTO posts(user_id, title, content) VALUES(userId, postTitle, postContent);
        SET created = 1;
    ELSE
        SET created = 0;
    END IF;
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

/*REASON : Automate the process of updating a post*/
/*HOW IT WORKS : By passing the postId, 'id' that will 
  be picked up after the user has clicked on one of 
  their posts, and to be sure, userId will be also
  required, if everything worked, it will give a 1
  as a result, 0 if not.*/
DELIMITER //

CREATE PROCEDURE updatePost(
    IN userId INT,
    IN postId INT,
    IN postTitle VARCHAR(100),
    IN postContent TEXT,
    OUT result BIT
)
BEGIN
    IF EXISTS(
        SELECT user_id
        FROM posts
        WHERE user_id = userId
    )THEN
        SET @updateTime := CURRENT_TIMESTAMP();
        UPDATE posts
        SET title = postTitle, content = postContent, post_date = @updateTime
        WHERE post_id = postId;
        SET result = 1;
    ELSE
        SET result = 0;
    END IF;
END //
DELIMITER ;
-- updatePost PROCEDURE

-- updateUserInfo PROCEDURE

/*REASON : Automate the process of update info from users and settings*/
/*HOW IT WORKS : First we create a variable with the current password
  because that field cannot be passed as null, after that we update the
  users info, and we check if 'userPass' have any value, if not, we use
  the old password, if it have it, we just pass the new password*/
DELIMITER //
CREATE PROCEDURE updateUserInfo(
    IN userId INT,
    IN userName VARCHAR(150),
    IN userType CHAR(1),
    IN userImg TEXT,
    IN userPhone VARCHAR(31),
    IN userEmail VARCHAR(320),
    IN userPass VARCHAR(15)
)
BEGIN
    SET @samePass := (SELECT user_pass
                      FROM settings
                      WHERE user_id = userId);

    UPDATE users
    SET user_name = userName, user_type = userType
    WHERE id = userId;
    
    IF (userPass IS NOT NULL) THEN
         UPDATE settings
         SET user_img = userImg, user_phone = userPhone, user_email = userEmail, user_pass = userPass
         WHERE user_id = userId;
    ELSE
        UPDATE settings
        SET user_img = userImg, user_phone = userPhone, user_email = userEmail, user_pass = @samePass
        WHERE user_id = userId;
    END IF;
END//
DELIMITER ;
-- updateUserInfo PROCEDURE

-- userPosts PROCEDURE

DELIMITER //

CREATE PROCEDURE userPosts(
    IN userId INT
)
BEGIN
    SELECT *
    FROM all_posts AS p
    WHERE p.u_id = userId
    ORDER BY p.post_d DESC;
END//
DELIMITER ;
-- userPosts PROCEDURE

-- GENERAL STORED PROCEDURES

-- USER MANAGMENT PROCEDURES

-- getUsers PROCEDURE
-- getUsers PROCEDURE

-- USER MANAGMENT PROCEDURES

-- VIEWS

-- all_posts VIEW
CREATE VIEW all_posts
AS
    SELECT s.user_img AS img, u.id AS u_id, u.user_name AS user_n, p.post_id AS p_id,  p.title AS title, p.content AS content, p.post_date AS post_d
    FROM settings s
        INNER JOIN users u
            ON s.user_id = u.id
        INNER JOIN posts p
            ON u.id = p.user_id;
-- all_posts VIEW

-- full_user_info
CREATE VIEW full_user_info
AS
    SELECT  u.id AS u_id, u.user_name AS u_name, u.user_type AS u_type, s.user_email AS u_email, s.user_pass AS u_pass, s.user_phone AS u_phone, s.user_img AS u_img
    FROM users u
        INNER JOIN settings s
            ON u.id = s.user_id;
-- full_user_info
-- VIEWS

/*TESTS*/
CALL createUser('gerroar', 'b', null, '636339804', 'germanariasrodriguez@gmail.com', '123456', @result);

CALL `deleteUser`('gerroar');
CALL createUser('gerroar9789', 'z', null, '636339804', 'germanariasrodriguez@gmail.com', '123456', @result);
ALTER TABLE posts AUTO_INCREMENT = 0;

CALL createPost(3, 'Test!', 'lorem ipsum', @created);
CALL createPost(5, 'Hello world!', 'lorem ipsum', @created);
CALL createPost(5, 'Working in progres!', 'lorem ipsum', @created);
CALL createPost(5, 'Progres in working!', 'lorem ipsum', @created);
CALL createPost(4, 'Testing posts!', 'lorem ipsum', @created);
CALL `updatePost`(4, 2, 'This post have been updated!', 'lorem ipsum', @result);
SELECT @result;
CALL `deletePost`(3);
CALL `checkEmail`('germanariasrodriguez@gmail.com', true, @emailExists);

CALL `updateUserInfo`(4,'gerroar79', 's', null, 40206456, 'gerroar97@gmail.com', 'gerroar1234');
CALL `userPosts`(4);

CALL deleteUser('gerroar');

CALL userExists('gerroar', true, @isThere);
ALTER TABLE users AUTO_INCREMENT = 0;
ALTER TABLE settings AUTO_INCREMENT = 0;
ALTER TABLE posts AUTO_INCREMENT = 0;

SELECT * FROM full_user_info WHERE u_name = 'natoraza'

CALL checkEmail('novatuga@gmail.com', true, @emailExists);

/*TESTS*/