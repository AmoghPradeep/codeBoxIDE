<?php
    $room_id;
    foreach($_POST as $p){
        $room_id = $p;
    }


    session_start();
    if (isset($_SESSION["room"]) && $_SESSION["room"] == $room_id){
        echo readfile("../../Rooms/code-".$room_id.".txt");
    }
    else echo "INVALID";