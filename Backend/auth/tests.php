<?php

/**File just for test if everything works before using it */
include_once("../classes/db.php");
$db = new db(true);
//include_once('../classes/mysql.php');

$user = "13254856";
$object = $db->Query("CALL userExists('12345678', true, @isThere)", false);
if ($object == 1) {
    echo "works";
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
$result = $db->Query("CALL checkEmail('test@gmail.com', true, @emailExists)", false);
if($result == 1){
    echo "works";
}
/**NOW WORKS */
