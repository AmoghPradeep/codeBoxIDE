<?php

    // accepting JSON requests from ide-page-js.js
    // converting it into an associative array.

    $request = file_get_contents("php://input");
    $data = json_decode($request, true);

    // requests from ide-page-js.js will be of the format
    // userid=x

    // this script
    //          1. checks if the user is already in any room. if true, throw error.
    //          2. creates a entry in the database table room_data


    // importing code for connecting to database.
    include_once "../../login-backend/connector.php";

    session_start();


    if (false){ // user is already in a room :(
        echo "ERROR";
    }
    else{
        // schema for room_data is :
        // room_id, name, pass, user_cnt, host_id

        // we first need to determine the roomid for this new room.
        // a fool-proof way is to get the max roomid from DB and add 1 to it.

        $getRoomIdSQL = "select max(room_id) from room_data";
        $result = $connection->query($getRoomIdSQL);

        while($row = $result->fetch_assoc()){
            $roomID = $row["max(room_id)"] + 1;
        }

        // room name must be uniqe (bcz name & pass is our authorization mechanism)
        // so let's cross check if name is unqiue.

        $nameCheckSQL = 'select count(*) from room_data where name = "'.$data["name"].'";';

        $result = $connection->query($nameCheckSQL);
        $count = null;
        while($row = $result->fetch_assoc()){
            $count = $row["count(*)"];
        }

        if ($count != 0){
            echo "UNIQUE";
            exit;
        }

        // writing the query needed to create a new room.
        $createRoomSQL = 'insert into room_data values ('.$roomID.', "'.$data["name"].'", "'.$data["password"].'",1,'.$data["user_id"].');';
        $connection->query($createRoomSQL);


        $sql = "insert into user_room values (".$_SESSION["user_id"].", ".$roomID.");";
        $connection->query($sql);

        // changing user's session room id to match changes.
        $_SESSION["room"] = $roomID;

        // success.

        echo $roomID;
    }