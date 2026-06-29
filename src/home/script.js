const user_logo = document.getElementById("user-logo")
const username = localStorage.getItem("currentUser")

function createUserProfie() {
    const p = document.createElement("p")
    p.textContent = username.charAt(0).toUpperCase();
    p.id = "username-logo-text";

    user_logo.title = username;

    user_logo.appendChild(p)
}

createUserProfie()