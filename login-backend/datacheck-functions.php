<?php

function name_ok($name){
    for ($i = 0; $i < strlen($name); ++$i){
        if (ord($name[$i]) > 122 || ord($name[$i]) < 65)
            return false;
        if (ord($name[$i]) > 90 && ord($name[$i] < 97))
            return false;
    }
    return true;
}

function email_ok($email){
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
