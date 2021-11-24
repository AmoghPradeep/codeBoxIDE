<!DOCTYPE html>
<html lang="en">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="apple-touch-icon" sizes="180x180" href="..\favicon\CodeBox icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="..\favicon\CodeBox icon.png">
<link rel="icon" type="image/png" sizes="16x16" href="..\favicon\CodeBox icon.png">
<link rel="manifest" href="/site.webmanifest">
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
<link rel="stylesheet" href="ide-styles.css">
<link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">

<head>
    <title>CodeBox</title>
</head>

<body>
    <div class="focus-out remove"></div>
    <!-- Settings menu -->
    <div class="settings-menu remove">
        <p style="padding-left: 27px;position: absolute;top: 18px;">Font Size</p>
        <button class="font-btn drop-btn">16px<i class="fas fa-chevron-down"></i></button>
        <div class="font-options remove">
            <button class="choice-btn">14px</button>
            <button class="choice-btn selected-choice">16px</button>
            <button class="choice-btn">18px</button>
            <button class="choice-btn">20px</button>
        </div>
        <p style="padding-left: 27px;position: absolute;top: 103px;">Theme</p>
        <button class="theme-btn drop-btn">Textmate<i class="fas fa-chevron-down"></i></button>
        <div class="theme-options remove">
            <button class="choice-btn" style="height : 15%">Textmate</button>
            <button class="choice-btn" style="height : 15%">Dracula</button>
            <button class="choice-btn selected-choice" style="height : 15%">Solarized</button>
            <button class="choice-btn" style="height : 15%">Monokai</button>
            <button class="choice-btn" style="height : 15%">Tomorrow</button>
        </div>
        <p style="padding-left: 27px;position: absolute;top: 184px;">Tab Size</p>
        <button class="tab-btn drop-btn">4<i class="fas fa-chevron-down"></i></button>
        <div class="tab-options remove">
            <button class="choice-btn" style="height : 24%">2</button>
            <button class="choice-btn selected-choice" style="height : 24%">4</button>
            <button class="choice-btn" style="height : 24%">8</button>
        </div>
    </div>

    <div class="create-room remove">
        <p class="room-name-hdn">Room Name</p>
        <input type="text" class="room-name-input">
        <p class="room-pass-hdn">Password</p>
        <input type="text" class="room-pass-input">
        <button class="create-room-btn">Create Room</button>
    </div>

    <!-- page header -->
    <div class="header">
        <img class="header-img" src="..\Login Page\Images\CodeBox wide transparent darktheme.png">
        <div class="nav-bar">
            <input class="file-name" type="name" placeholder="Untitled"><i class="lni lni-pencil"></i>
            <button class="run-btn"><i class="fas fa-play"></i></button>
            <button class="save-btn white-btn"><i class="fas fa-save"></i></button>
            <button class="settings white-btn"><i class="fas fa-cog"></i></button>
            <div class="settings-menu remove">
            </div>
        </div>
    </div>

    <!-- chatbox -->
    <div class="room-box" style="left : -27%">
        <div class="room-box-header">
            <button class="people-window-btn"><i class="fas fa-user-cog"></i></button>
            <button class="chat-window-btn active"><i class="fas fa-comment-dots"></i></button>
        </div>
        <div class="chat-window">
            <div class="messages">
                <div class="message-container"><div class="pic"><img class="pic-img" src = "../File Manager/i4.png"> </div><div class="message-content"><div class="message-container-header"><p class="message-container-header-name">Amogh Pradeep</p><p class="message-container-header-time">Today at 08:37</p></div><div class="message-container-body">hello</div></div></div>
            </div>
            <div class="input">
                <input type="text" placeholder="Message" class="input-message">
                <button class="send-message"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <div class="people-window remove">
            <div class="people-window-heading"><p style="position: absolute;margin-left : 10px">Participants</p><button class="make-host-btn remove">Make Host</button></div>
            <div class="people-window-content-container">
            </div>
        </div>
    </div>


    <!-- Code area (left hand side) -->
    <div class="code-area">

        <div id="editor" class="editor-window"><?php
                                                $package = "&lt;bits/stdc++.h&gt;";
                                                echo "#include " . $package . "\nusing namespace std;\nint main(){\n\t//Start Coding! \n\t\n\treturn 0;\n}" ?>
        </div>
        <script src="load-file.js"></script>
        <div class="social">
            <button class="chat-btn remove"><i class="fas fa-users"></i></button>
            <button class="room-btn"><i class="fas fa-plus" style="padding-right: 5px"></i>Create Room</button>
            <p class="save-status"></p>
        </div>
    </div>

    <!-- Input and output -->
    <div class="io-container">
        <div class="io-resizer"></div>
        <div class="output-container">
            <div class="output-hdn">
                <div class="running-status hide">
                    <p id="txt" style="position: absolute;color: white;font-size: 0.8rem;margin: 0;top: 24%;left: 15%;">Running</p>
                    <div class="loader"></div>
                </div>
                <div class="finished-status hide">
                    <p id="txt" style="position: absolute;color: white;font-size: 0.8rem;margin: 0;top: 24%;left: 24.5%;">Finished</p>
                </div>
                <p style="position : absolute;left : 3%; top : 25%; font-size:1rem; margin : 0;">Output</p>
            </div>
            <div class="output-textarea">
                <textarea class="output-box" wrap="soft" readonly></textarea>
            </div>
        </div>
        <div class="input-container">
            <div class="input-resizer"></div>
            <div class="input-hdn">
                <p style="position : absolute;left : 3%; top : 25%; font-size:1rem; margin : 0;">Input</p>
            </div>
            <div class="input-textarea">
                <textarea class="input-box" placeholder="Type input here" wrap="soft"></textarea>
            </div>
        </div>
    </div>


    <script src="js/ace.js" type="text/javascript" charset="utf-8"></script>
    <script src="resizer.js"></script>
    <script src="chat-tab.js"></script>
    <script src="ide-page-js.js"></script>

</body>

</html>