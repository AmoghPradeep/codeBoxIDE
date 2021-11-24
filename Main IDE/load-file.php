<?php
    $fid = null;
    foreach($_POST as $p){
        $fid = $p;
    }
    session_start();
    if (!$_SESSION["verified"]){
        exit;
    }
    $user_id = $_SESSION["user_id"];

    include_once "../login-backend/connector.php";

    if (verify($user_id, $fid, $connection)){
        $location = null;
        $name = null;
        $sql = "select location, name, lang from code_database where file_id = ".$fid.";";
        $result = $connection->query($sql);
        while($row = $result->fetch_assoc()){
            $location = $row["location"];
            $name = $row["name"];
            $lang = $row["lang"];
        }
        $output = file_get_contents("../User-Codes/".$location);
        echo $output."%%%%%%%<sitedata-name>%%%%%%".$name."%%%%%%%<sitedata-name>%%%%%%".$lang;
    }
    else{
        echo "%&%&%&INVALID&%&%&%";
    }

    function verify($user_id, $file_id, $connection){
        $sql = "select count(*) from code_database where user_id = ".$user_id." and file_id = ".$file_id.";";
        $result = $connection->query($sql);
        $count = null;
        while($row = $result->fetch_assoc()){
            $count = $row["count(*)"];
        }
        if ($count === '1') return true;
        return false;
    }