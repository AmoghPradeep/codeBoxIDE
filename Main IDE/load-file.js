var url = window.location.href;
var fid = url.match(/fid=([0-9]+)/);

const req = new XMLHttpRequest();
req.onload = function(){
    if (this.response === "no"){
        document.querySelector(".back").classList.add("remove");
        document.querySelector(".save-btn").disabled = true;
        document.querySelector(".save-btn").classList.add("remove");
        document.querySelector(".file-name").classList.add("remove");
    }
}
req.open("POST", "is-logged-in.php");
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.send("req=loggedstatus");


if (fid != null) {
    // ! ERROR MAYBE
    var file_id = fid[1];
    console.log(file_id, fid);
    const req = new XMLHttpRequest();
    req.onload = function () {
        if (this.response === "%&%&%&INVALID&%&%&%") {
            alert("something went wrong... try again");
            window.location = "../File Manager/file-manager-main.php";
            return;
        }
        var response = this.response.split("%%%%%%%<sitedata-name>%%%%%%");
        var code = response[0];
        var name = response[1];
        var lang = response[2];

        if (lang === "C++"){
            console.log("here c++")
            editor.session.setMode("ace/mode/c_cpp");
        }
        else if (lang === "Python"){
            editor.session.setMode("ace/mode/python");
        }
        else
            editor.session.setMode("ace/mode/java");

        editor.setValue(code);
        editor.gotoLine(1);
        document.querySelector(".file-name").value = name;
    }

    req.open("POST", "load-file.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("fid=" + file_id.trim());
}