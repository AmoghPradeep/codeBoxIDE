<?php
    foreach($_POST as $p){
    }

    session_start();
    if (!isset($_SESSION["room"]))
        exit;

    include_once "../login-backend/connector.php";

    $query = "select name from user_room, user_data where user_room.user_id = user_data.user_id and user_room.room_id = ".$_SESSION["room"].";";
    $result = $connection->query($query);
    $names = null;
    while($row = $result->fetch_assoc()){
        $names = $names.$row["name"]."<&>";
    }

    echo $names;