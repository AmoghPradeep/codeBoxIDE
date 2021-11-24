

    const req = new XMLHttpRequest();
    req.onload = function(){
        //
    }
    req.open("POST", "forgot_pass.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("fid=" + emailField.value);