<?php

    foreach($_POST as $p){}

    session_start();
    if (!isset($_SESSION["room"])){
        echo "false";
        exit;
    }

    $roomID = $_SESSION["room"];
    $userID = $_SESSION["user_id"];

    include_once "../login-backend/connector.php";

    $query = "select count(*) as count from room_data where room_id = ".$roomID." and host_id = ".$userID.";";

    $result = $connection->query($query);

    while($row = $result->fetch_assoc()){
        if ($row["count"] == '1'){
            echo "true";
            exit;
        }
    }
    echo "false";