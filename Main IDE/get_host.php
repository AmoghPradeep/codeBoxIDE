<?php
    //
    foreach($_POST as $p){
    }

    session_start();
    if (!isset($_SESSION["room"])){
        echo 'INVALID';
        exit;
    }
    $roomID = $_SESSION["room"];

    include_once "../login-backend/connector.php";

    $query = "select user_data.name from room_data, user_data where room_data.host_id = user_data.user_id and room_data.room_id = ".$roomID.";";
    $result = $connection->query($query);

    while($row = $result->fetch_assoc()){
        echo $row["name"];
    }