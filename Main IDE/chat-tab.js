var chat_btn = document.querySelector(".chat-btn");
chat_btn.addEventListener("click", function(){
    var chatbox = document.querySelector(".room-box");
    var editor = document.querySelector(".code-area");

    var left = chatbox.style.left;
    left = parseFloat(left.substring(0, left.length - 1));
    if (left == -27)
        document.querySelector(".chat-btn").innerHTML = '<i class="fas fa-users"></i>';
    else
        document.querySelector(".chat-btn").innerHTML = '<i class="fas fa-users"></i>';
    left *= 100;
    var delta = 0;
    var interval = setInterval(getChatbox, 1);
    if (left != 0){
        document.querySelector(".io-container").style.width = "17%";
        document.querySelector(".code-area").style.width = "83%";
    }
    function getChatbox(){
        // hide
        if (left == 0){
            if (chatbox.style.left === "-27%")
                clearInterval(interval);
            else{
                delta += 108;
                chatbox.style.left = (left - delta)/100+ "%";
                editor.style.left = ((left - delta)/100) + 27 + "%";
                editor.style.width = 56 - ((left - delta)/100) + "%";
            }
        }
        // reveal
        else{

            if (chatbox.style.left === "0%")
                clearInterval(interval);
            else{
                delta += 108;
                chatbox.style.left = (left + delta)/100 + "%";
                editor.style.left = ((left + delta)/100) + 27 + "%";
                editor.style.width = 56 - ((left + delta)/100)  + "%";
            }
        }
    }

})