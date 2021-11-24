<?php

    $hostName = null;
    foreach($_POST as $p){
        $hostName = $p;
    }
    echo "inside php script";
    session_start();
    if (!isset($_SESSION["room"])){
        exit;
    }

    $roomID = $_SESSION["room"];

    include_once "../login-backend/connector.php";

    // finding the user_id of the person with name = hostName.
    $query = "select user_data.user_id from user_room, user_data where user_room.room_id = ".$roomID.' and user_room.user_id = user_data.user_id and name = "'.$hostName.'";';
    echo $query."\n";
    $result = $connection->query($query);
    $userID = null;
    while($row = $result->fetch_assoc()){
        $userID = $row["user_id"];
    }

    $query = "update room_data set host_id = ".$userID." where room_id = ".$roomID.";";
    echo $query."\n";

    $connection->query($query);

    echo "done";