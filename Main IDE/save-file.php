<?php
    // processing request from client...

    $dataObj = file_get_contents("php://input");
    $dataJSON = json_decode($dataObj);

    $idx = 0;
    $data = [];

    foreach ($dataJSON as $key => $value){
        $data[$idx ++] = $value;
    }

    // preparing sql entry...
    include_once "../login-backend/connector.php";

    function getFileID($connection){
        $sql = "select MAX(file_id)  as 'max' from code_database";
        $result = $connection->query($sql);
        $count = null;
        while($row = $result->fetch_assoc()){
            $count = $row["max"];
        }
        return $count;
    }

    function inQuotes($str){
        return "\"".$str."\"";
    }

    function fileExists($connection, $file_id){
        $sql = "select count(*) from code_database where file_id = ".$file_id.";";
        $result = $connection->query($sql);
        $count = null;
        while($row = $result->fetch_assoc()){
            $count = $row["count(*)"];
        }

        if ($count === "1")
            return true;
        return false;
    }
    session_start();
    $code = $data[0];
    if (!$_SESSION["verified"]){
        exit;
    }
    $user_id = $_SESSION["user_id"];
    $new_file_id = getFileID($connection) + 1;
    $user_file_name = $data[1];
    $lang = $data[2];
    $file_id = $data[3];
    $time = date("His");
    $server_file_name =  $user_id."&&".$user_file_name."&&".$time;
    if ($lang === "C++"){
        $server_file_name = $server_file_name.".cpp";
    }
    elseif ($lang === "Python"){
        $server_file_name = $server_file_name.".py";
    }

    if (fileExists($connection, $file_id)){
        $location = null;
        $sql = "select location from code_database where file_id = ".$file_id.";";
        $result = $connection->query($sql);

        // update timestamp..
        $sql = 'update code_database set modified = CURRENT_TIMESTAMP, name = "'.$user_file_name.'" where file_id ="'.$file_id.'";';
        $connection->query($sql);
        while($row = $result->fetch_assoc()){
            $location = $row["location"];
        }

        $file = fopen("../User-Codes/".$location, "w");
        fwrite($file, $code);
    }
    else{
        // Writing code into file...
        echo $server_file_name;
        $file = fopen("../User-Codes/".$server_file_name, "w");
        fwrite($file, $code);

        // Updating Database...
        $sql = "insert into code_database(file_id, user_id, name, lang, location) VALUES (";
        $sql = $sql.$new_file_id.", ".$user_id.", ".inQuotes($user_file_name).", ".inQuotes($lang).", ".inQuotes($server_file_name).");";
        $connection->query($sql);
    }
    exit;