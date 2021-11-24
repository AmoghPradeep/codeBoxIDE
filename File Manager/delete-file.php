<?php
    $file_id = null;
    foreach($_POST as $p){
        $file_id = $p;
    }

    include_once "../login-backend/connector.php";

    $sql = "select location from code_database where file_id = ".$file_id.";";
    $result = $connection->query($sql);
    $location = null;
    while($row = $result->fetch_assoc()){
        $location = $row["location"];
    }

    unlink("../User-Codes/".$location);

    $sql = "delete from code_database where file_id = ".$file_id.";";
    $connection->query($sql);

    echo "ok";