function loadSettings() {
    const savedBg = localStorage.getItem('nexus-bg') || '#0B1215';
    const savedText = localStorage.getItem('nexus-text') || '#FAF9F6';
    const savedFont = localStorage.getItem('nexus-font') || "'Segoe UI', Arial, sans-serif";
    const savedAccent = localStorage.getItem('nexus-accent') || '#ff6600';
    const savedAccentRgb = localStorage.getItem('nexus-accent-rgb') || '255, 102, 0';
    document.documentElement.style.setProperty('--bg', savedBg);
    document.documentElement.style.setProperty('--white', savedText);
    document.documentElement.style.setProperty('--dynamic-font', savedFont);
    document.documentElement.style.setProperty('--orange', savedAccent);
    document.documentElement.style.setProperty('--orange-rgb', savedAccentRgb);
}
 
loadSettings();
 
const user_logo = document.getElementById("user-logo")
const username = localStorage.getItem("currentUser")
const textarea = document.getElementById("messageInput");
const delAcountBtn = document.getElementById("delAcountBtn")
const logoutBtn = document.getElementById("logoutBtn")
 
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


user_logo.addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("show");
});

window.addEventListener("click", (event) => {
  if (!event.target.closest('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (const dropdown of dropdowns) {
      dropdown.classList.remove('show');
    }
  }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentRoom")
    localStorage.removeItem("currentUser")
})

delAcountBtn.addEventListener("click", () => {
    localStorage.removeItem(localStorage.getItem("currentUser"))
    localStorage.removeItem(localStorage.getItem("currentUser") + "_messages")
    localStorage.removeItem("currentRoom")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("nexus-accent");
    localStorage.removeItem("nexus-accent-rgb");
    localStorage.removeItem("nexus-bg");
    localStorage.removeItem("nexus-font");
    localStorage.removeItem("nexus-text");
    location.reload();
})