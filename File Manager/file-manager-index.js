/**
 * @author Amogh Pradeep
 * @email amogh.pradeep049@nmims.edu.in
 * @create date 2021-09-05 01:17:02
 * @modify date 2021-10-05 21:05:52
 * @desc [description]
 */

// getting file data from get-user-data.php


getFileAndPopulate();
var globalFiles = null;

function getFileAndPopulate(){
    var files = [];
    const req = new XMLHttpRequest();
    req.onload = function () {
        // Server responds with a string.
        // format : [name],[lang],[modified],[fid]&& ... so on for each file.
        var response = this.response;

        // splitting the string and storing in a array.
        files = response.split("&&");
        globalFiles = files;
        if (files[0].length == 0) files = null;
        populate(files);
    }
    req.open("POST", "get-user-data.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("req=getfiledata");
}


// Populating file system with file_entries...

// We have to create a number of containers each containing the data for a file.
// Html skeleton :
/*
<div class="file-info-container">
<div class="file-img-container">
    <img class="file-img" src="../User-Codes/Images/FID.jpg">
</div>
<div class="file-data-container">
    <div class="file-logo">
        <img class="logo" src="LANG.png">
    </div>
    <div class="file-name-date">
        <p class="file-name-p">FILE NAME</p>
        <p class="file-date-p">MODIFIED DATE</p>
    </div>
</div>
</div>
*/
// The width between 2 containers in adjacent coloumns will be 6.25%

var active = null;

function populate(files){
    var left = 6.25, top = 6.25;
    var code = '<img src="../Login Page/Images/filemanager-bg4.png" class="filemanager-bg">';
    var editors = [];

    for (var i = 0; files != null && i < files.length; ++i){
        var metadata = files[i].split(",");
        var name = metadata[0];
        var lang = metadata[1];
        var date = metadata[2];
        var fid = metadata[3];

        var usercode = lang + "File";

        var containerid = "C" + i;
        var html = '<div class="file-info-container" id="' + containerid + '" style = "top:' + top +  '%; left: ' + left + '%"><div class = "fid">'+fid+'</div><div class="cover" style=" height: 67%; width: 100%; position: absolute; z-index: 7; background: transparent; cursor: pointer; "></div><div class="file-img-container" disabled><div id="e' + containerid +'" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;cursor:pointer;">' + usercode + '</div></div><div class="file-data-container"><div class="file-logo"><img class="logo" src="' + lang + '.png"></div><div class="file-name-date"><p class="file-name-p">' + name + '</p><p class="file-date-p">' + date + '</p></div></div></div>'

        code = code + html;
        if (i % 3 == 2){
            top += 32 + 6.25;
            left = 6.25;
        }
        else{
            left += 25 + 6.25;
        }
        if (i == files.length - 1 && i % 3 == 2)
            top -= 32 + 6.25;
    }
    top += 32 + 6.25;
    top = Math.max(top, 98);
    document.querySelector(".file-manager").innerHTML = code + '<div class="footer" style="top:'+top+'%;">Amogh</div>';

    for (var i = 0;files != null && i < files.length; ++i){
        var metadata = files[i].split(",");
        var containerid = "eC" + i;
        editors[i] = ace.edit(containerid);
        setCode(editors[i], metadata[3], metadata[1]);
        editors[i].setFontSize(10);
        if (metadata[1] == "C++")
            editors[i].session.setMode("ace/mode/c_cpp");
        else
            editors[i].session.setMode("ace/mode/python");
        editors[i].setOptions({readOnly: true, highlightActiveLine: false, highlightGutterLine: false});
        editors[i].renderer.$cursorLayer.element.style.display = "none"
    }

    for (var i = 0;files != null && i < files.length; ++i){
        var searchTag = "#C" + i;
        document.querySelector(searchTag).addEventListener("click" , function (searchTag){
            var fileID = this.querySelector(".fid").innerHTML;
            serviceClick(searchTag, fileID);
        })
    }
}

function redirectToMainIDE(fileNumber){
    var url = "../Main IDE/ide-page.php?fid=" + fileNumber.trim();
    window.location = url;
}

function serviceClick(data, fileID){
    var path = data.path;
    var idNumber = null;

    // finding out id of the container that was clicked.
    for (var i = 0; i < path.length; ++i){
        var regex = /id="C\d+"/g;
        var match = path[i].outerHTML.match(regex);
        if (match != null){
            match = match[0].toString();
            idNumber = match.match(/\d+/g)[0].toString();
            break;
        }
    }

    if (active == idNumber){
        redirectToMainIDE(fileID);
    }


    // removing border from any other active container.
    if (active != null){
        document.querySelector("#C" + active).style.border = "1px solid lightgrey";
    }

    // applying "active" border on clicked container.
    active = idNumber;
    document.querySelector("#C" + active).style.border = "2px solid #007EFF";
    document.querySelector(".file-settings").classList.remove("remove");
}

function setCode(editor, fid, lang){
    if (fid != null) {
        const req = new XMLHttpRequest();

        req.onload = function () {
            if (this.response === "%&%&%&INVALID&%&%&%") {
                editor.setValue("C++ File");
            }

            var respnose = this.response.split("%%%%%%%<sitedata-name>%%%%%%");
            var code = respnose[0];

            if (lang === "C++"){
                var regex = /.*int\S*\s*main\s*[(][)]\s*{/;

                var index = code.match(regex).index;
                if (index){
                    code = code.substring(index, code.length);
                }
                // var codelines = code.split("\n");
                // code = "";
                // for (var i = 0; i < 9 && i < codelines.length; ++i){
                //     code = code + codelines[i] + "\n";
                // }
            }
            if (editor.getValue != code)
                editor.setValue(code);
            editor.gotoLine(1);
        }

        req.open("POST", "../Main IDE/load-file.php");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("fid=" + fid.trim());
    }
}


// Terminates session and Logs out user
// document.querySelector(".back").addEventListener("click", function(){
//     console.log("here");
//     const req = new XMLHttpRequest();
//     req.onload = function(){
//         console.log(this.response);
//         if (this.response == "ok")
//             window.location = "../Login Page/login.php";
//     }
//     req.open("POST", "logout.php");
//     req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     req.send("req=terminate");
// })





// Create new button event listner.
var createDropOpen = false;

document.querySelector(".create-new").addEventListener("click", function () {
    var top;
    if (createDropOpen)
        top = 60;
    else
        top = 125;

    document.querySelector(".join-new").style.top = top + "px";
    document.querySelector(".join-dropdown").style.top = (top + 30) + "px";
    document.querySelector(".create-dropdown").classList.toggle("remove");

    createDropOpen = !createDropOpen;
})


document.querySelector(".join-new").addEventListener("click", function(){
    document.querySelector(".join-dropdown").classList.toggle("remove");
})

// search bar

// servicing search requests.
prevSearchResults = [];
document.querySelector(".search-bar-input").addEventListener("input", function(){
    searchResults = [];
    files = globalFiles;
    for (var i = 0; i < files.length; ++i){
        metadata = files[i].split(",");
        searchString = this.value;
        var regex = new RegExp(searchString, "i");
        if (metadata[0].match(regex)){
            searchResults.push(files[i]);
        }
    }
    if (searchResults != prevSearchResults)
        populate(searchResults);
    else console.log("not match");
    prevSearchResults = searchResults;
})


// Room functions ...



var joinRoom = document.querySelector(".join-submit-credential");

joinRoom.addEventListener("click", enterRoom);

function enterRoom(){
    var roomName = document.querySelector(".room-name").value;
    var roomPass = document.querySelector(".room-pass").value;

    const req = new XMLHttpRequest();
    req.onload = function(){
        if (this.response == "INVALID"){
            alert("Room doesn't exist");
        }
        else{
            var url = "../Main IDE/ide-page.php?rid=" + this.response.trim();
            window.location = url;
        }
    }
    req.open("POST", "../Main IDE/Room System/verify_join.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("name="+roomName+"&pass="+roomPass);
}

// leaving any room the user is part of.

const delreq = new XMLHttpRequest();
delreq.open("POST", "../Main IDE/Room System/leave_room.php");
delreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
delreq.send("req=delete");

delreq.onload = function(){
    console.log(this.response);
}


// create new file...

document.querySelector(".lang-cpp").addEventListener("click", function (){
    createNewFile(1);
})


function createNewFile(lang){
    var url;
    if (lang == 1) {
        url = "../Main IDE/ide-page.php?lang=C++"
    }
    else if (lang == 2){
        url = "../Main IDE/ide-page.php?lang=py"
    }
    else{
        url = "../Main IDE/ide-page.php?lang=java"
    }
    window.location = url;
}

document.querySelector(".lang-python").addEventListener("click", function(){
    createNewFile(2)
})

// deleting and downloading files...


document.querySelector(".fa-trash-alt").addEventListener("click", deleteActiveFile);

function deleteActiveFile(){
    confirmation = confirm("This file will be permanently deleted!");
    if (confirmation){
        var fileID = document.querySelector("#C" + active).querySelector(".fid").innerHTML.trim()
        const req = new XMLHttpRequest();
        req.onload = function () {
            console.log(this.response);
            active = null;
            getFileAndPopulate();
        }
        req.open("POST", "delete-file.php");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("fileid=" + fileID);
    }
}



// Update image.
updateImage();
function updateImage(){
	var imageContainer = document.querySelector(".user-img");

	var req = new XMLHttpRequest();

	req.onload = function(){
		var file_name = this.response;
		console.log(file_name);

		if (file_name  !== "none"){
			imageContainer.src = file_name;
		}
	}

	req.open("POST", "get_img.php");
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send("req=userid");
}


// UserProfile Section..

var user_image = document.querySelector(".user-img")

user_image.addEventListener("click", showProfile);
document.querySelector(".focus-out").addEventListener("click", showProfile);
function showProfile(){
    document.querySelector(".focus-out").classList.toggle("remove")
    document.querySelector(".wrapper").classList.toggle("remove")

}