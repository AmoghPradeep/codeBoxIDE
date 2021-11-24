<?php

    // request format :
    // userid, code
    $request = file_get_contents("php://input");
    $data = json_decode($request, true);

    $user_id = $data["room_id"];
    $code = $data["code"];

    // opening (or creating) the file and writing data.
    $codefile = fopen("../../Rooms/code-".$user_id.".txt", "w");

    fwrite($codefile, $code);