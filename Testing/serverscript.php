<?php
    $req[] = null;
    $i = 0;
    foreach($_POST as $p){
        $req[$i] = $p;
        $i ++;
    }

    if ($req[0][strlen($req[0]) - 1] == 'v'){
        session_start();
        echo "id : ".session_id();
        if (strlen($_SESSION["code"]) == 0){
            echo "loading...%%%%%%%<sitedata-name>%%%%%%";
        }
        echo $_SESSION["code"]."%%%%%%%<sitedata-name>%%%%%%";
    }

    else if ($req[0][strlen($req[0]) - 1] == 'h'){
        session_start();
        echo "code set to : ".$req[1];
        $_SESSION["code"] = $req[1];
    }
