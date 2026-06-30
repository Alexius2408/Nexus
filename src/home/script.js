// Funktion zum Laden und Applizieren der Einstellungen aus der Einstellungsseite
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
 
// Einstellungen direkt ausführen
loadSettings();
 
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