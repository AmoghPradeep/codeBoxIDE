var editor = ace.edit("editor");

editor.setTheme("ace/theme/textmate");
editor.setOptions({
    fontFamily: "Roboto Mono"
});

document.querySelector(".code-area").addEventListener("keypress", function () {
    document.querySelector(".save-status").innerHTML = 'Unsaved<i class="fas fa-exclamation save-status-symbol"></i>';
})

document.getElementById('editor').style.fontSize = '16px';
document.getElementById('editor').style.overflow = 'auto';

var objects = document.querySelectorAll(".ace_scrollbar");
for (var i = 0; i < objects.length; ++i) {
    objects[i].classList.add("hide");
}

// setting language if for new file.
var regex = new RegExp(/lang=(C\+\+|py)/g);

if (window.location.toString().match(regex) != null){
    var match = window.location.toString().match(regex)[0];
    var lang = match.substring(match.indexOf('=')+1, match.length);

    if (lang === "py"){
        editor.session.setMode("ace/mode/python");
        editor.setValue("# Start Coding")
    }
    else if (lang === "C++"){
        editor.session.setMode("ace/mode/c_cpp");
    }
}


// storing userID for future reference.
userID = null;
const userIDreq = new XMLHttpRequest();

userIDreq.onload = function () {
    userID = this.response;
}

userIDreq.open("POST", "../login-backend/get_user_id.php");
userIDreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
userIDreq.send("req=user_id");




document.querySelector("#editor").addEventListener("mouseover", function () {
    var objects = document.querySelectorAll(".ace_scrollbar");
    for (var i = 0; i < objects.length; ++i) {
        objects[i].classList.remove("hide");
    }

})

document.querySelector("#editor").addEventListener("mouseout", function () {
    var objects = document.querySelectorAll(".ace_scrollbar");
    for (var i = 0; i < objects.length; ++i) {
        objects[i].classList.add("hide");
    }
})

function getFileID() {
    var file_info = url.match(/fid=([0-9]+)/);
    if (file_info == null)
        return -1;
    else return file_info[1];
}
// getting code from editor and passing it to php.
function parseData() {
    var lang = editor.getSession().getMode().$id
    if (lang === "ace/mode/c_cpp"){
        console.log("c++")
        var code = editor.getValue();
        var header = '\nfreopen("input.txt","r",stdin);freopen("output.txt","w",stdout);';
        for (var x = code.indexOf("main"); ; ++x) {
            if (code[x] == "{") {
                code = code.substring(0, x + 1) + header + code.substring(x + 1, code.length);
                break;
            }
        }
        var input = document.querySelector(".input-box").value;
        const req = new XMLHttpRequest();

        req.onload = function () {
            var output_box = document.querySelector(".output-box");
            var output = this.responseText;
            if (output.includes("exit code : 1")) {
                output = "Compile Error!!!\n" + output.substring(output.indexOf("stderr : ") + 9, output.length);
                output_box.innerHTML = output;
            }
            else
                output_box.innerHTML = output;
            document.querySelector(".running-status").classList.add("hide");
            document.querySelector(".finished-status").classList.remove("hide");
            return;
        };

        const toSend = {
            user_code: code,
            user_input: input,
            user_lang: "C++"
        }
        const jsonString = JSON.stringify(toSend);

        req.open("POST", "code-runner.php");
        req.setRequestHeader("Content-type", "application/json");
        req.send(jsonString);
        document.querySelector(".finished-status").classList.add("hide");
        document.querySelector(".running-status").classList.remove("hide");
    }
    else if (lang = "ace/mode/python"){
        console.log("here")
        var code = editor.getValue();
        var header = "\nimport sys\nsys.stdin = open('input.txt', 'r')\nsys.stdout = open('output.txt', 'w')\n"
        code = header + code;
        var input = document.querySelector(".input-box").value;
        const req = new XMLHttpRequest();

        req.onload = function () {
            var output_box = document.querySelector(".output-box");
            var output = this.responseText;
            if (output.includes("exit code : 1")) {
                output = "Compile Error!!!\n" + output.substring(output.indexOf("stderr : ") + 9, output.length);
                output_box.innerHTML = output;
            }
            else
                output_box.innerHTML = output;
            document.querySelector(".running-status").classList.add("hide");
            document.querySelector(".finished-status").classList.remove("hide");
            return;
        };

        const toSend = {
            user_code: code,
            user_input: input,
            user_lang: "py"
        }
        const jsonString = JSON.stringify(toSend);

        req.open("POST", "code-runner.php");
        req.setRequestHeader("Content-type", "application/json");
        req.send(jsonString);
        document.querySelector(".finished-status").classList.add("hide");
        document.querySelector(".running-status").classList.remove("hide");
    }
}

