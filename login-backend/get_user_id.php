<?php
    foreach($_POST as $p){
    }

    session_start();
    if ($_SESSION["user_id"] != null)
        echo $_SESSION["user_id"];
    else
        echo "none";
?>