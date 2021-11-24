<?php
    $request = file_get_contents("php://input");
    $data = json_decode($request, true);

    $message = $data["message"];
    session_start();

    $userID = $_SESSION["user_id"];
    echo "here .. \n";
    if (!isset($_SESSION["room"]))
        exit;
    echo "there ... \n";
    $roomID = $_SESSION["room"];


    include_once "../../login-backend/connector.php";

    // Uploading message to database.
    $addMessageSQL = "insert into room_chat values (".$roomID.', '.$userID.', "'.$message.'", CURRENT_TIMESTAMP);';
    echo $addMessageSQL;

    $connection->query($addMessageSQL);
