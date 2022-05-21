<?php
    /**File just for test if everything works before using it */
    include_once("../classes/db.php");
    $db = new db(true);
    $query = "CALL userExists('gerroar', true, @isThere)";
    $result = $db->Query($query, false);
    
    $object = $result->fetch_object();
    

    if ($object->isThere == 1){
        echo "It's true";
    }

    //Work successfuly , gives 1 if it's true and 0 if not
?>