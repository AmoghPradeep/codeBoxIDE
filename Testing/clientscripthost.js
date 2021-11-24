setInterval(function(){
    const req = new XMLHttpRequest();
    req.onload = function(){
        console.log(this.response);
    }
    req.open("POST", "serverscript.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("fid=1h&code=" + editor.getValue());
}, 400);