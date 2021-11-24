// IO VS CODE RESIZER

var ioresizer = document.querySelector(".io-resizer");
var iocontainer = document.querySelector(".io-container");
var codecontainer = document.querySelector(".code-area");

ioresizer.addEventListener("mousedown", mousedown);

function mousedown(e){
    var chatboxStatus = document.querySelector(".room-box").style.left;
    if (chatboxStatus === "0%"){
        return;
    }
    var x = e.clientX;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e){
        var iodiv = iocontainer.getBoundingClientRect();
        var codediv = document.querySelector(".code-area").getBoundingClientRect();
        iocontainer.style.width = iodiv.width + (Math.min(1119, Math.max(500, x)) - Math.min(1119, Math.max(e.clientX, 500))) + "px";
        codecontainer.style.width = (codediv.width - ((Math.min(1119, Math.max(500, x)) - Math.min(1119, Math.max(e.clientX, 500))))) + "px";
        x = e.clientX;
    }

    function mouseup(){
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}


// Input vs Output Resizer

var inputresizer = document.querySelector(".input-resizer");
var inputbox = document.querySelector(".input-textarea");
var outputbox = document.querySelector(".output-textarea");
var inputcontainer = document.querySelector(".input-container");

inputresizer.addEventListener("mousedown", mousedown2);

function mousedown2(e){
    var y = e.clientY;
    window.addEventListener("mousemove", mousemove2);
    window.addEventListener("mouseup", mouseup2);

    function mousemove2(e){
        var inputdiv = inputbox.getBoundingClientRect();
        var outputdiv = outputbox.getBoundingClientRect();
        inputbox.style.height = inputdiv.height + (Math.min(505, Math.max(86, y)) - Math.min(505, Math.max(e.clientY, 86))) + "px";
        outputbox.style.height = outputdiv.height - (Math.min(505, Math.max(86, y)) - Math.min(505, Math.max(e.clientY, 86))) + "px";
        inputcontainer.style.top = outputdiv.height + 40 + "px";
        y = e.clientY;
    }

    function mouseup2(){
        window.removeEventListener("mousemove", mousemove2);
        window.removeEventListener("mouseup", mouseup2);
    }
}
