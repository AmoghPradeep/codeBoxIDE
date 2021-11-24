<?php
    $f_n = $_POST["first-name"];
    $email = $_POST["email"];
    $pass= $_POST["pass"];

    include_once "connector.php";
    include_once "datacheck-functions.php";

    if (!email_ok($email)){
        echo "Invalid Email !\n";
        exit;
    }
    if (!name_ok($f_n)){
        echo "Invalid Name !\n";
        exit;
    }

    // generate unique user id for new user
    $get_id_query = "select max(user_id) from user_data";
    $get_id_query_result = $connection->query($get_id_query);
    while($row = $get_id_query_result->fetch_assoc()){
        $new_user_id = $row["max(user_id)"] + 1;
    }

    $insert_query = 'insert into user_data values ('.$new_user_id.', "'.$f_n.'", "'.$email.'","'.$pass.'");';
    if ($connection->query($insert_query) === TRUE){
        echo("DONE");
    }
    else{
        echo "FAILED\n";
    }
