<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/db.php");
    $db = new db("localhost","root","7794CopErnico?","inter_project");

    $query = "SELECT * FROM all_posts";
    $result = $db->query($query);
    var_dump($result);
?>