<?php
    foreach($_POST as $p){
    }

    // this script sends all the messages for a room.

    session_start();
    if (!isset($_SESSION["room"])){
        echo "invalid";
        exit;
    }
    $roomID = $_SESSION["room"];
    // $getMessagesSQL = "select name, content, TIME_FORMAT(`time`, '%H:%i') as time from room_chat, user_data, photo_data where room_chat.user_id = user_data.user_id and photo_data.user_id = user_data.user_id and room_chat.room_id = ".$roomID." order by room_chat.time;";
    $getMessagesSQL = "select name, content, TIME_FORMAT(`time`, '%H:%i') as time, file_name  from room_chat,(SELECT name, user_data.user_id, COALESCE(file_name, '../UserPhotos/default.png') as file_name from user_data left JOIN photo_data on user_data.user_id = photo_data.user_id ) as join_table where room_chat.user_id = join_table.user_id and room_chat.room_id = ".$roomID." order by room_chat.time;";
    include_once "../../login-backend/connector.php";

    $results = $connection->query($getMessagesSQL);
    $messageData = "";
    $empty = true;
    while($row = $results->fetch_assoc()){
        $empty = false;
        $name = $row["name"];
        $message = $row["content"];
        $time = $row["time"];
        $file = $row["file_name"];

        $messageData = $messageData."&&&".$name."<&>".$message."<&>".$time."<&>".$file;
    }

    if ($empty){
        echo "empty";
        exit;
    }

    echo $messageData;