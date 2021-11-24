
	// var password = document.querySelector('.password-new').value;
	// 	confirmpassword = document.querySelector('.conf-password').value;

	// 	if(password != confirmpassword){
	// 		alert("Password didn't match!");
	// 		return false;
	// 	}
	// 	else if(password = confirmpassword){
	// 		return true;
	// 	}


console.log("here")
submit = document.querySelector("#submit");

submit.addEventListener("click", upload);

function upload(){
	console.log("here")
	var name = document.querySelector(".first-name-form").value
	var email  = document.querySelector(".mail").value
	var pass = document.querySelector(".password-new").value

	var req = new XMLHttpRequest();

	req.onload = function(){
		console.log(this.response)
		if (this.response === "DONE"){
			window.location = "../Login Page/login.php"
		}
	}

	req.open("POST", "../login-backend/add-new-user.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("first-name="+name+"&pass="+pass + "&email=" + email);
}
