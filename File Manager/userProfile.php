<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
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
    <link rel="stylesheet" href="profile.css">

	<title>CodeBox : Profile</title>
</head>
<body>
	<div class="wrapper">
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
</body>
</html>
<script src="https://kit.fontawesome.com/9d14c9dd82.js" crossorigin="anonymous"></script>
<script src="profile.js"></script>
