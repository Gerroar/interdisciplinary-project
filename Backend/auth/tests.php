<?php

/**File just for test if everything works before using it */
include_once("../classes/db.php");
$db = new db(true);
//include_once('../classes/mysql.php');

$user = "gerroar";
$object = $db->Query("CALL userExists('$user', true, @isThere);", false);
if ($object == 1) {
    echo "It's true<br/>";
}

//$db->Close();
$db = new db(true);
$result = $db->Query("SELECT * FROM users");

if ($result == false) {
    echo $db->error;
} else {
    $obj = $result->fetch_object();
    echo $obj->id . "<br/>";
}

$db = new db(true);

$username = "test2";
$email = "test@gmail.com";
$password = password_hash("123456", PASSWORD_DEFAULT);
$passwordConfirm = "123456";
$phoneNumber = "326654987";
$userType = "t";

$object = $db->Query("CALL createUser('$username', '$userType', null, '$phoneNumber', '$email', '$password', @result)", false);
if ($object == 1) {
    echo "Works";
}

/**NOW WORKS */
