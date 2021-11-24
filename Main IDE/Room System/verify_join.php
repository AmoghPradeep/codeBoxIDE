<?php
    // this script verifies room name and password provided by
    // file-manager-index.js

    $data = [];

    foreach($_POST as $p){
        array_push($data, $p);
    }

    // data[0] should be name, and data[1] should be password.

    include_once "../../login-backend/connector.php";

    $verifySQL = 'select count(*), room_id from room_data where name ="'.$data[0].'" and pass = "'.$data[1].'";';

    $result = $connection->query($verifySQL);

    $count;
    $roomid;
    while($row = $result->fetch_assoc()){
        $count = $row["count(*)"];
        if ($count == 0){
            echo "INVALID";
            exit;
        }
        $roomid = $row["room_id"];
    }

    session_start();
    if (!isset($_SESSION["room"]) || $_SESSION["room"] != $roomid){
        $incrementUserCnt = "update room_data set user_cnt = user_cnt + 1 where room_id = ".$roomid.";";
        $connection->query($incrementUserCnt);

        $sql = "insert into user_room values (".$_SESSION["user_id"].", ".$roomid.");";
        $connection->query($sql);
    }

    $_SESSION["room"] = $roomid;
    echo $roomid;