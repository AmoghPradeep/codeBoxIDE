// setting data.

var req = new XMLHttpRequest();
updateImage()
req.onload = function(){
	var response = this.response;
	response = response.split("&&&");
	var name = response[0];
	var email = response[1];
	var pass = response[2];

	document.querySelector('.user-name').innerText = name;
	document.querySelector(".email-data").innerText = email;
	document.querySelector(".pass-data").innerText = pass;
}


req.open("POST", "get_credentials.php");
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.send("req=data");





 document.querySelector("#profilepic").addEventListener("change",function(){
	console.log("here")
	var file = this.files[0];
    var formdata = new FormData();
    formdata.append('file', file);

    var req = new XMLHttpRequest();
    req.open('POST', 'upload_img.php');
    req.setRequestHeader('Content-Type', 'multipart/form-data');
    req.send(formdata);
	req.onload = function(){
		console.log(this.response);
	}

})

document.querySelector(".mail").addEventListener("click",function(){
	document.querySelector(".emaildata").innerHTML='<h4>Email :-</h4><!-- <p>nishit.saraf01@gmail.com</p><i class="mail fas fa-edit"></i> --><input type="mail" class="newemail" style="width:200px"><i class="fas fa-check emailcheck" style="padding: 0px 20px;"></i>'
	document.querySelector(".emailcheck").addEventListener("click",function(){
		var newemail = document.querySelector(".newemail").value
		var req = new XMLHttpRequest();

		req.onload = function(){
			console.log(this.response);
		}


		req.open("POST", "change_credentials.php");
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send("req=email&email=" + newemail);

		document.querySelector(".emaildata").innerHTML = '<h4>Email :-</h4><p>nishit.saraf01@gmail.com</p><i class="mail fas fa-edit"></i>'
	})
})

document.querySelector(".pass").addEventListener("click",function(){
	document.querySelector(".passdata").innerHTML='<h4>Password :-</h4><!-- <p>nishit.saraf01@gmail.com</p><i class="pass fas fa-edit"></i> --><input type="password" class="newpass" style="width:200px"><i class="fas fa-check passcheck" style="padding: 0px 20px;"></i>'
	document.querySelector(".passcheck").addEventListener("click",function(){
		var newpass = document.querySelector(".newpass").value
		var req = new XMLHttpRequest();

		req.onload = function(){
			console.log(this.response);
		}


		req.open("POST", "change_credentials.php");
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send("req=pass&email=" + newpass);
		document.querySelector(".passdata").innerHTML = '<h4>Password :-</h4> <p></p><i class="pass fas fa-edit"></i>'
})
})



setInterval(checker, 100);


function updateImage(){
	var imageContainer = document.querySelector(".image-container");

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
function checker(){
	var url = window.location.toString();

	var regex = new RegExp(/update=true/g);

	if (url.match(regex) != null){
		updateImage()
	}
}