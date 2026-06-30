const user_logo = document.getElementById("user-logo")
const username = localStorage.getItem("currentUser")
const textarea = document.getElementById("messageInput");

function createUserProfie() {
    const p = document.createElement("p")
    p.textContent = username.charAt(0).toUpperCase();
    p.id = "username-logo-text";

    user_logo.title = username;

    user_logo.appendChild(p)
}

function autoResizeTextbox() {
    textarea.style.height = "auto";

    if (textarea.scrollHeight <= 125) {
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.style.overflowY = "hidden";
    } else {
        console.log("fixed")
        textarea.style.height = "125px";
        textarea.style.overflowY = "auto";
    }
}

textarea.addEventListener("input", autoResizeTextbox);

autoResizeTextbox();

createUserProfie()
