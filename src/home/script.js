function loadSettings() {
  const savedBg = localStorage.getItem("nexus-bg") || "#0B1215";
  const savedText = localStorage.getItem("nexus-text") || "#FAF9F6";
  const savedFont =
    localStorage.getItem("nexus-font") || "'Segoe UI', Arial, sans-serif";
  const savedAccent = localStorage.getItem("nexus-accent") || "#ff6600";
  const savedAccentRgb =
    localStorage.getItem("nexus-accent-rgb") || "255, 102, 0";
  document.documentElement.style.setProperty("--bg", savedBg);
  document.documentElement.style.setProperty("--white", savedText);
  document.documentElement.style.setProperty("--dynamic-font", savedFont);
  document.documentElement.style.setProperty("--orange", savedAccent);
  document.documentElement.style.setProperty("--orange-rgb", savedAccentRgb);
}

loadSettings();

const user_logo = document.getElementById("user-logo");
const username = localStorage.getItem("currentUser");
const textarea = document.getElementById("messageInput");
const delAcountBtn = document.getElementById("delAcountBtn");
const logoutBtn = document.getElementById("logoutBtn");

function createUserProfie() {
  const p = document.createElement("p");
  p.textContent = username.charAt(0).toUpperCase();
  p.id = "username-logo-text";
  user_logo.title = username;
  user_logo.appendChild(p);
}
function autoResizeTextbox() {
  textarea.style.height = "auto";
  if (textarea.scrollHeight <= 125) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  } else {
    console.log("fixed");
    textarea.style.height = "125px";
    textarea.style.overflowY = "auto";
  }
}
textarea.addEventListener("input", autoResizeTextbox);
autoResizeTextbox();
createUserProfie();

user_logo.addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("show");
});

window.addEventListener("click", (event) => {
  if (!event.target.closest(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (const dropdown of dropdowns) {
      dropdown.classList.remove("show");
    }
  }
});

logoutBtn.addEventListener("click", () => {
  console.log("Test");
  let currentUser = localStorage.getItem("currentUser");
  let nexus_accent = localStorage.getItem("nexus-accent");
  let nexus_accent_rgb = localStorage.getItem("nexus-accent-rgb");
  let nexus_bg = localStorage.getItem("nexus-bg");
  let nexus_font = localStorage.getItem("nexus-font");
  let nexus_text = localStorage.getItem("nexus-text");
  let my_custom_colors = localStorage.getItem("my-custom-colors");
  console.log("currentUser:", currentUser, typeof currentUser);
  const data = {
    nexus_accent,
    nexus_accent_rgb,
    nexus_bg,
    nexus_font,
    nexus_text,
    my_custom_colors,
  };

  localStorage.setItem(currentUser + "_designs", JSON.stringify(data));

  localStorage.removeItem("currentUser");
  localStorage.removeItem("nexus-accent");
  localStorage.removeItem("nexus-accent-rgb");
  localStorage.removeItem("nexus-bg");
  localStorage.removeItem("nexus-font");
  localStorage.removeItem("nexus-text");
  localStorage.removeItem("my-custom-colors");
  localStorage.removeItem("currentRoom");
  localStorage.removeItem("currentUser");
});

delAcountBtn.addEventListener("click", () => {
  localStorage.removeItem(localStorage.getItem("currentUser"));
  localStorage.removeItem(localStorage.getItem("currentUser") + "_messages");
  localStorage.removeItem(localStorage.getItem("currentUser") + "_designs");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("nexus-accent");
  localStorage.removeItem("nexus-accent-rgb");
  localStorage.removeItem("nexus-bg");
  localStorage.removeItem("nexus-font");
  localStorage.removeItem("nexus-text");
  localStorage.removeItem("my-custom-colors");
  localStorage.removeItem("currentRoom");
  localStorage.removeItem("currentUser");
});
