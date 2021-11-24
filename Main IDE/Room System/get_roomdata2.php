<?php
    $room_id;
    foreach($_POST as $p){
        $room_id = $p;
    }


    session_start();
    if (isset($_SESSION["room"])){
        echo readfile("../../Rooms/code-".$_SESSION["room"].".txt");
    }
    else echo "INVALID";