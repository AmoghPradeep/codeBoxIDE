<?php
    foreach($_POST as $p){
    }

    session_start();

    if (!isset($_SESSION["room"])){
        echo "exit";
        exit;
    }

    $user_id = $_SESSION["user_id"];
    $room_id = $_SESSION["room"];

    unset($_SESSION['room']);
    include_once "../../login-backend/connector.php";

    // if person leaving the room is the host.
    $hostCheck = "select count(*) from room_data where room_id = ".$room_id." and host_id = ".$user_id.";";
    echo $hostCheck;
    $result = $connection->query($hostCheck);
    $count = null;
    while($row = $result->fetch_assoc()){
        $count = $row["count(*)"];
    }

    // visitor is leaving.
    if ($count == 0){

        $decrement = "update room_data set user_cnt = user_cnt - 1 where room_id = ".$room_id.";";
        echo $decrement;
        $connection->query($decrement);

        $sql = "delete from user_room where user_id = ".$user_id.";";
        $connection->query($sql);
    }
    // host is leaving.
    else{
        // deleting chats first...
        $sql = "delete from user_room where true";
        $connection->query($sql);
        $deleteChat = "delete from room_chat where room_id = ".$room_id.";";
        $connection->query($deleteChat);
        $delete = "delete from room_data where room_id = ".$room_id.";";
        echo $delete;
        $connection->query($delete);
        unlink("../../Rooms/code-".$room_id.".txt");
    }

    echo "done";