<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="apple-touch-icon" sizes="180x180" href="..\favicon\CodeBox icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="..\favicon\CodeBox icon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="..\favicon\CodeBox icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
    <link rel="stylesheet" href="file-manager-styles.css">
    <link rel="stylesheet" href="profile.css">
    <script src="../Main IDE/js/ace.js" type="text/javascript" charset="utf-8"></script>
    <title>CodeBox</title>
</head>

<body>
    <div class="wrapper remove">
		<div class="left">
			<img src="i4.png" alt="profile_img" height="100px" width="100px" class = "image-container">
			<form action = "upload_image.php" method = "POST" enctype="multipart/form-data">
				<input  type="file" style="z-index: 100; padding-top: 20px" name="profilepic" id="profilepic" />
				<input type="submit" value="Submit"/>
			</form>
		</div>
		<div class="right">
			<div class="info">
				<h3>Information</h3>
				<div class="info_data">
					<div class="data">
						<h4>Name :-</h4>
						<p class = "user-name"></p>
					</div>
					<div class="emaildata data">
						<h4>Email :-</h4>
						<p class = "email-data"></p>
						<i class="mail fas fa-edit email-edit"></i>

					</div>
					<div class="passdata data">
						 <h4>Password :-</h4>
						 <p class = "pass-data"></p>
						 <i class="pass fas fa-edit pass-edit"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div class="focus-out remove"></div>
    <div class="header">
        <!-- <button class="back">
            <i class="fas fa-sign-out-alt"></i>
        </button> -->
        <img class="header-img" src="..\Login Page\Images\CodeBox wide transparent darktheme.png">
        <div class="search-bar">
            <div class="user-profile-link">
                <img class = "user-img" src = "i4.png">
            </div>
            <i class="lni lni-search-alt"></i>
            <input type="text" placeholder="Search" class="search-bar-input">
        </div>
    </div>

    <div class="control-tab">
        <!-- Will hold the create new btns, and join room menu -->
        <button class="create-new">Create New File <i class="lni lni-angle-double-down"></i></button>
        <div class="create-dropdown remove">
            <button class="lang-cpp lang-btn"><img src="C++.png" style="
    position: absolute;
    height: 65%;
    left: 3%;
">C++</button>
            <button class="lang-python lang-btn"><img src="Python.png" style="
    position: absolute;
    height: 65%;
    left: 3%;
">Python</button>
        </div>
        <button class="join-new">Join a Room <i class="lni lni-angle-double-down"></i></button>
        <div class="join-dropdown remove">
            <input type="text" class="room-name" placeholder="Room Name">
            <input type="text" class="room-pass" placeholder="Password">
            <button class="join-submit-credential">Join</button>
        </div>

        <div class="file-settings remove">
            <i class="far fa-trash-alt"></i>
            <i class="lni lni-download"></i>
        </div>
    </div>

    <div class="file-manager">
    </div>
    <script src="../Main IDE/js/ace.js" type="text/javascript" charset="utf-8"></script>
    <script src="profile.js" type="text/javascript" charset="utf-8"></script>

</body>
<script src="file-manager-index.js"></script>

</html>