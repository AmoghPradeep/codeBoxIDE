<?php
    foreach($_POST as $p){
    }

    session_start();

    $user_id = $_SESSION["user_id"];

    include_once "../login-backend/connector.php";
    $getDataSQL = "select name, email, pass from user_data where user_id = ".$user_id.";";

    $result = $connection->query($getDataSQL);


    while($row = $result->fetch_assoc()){
        $name = $row["name"];
        $email = $row["email"];
        $pass = $row["pass"];
    }

    echo $name."&&&".$email."&&&".$pass;
