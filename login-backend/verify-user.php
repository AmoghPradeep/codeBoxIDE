<?php
    $data = [];
    $i = 0;
    foreach ($_POST as $p){
        $data[$i++] = $p;
    }

    $username = $data[0];
    $password = $data[1];
    include_once "connector.php";
    include_once "datacheck-functions.php";
    if (!email_ok($username)){
        header("Location: ..\Login Page\login.php?error=wrongcredentials");
        exit;
    }

    $get_pass = "select pass from user_data where email = \"".$username."\";";
    $get_user_id = "select user_id from user_data where email = \"".$username."\";";
    $pass = null;
    $user_id = null;

    $result = $connection->query($get_pass);

    while($row = $result->fetch_assoc()){
        $pass = $row["pass"];
    }
    $result = $connection->query($get_user_id);

    while($row = $result->fetch_assoc()){
        $user_id = $row["user_id"];
    }

    if ($pass === $password){
        session_start();
        $_SESSION["verified"] = true;
        $_SESSION["user_id"] = $user_id;
        echo "yes";
    }
    else{
        echo "no";
    }