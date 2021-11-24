<?php
    $req = null;
    foreach($_POST as $p){
        $req = $p;
    }

    if ($req === "loggedstatus"){
        session_start();
        if (session_status() == PHP_SESSION_ACTIVE){
            echo "ok";
        }
        else
            echo "no";
    }
?>