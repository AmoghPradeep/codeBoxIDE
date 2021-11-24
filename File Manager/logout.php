<?php
    $req = null;
    foreach($_POST as $p){
        $req = $p;
    }
    if ($req === "terminate"){
        session_start();
        session_unset();
        session_destroy();
        echo "ok";
    }