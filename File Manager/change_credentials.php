<?php
    $data = [];
    $i = 0;
    foreach($_POST as $p){
        $data[$i ++] = $p;
    }

    $type = $data[0];
    session_start();

    // $user_id = $_SESSION["user_id"];
    $user_id = 1;
    include_once "../login-backend/connector.php";
    if ($type === "email"){
        $email = $data[1];
        $emailChangeSQL = 'update user_data set email = "'.$email.'" where user_id = '.$user_id.';';
        echo $emailChangeSQL;

        $connection->query($emailChangeSQL);
    }
    else if ($type === "pass"){
        $pass = $data[1];
        $passChangeSQL = 'update user_data set pass = "'.$pass.'" where user_id = '.$user_id.';';
        echo $passChangeSQL;

        $connection->query($passChangeSQL);
    }

    echo "done";