document.querySelector(".run-btn").addEventListener("click", parseData);


// Save Editor Data On Server.
function saveCode() {



    document.querySelector(".save-status").innerHTML = 'Saving<i class="fas fa-spinner save-status-symbol"></i>';
    var code = editor.getValue();
    var name = document.querySelector(".file-name").value;
    if (name === "") {
        alert("Please enter valid file name!");
        return;
    }
    var lang;
    var langEditor = editor.getSession().getMode().$id
    if (langEditor === "ace/mode/c_cpp"){
        lang = "C++"
    }
    else if (langEditor === "ace/mode/python"){
        lang = "Python"
    }

    const req = new XMLHttpRequest();
    const toSend = {
        user_code: code,
        file_name: name,
        file_lang: lang,
        file_id: getFileID()
    }

    req.onload = function () {
        sleepFor(800);
        document.querySelector(".save-status").innerHTML = 'Saved<i class="fas fa-check save-status-symbol"></i>';
    }
    const toSendJSON = JSON.stringify(toSend);
    req.open("POST", "save-file.php");
    req.setRequestHeader("Content-type", "application/json");
    req.send(toSendJSON);
}
var saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", saveCode);

document.querySelector(".file-name").addEventListener("input", function () {
})


// SETTINGS MENU
document.querySelector(".settings").addEventListener("click", function () {
    document.querySelector(".settings-menu").classList.remove("remove");
    document.querySelector(".focus-out").classList.remove("remove");
})
document.querySelector(".focus-out").addEventListener("click", function () {
    document.querySelector(".settings-menu").classList.add("remove");
    document.querySelector(".create-room").classList.add("remove");
    document.querySelector(".focus-out").classList.add("remove");
})
// process font change.
document.querySelector(".font-btn").addEventListener("click", function () {
    document.querySelector(".font-options").classList.toggle('remove');
    document.querySelector(".theme-options").classList.add('remove');
    document.querySelector(".tab-options").classList.add("remove");
    var btns = document.querySelector(".font-options").querySelectorAll(".choice-btn");
    var chosen = null;
    for (var i = 0; i < btns.length; ++i) {
        if (btns[i].classList.contains('selected-choice'))
            chosen = btns[i];
        btns[i].addEventListener("click", changeFont);
    }

    function changeFont() {
        var newfont = this.innerHTML;
        document.getElementById('editor').style.fontSize = newfont;
        document.querySelector(".font-btn").innerHTML = newfont + '<i class="fas fa-chevron-down">';
        chosen.classList.toggle("selected-choice");
        this.classList.toggle("selected-choice");
        chosen = this;
        document.querySelector(".font-options").classList.toggle('remove');
        for (var i = 0; i < btns.length; ++i) {
            btns[i].removeEventListener("click", changeFont);
        }
    }
})

document.querySelector(".theme-btn").addEventListener("click", function () {
    document.querySelector(".theme-options").classList.toggle('remove');
    document.querySelector(".font-options").classList.add("remove");
    document.querySelector(".tab-options").classList.add("remove");

    var btns = document.querySelector(".theme-options").querySelectorAll(".choice-btn");
    var chosen = null;
    for (var i = 0; i < btns.length; ++i) {
        if (btns[i].classList.contains('selected-choice'))
            chosen = btns[i];
        btns[i].addEventListener("click", changeTheme);
    }

    function changeTheme() {
        var newTheme = this.innerHTML;
        newThemeOrig = newTheme;
        newTheme.replace(/ /g, '_');
        if (newTheme === "Solarized") newTheme = 'solarized_light';
        editor.setTheme("ace/theme/" + newTheme.toLowerCase());
        document.querySelector(".theme-btn").innerHTML = newThemeOrig + '<i class="fas fa-chevron-down">';
        chosen.classList.toggle("selected-choice");
        this.classList.toggle("selected-choice");
        chosen = this;
        document.querySelector(".theme-options").classList.toggle('remove');
        for (var i = 0; i < btns.length; ++i) {
            btns[i].removeEventListener("click", changeTheme);
        }
    }
})

