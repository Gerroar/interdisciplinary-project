<?php
    /**File just for test if everything works before using it */
    include_once("../classes/db.php");
    $db = new db(true);
   //$query = "CALL userExists('gerroar', true, @isThere)";
    //$result = $db->Query($query, false);
    
    //$object = $result->fetch_object();
    //$object = $db->Query("CALL userExists('gerroar', true, @isThere)", false)->fetch_object();

    /*if ($object->isThere == 1){
        echo "It's true<br/>";
    }*/

    //Work successfuly , gives 1 if it's true and 0 if not

    $hashedpass = password_hash("hola", PASSWORD_DEFAULT);
    if(!password_verify("adios", $hashedpass)){
        echo "enters<br/>";
    }

    $query2 = $db->Query("SELECT * FROM users", false)->fetch_object();
    echo $query2->user_name;
?> 