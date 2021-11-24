// password eye toggle.

function togglePasswordHide(){
    var password_field = document.querySelector(".password");
    var password_state = password_field.getAttribute("type");
    if (password_state === "text"){
        password_field.setAttribute("type", "password");
        document.querySelector(".fa-eye-slash").setAttribute("class", "far fa-eye");
    }
    else{
        password_field.setAttribute("type", "text");
        document.querySelector(".fa-eye").setAttribute("class", "far fa-eye-slash");
    }
}

document.querySelector(".fa-eye").addEventListener("click", togglePasswordHide);

// forgot password response.

function forgotPassResponse(){
    alert("Password has been sent to your email.")
}

document.querySelector(".link-forgotpass").addEventListener("click", forgotPassResponse);


// invalid user procedure.
function clearWarning(){
    setTimeout(function wait(){}, 2000);
    document.querySelector(".tooltip").innerHTML = "";
}
document.querySelector(".username").addEventListener("input", clearWarning);



// buttons responses
var x = document.querySelector(".guest-btn");
console.log(x);

document.querySelector(".guest-btn").addEventListener("click", function(){
    window.location = "../Main IDE/ide-page.php";
})

document.querySelector(".create-newacc-btn").addEventListener("click", function(){
    window.location = "../Create New Account/signup.php";
})

document.querySelector(".login-btn").addEventListener("click", function(){
    var email = document.querySelector(".username").value;
    var pass = document.querySelector(".password").value;
    var req = new XMLHttpRequest();
    req.open("POST", "../login-backend/verify-user.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("email=" + email + "&pass=" + pass);
    req.send("email=" + email + "&pass=" + pass);

    req.onload = function(){
        if (this.response === 'yes'){
            window.location = "../File Manager/file-manager-main.php";
        }
        else{
            document.querySelector(".tooltip").innerHTML = "<i class=\"fas fa-exclamation-triangle\"></i> <span class=\"tooltiptext\">Invalid Username/Password!</span>";
        }
    }
})


// leaving any room the user is part of.

const delreq = new XMLHttpRequest();
delreq.open("POST", "../Main IDE/Room System/leave_room.php");
delreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
delreq.send("req=delete");

delreq.onload = function(){
    console.log(this.response);
}