document.querySelector(".tab-btn").addEventListener("click", function () {
    document.querySelector(".tab-options").classList.toggle('remove');
    document.querySelector(".theme-options").classList.add('remove');
    document.querySelector(".font-options").classList.add("remove");

    var btns = document.querySelector(".tab-options").querySelectorAll(".choice-btn");
    var chosen = null;
    for (var i = 0; i < btns.length; ++i) {
        if (btns[i].classList.contains('selected-choice'))
            chosen = btns[i];
        btns[i].addEventListener("click", changeTab);
    }

    function changeTab() {
        var newTab = this.innerHTML;
        editor.session.setOptions({
            tabSize: parseInt(newTab),
            useSoftTabs: true
        });
        document.querySelector(".tab-btn").innerHTML = newTab + '<i class="fas fa-chevron-down">';
        chosen.classList.toggle("selected-choice");
        this.classList.toggle("selected-choice");
        chosen = this;
        document.querySelector(".tab-options").classList.toggle('remove');
        for (var i = 0; i < btns.length; ++i) {
            btns[i].removeEventListener("click", changeTab);
        }
    }

})

// Create Room

document.querySelector(".room-btn").addEventListener("click", function () {
    document.querySelector(".focus-out").classList.remove("remove");
    document.querySelector(".create-room").classList.remove("remove");
})


function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { }
}


// Room Functionalities...
var intervalUploader = null;
document.querySelector(".create-room-btn").addEventListener("click", createRoom);

function createRoom() {
    var nameForm = document.querySelector(".room-name-input");
    var passForm = document.querySelector(".room-pass-input");

    if (nameForm.value.length == 0 || passForm.value.length == 0) {
        alert("Invalid Room Details");
        return;
    }

    // getting user id first.
    const req = new XMLHttpRequest();

    req.onload = function () {
        // on response from get_user_id.php sending request to create_room.php
        var userID = this.response;
        const data = {
            user_id: userID,
            name: nameForm.value,
            password: passForm.value
        };

        const jsonReq = JSON.stringify(data);

        const xhr = new XMLHttpRequest();

        xhr.open("POST", "Room System/create_room.php");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonReq);

        xhr.onload = function () {
            var response = this.response;
            if (response === "INVALID"){
                alert("Something went wrong try again.");
            }   else if (response === "UNIQUE") {
                alert("Enter a unique name! This one's currently in use :( ");
            }   else {
                console.log("room created");

                document.querySelector(".save-status").style.right = "20px";
                document.querySelector(".room-btn").classList.add("remove");
                document.querySelector(".create-room").classList.toggle("remove");
                document.querySelector(".focus-out").classList.toggle("remove");
                document.querySelector(".chat-btn").classList.remove("remove");

                intervalUploader = setInterval(function(){uploadData(response)}, 500);
                setInterval(updateMessages, 300);
            }
        }
    }

    req.open("POST", "../login-backend/get_user_id.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("req=user_id");
}


function uploadData(roomID) {
    var editorData = editor.getValue();
    editorData += "caretEDITOR<" + editor.getCursorPosition().row + "," + editor.getCursorPosition().column + ">";
    const data = {
        room_id : roomID,
        code : editorData
    };
    const jsonReq = JSON.stringify(data);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "Room System/update_host_code.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonReq);

    xhr.onload = function () {
    }
}

function uploadDataNoID(){
    var editorData = editor.getValue();
    editorData += "caretEDITOR<" + editor.getCursorPosition().row + "," + editor.getCursorPosition().column + ">";
    const data = {
        code : editorData
    };
    const jsonReq = JSON.stringify(data);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "Room System/update_host_code2.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonReq);

    xhr.onload = function () {
    }
}


