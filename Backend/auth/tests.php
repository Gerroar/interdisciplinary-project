<?php
    /**File just for test if everything works before using it */
    include_once("../classes/db.php");
    $db = new db(true);
    //include_once('../classes/mysql.php');

    $user="gerroar";
    $object = $db->Query("CALL userExists('$user', true, @isThere);", false);
    if ($object == 1){
        echo "It's true<br/>";
    }

    //$db->Close();
    //$db = new db(true);
    $result = $db->Query("SELECT * FROM users");

    if($result == false){
        echo $db->error;
    }else{
        $obj = $result->fetch_object();
        echo $obj->id;
    }
    /**NOW WORKS */
?> 