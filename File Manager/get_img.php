<?php
    foreach ($_POST as $p){}


    session_start();
    $user_id = $_SESSION["user_id"];

    include_once "../login-backend/connector.php";

    $getFileName = "select file_name from photo_data where user_id = ".$user_id.";";

    $result = $connection->query($getFileName);

    $fileName = null;
    while($row = $result->fetch_assoc()){
        $fileName = $row["file_name"];
    }


    if (isset($fileName)){
        echo $fileName;
    }
    else{
        echo "none";
    }