// If user is alread in room.
var intervalGetter = null;
var url = window.location.href;
var regex = /rid=\d*/g

var match = url.match(regex);

if (match != null && match.length != 0){
    document.querySelector(".chat-btn").classList.remove("remove");
    var str = url.match(regex)[0];
    var id = str.substring(4, str.length);
    editor.setReadOnly(true);
    editor.session.setUseWorker(false);
    editor.setShowPrintMargin(false);
    document.querySelector(".save-status").style.right = "20px";
    document.querySelector(".room-btn").classList.toggle("remove");
    intervalGetter = setInterval(function(){getData(intervalGetter, id, editor)}, 500);
    setInterval(updateMessages, 300);
}

function getData(interval, id, editor){
    const req = new XMLHttpRequest();
    var cursor = editor.getCursorPosition();
    req.onload = function () {
        if (this.response == "INVALID"){
            clearInterval(interval);
            alert("Something went wrong! L330");
        }
        else{
            var caretfinder = /caretEDITOR<\d*,\d*>/g;
            var caret = this.response.match(caretfinder)[0];

            var temp = caretfinder.exec(this.response);
            var index = temp.index;

            var numbers = /([0-9]+),([0-9]+)/g;
            var match = caret.match(numbers)[0];
            var position = match.split(",");

            var responseCode = this.response.substring(0, index)
            var mainfinder = /int\W+main/g
            if (responseCode.match(mainfinder) != null)
                editor.session.setMode("ace/mode/c_cpp");
            else
                editor.session.setMode("ace/mode/python");

            editor.setValue(responseCode);
            editor.selection.moveTo(cursor.row, cursor.column);
        }
    }
    req.open("POST", "Room System/get_roomdata.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("roomid=" + id);
}

function getDataNoURL(){
    const req = new XMLHttpRequest();
    var cursor = editor.getCursorPosition();

    req.onload = function () {
        if (this.response == "INVALID"){
            clearInterval(interval);
            alert("Something went wrong! L330");
        }
        else{
            console.log(this.response);
            var caretfinder = /caretEDITOR<\d*,\d*>/g;
            var caret = this.response.match(caretfinder)[0];

            var temp = caretfinder.exec(this.response);
            var index = temp.index;

            var numbers = /([0-9]+),([0-9]+)/g;
            var match = caret.match(numbers)[0];
            var position = match.split(",");

            editor.setValue(this.response.substring(0, index));
            editor.selection.moveTo(cursor.row, cursor.column);

        }
    }
    req.open("POST", "Room System/get_roomdata2.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("roomid=none");
}

// if user-goes back (or to some other page.)
// we have to delete the room (or decrement user count).

// window.onhashchange = function() {
//     alert("exiting...");
//     const req = new XMLHttpRequest();
//     req.open("POST", "Room System/leave_room.php");
//     req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     req.send("req=delete");

//     req.onload = function(){
//         console.log(this.response);
//     }
// }

// Messaging

var messageInput = document.querySelector(".input-message");

messageInput.addEventListener("keypress", function (e){
    if (e.key == "Enter"){
        sendMessage();
        this.value = null;
    }
})

document.querySelector(".send-message").addEventListener("click", sendMessage);

function sendMessage(){
    var text = messageInput.value;
    if (text.length > 0){
        // Uploading text message to database...
        var messageReq = new XMLHttpRequest();



        const toSend = {
            user_id : userID.toString(),
            message : text
        }
        const jsonString = JSON.stringify(toSend);

        messageReq.open("POST", "Chat/send-message.php");
        messageReq.setRequestHeader("Content-type", "application/json");
        messageReq.send(jsonString);


        messageReq.onload = function (){
            updateMessages();
        }
    }
}

function updateMessages(){
    const getMessageReq = new XMLHttpRequest();

    getMessageReq.open("POST", "Chat/get-messages.php");
    getMessageReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getMessageReq.send("req=user_id");

    getMessageReq.onload = function(){
        rawData = this.response;
        data = rawData.split("&&&");

        messageHTMLcode = '';
        for (var i = 0; i < data.length; ++i){
            message = data[i].split("<&>");
            if (message.length == 4){
                var html = '<div class="message-container"><div class="message-container-header"><p class="message-container-header-name">' + message[0] + '</p><p class="message-container-header-time">Today at ' + message[2] + '</p></div><div class="message-container-body">' + message[1] + '</div></div>';
                var html2 = '<div class="message-container"><div class="pic"><img class="pic-img" src = "' + message[3] + '"> </div><div class="message-content"><div class="message-container-header"><p class="message-container-header-name">' + message[0] + '</p><p class="message-container-header-time">Today at '+ message[2] +'</p></div><div class="message-container-body">' + message[1] + '</div></div></div>'
                messageHTMLcode = messageHTMLcode + html2;
            }
        }
        document.querySelector(".messages").innerHTML = messageHTMLcode;
        var objDiv = document.querySelector(".messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


// people settings tab.

document.querySelector(".people-window-btn").addEventListener("click", function(){
    this.classList.toggle("active");
    document.querySelector(".chat-window-btn").classList.toggle("active");
    document.querySelector(".chat-window").classList.toggle("remove");
    document.querySelector(".people-window").classList.toggle("remove");
})

document.querySelector(".chat-window-btn").addEventListener("click", function(){
    this.classList.toggle("active");
    document.querySelector(".people-window-btn").classList.toggle("active");
    document.querySelector(".chat-window").classList.toggle("remove");
    document.querySelector(".people-window").classList.toggle("remove");
})


setInterval(updatePeople, 2000);

var oldPeople = null

function updatePeople(){
    const req = new XMLHttpRequest();
    req.onload = function (){
        rawData = this.response;
        const req2 = new XMLHttpRequest();

        req2.onload = function(){
            hostName = this.response;
            people = rawData.split("<&>");
            people.pop()
            if (people.length == 0)
                return
            var peopleCode = "";
            for (var i = 0; i < people.length; ++i){
                var html = null;
                if (people[i].length == 0) continue;
                if (people[i].trim() == hostName.trim()){
                    html = '<div class="people-window-content">' + people[i] + '<i class="fas fa-crown"></i></div>'
                }
                else
                    html = '<div class="people-window-content">' + people[i] + '<i class="fas fa-crown make-host remove"></i></div>'
                peopleCode = peopleCode + html;
            }

            if (oldPeople == people)
                return
            else{
                peopleCode
                oldPeople = people
                document.querySelector(".people-window-content-container").innerHTML = peopleCode;
                isHost();
            }
        }

        req2.open("POST", "get_host.php");
        req2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req2.send("req=host");

    }
    req.open("POST", "get_people.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("req=users");
}

// host priviledges.
function isHost(){
    const req = new XMLHttpRequest();

    req.onload = function(){
        // console.log(this.response);
        if (this.response === "true"){
            if (intervalUploader == null){
                console.log("null");
                intervalUploader = setInterval(uploadDataNoID, 500);
                clearInterval(intervalGetter);
                editor.setReadOnly(false);
                editor.session.setUseWorker(true);
                editor.setShowPrintMargin(true);
            }
            people = document.querySelectorAll(".make-host");

            for (var i = 0; i < people.length; ++i){
                people[i].classList.remove("remove");
                if (people[i].getAttribute('listner') !== 'true')
                    people[i].addEventListener("click", makeHost);
            }
        }
        else{
            removeHost();
        }
    }

    req.open("POST", "is_host.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("req=host");
}

function makeHost(e){
    console.log("inside makehost");
    var newHost = e.path[1].innerText;
    var req = new XMLHttpRequest();
    req.onload = function(){
        console.log(this.response);
    }

    req.open("POST", "make_host.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("name=" + newHost.trim());
}

function removeHost(){
    if (intervalUploader == null) return;

    clearInterval(intervalUploader);
    intervalUploader = null;
    intervalGetter = setInterval(getDataNoURL, 500);
    editor.renderer.$cursorLayer.element.style.display = "none"
    editor.setReadOnly(true);
    editor.session.setUseWorker(false);
    editor.setShowPrintMargin(false);
}