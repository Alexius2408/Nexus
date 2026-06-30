const loginButton = document.getElementById("loginButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const failedLoginText = document.getElementById("loginFailed");
const backBtn = document.getElementById("backButton");

const inputs = document.querySelectorAll("input");
const passwordVisibilityToggle = document.querySelectorAll(
  ".passwordvisibility",
);

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(hashBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

passwordVisibilityToggle.forEach((element) => {
  element.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";

    passwordInput.setAttribute("type", isPassword ? "text" : "password");

    document.getElementById("passwordNotVisible").classList.toggle("hidden");
    document.getElementById("passwordVisible").classList.toggle("hidden");

    passwordInput.placeholder = isPassword
      ? "Password123"
      : "●●●●●●●●●●●●●●●●●";
  });
});

function setLoginButton() {
  failedLoginText.classList.add("hidden");
  let hasEmpty = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      hasEmpty = true;
    }
  });
  loginButton.disabled = hasEmpty;
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    setLoginButton();
  });
});

async function login(event) {
  if (loginButton.disabled) return;
  setLoginButton();
  const tryUsername = localStorage.getItem(usernameInput.value);
  const inputPassword = passwordInput.value;
  const shaPassword = await sha256(inputPassword);
  if (tryUsername) {
    if (tryUsername === shaPassword) {
      let username = usernameInput.value;
      localStorage.setItem("currentUser", username);
      const design_data = JSON.parse(localStorage.getItem(username + "_designs"));
      if (design_data) {
        localStorage.setItem("nexus-accent", design_data.nexus_accent);
        localStorage.setItem("nexus-accent-rgb", design_data.nexus_accent_rgb);
        localStorage.setItem("nexus-bg", design_data.nexus_bg);
        localStorage.setItem("nexus-font", design_data.nexus_font);
        localStorage.setItem("nexus-text", design_data.nexus_text);
        if (design_data.my_custom_colors) {
          localStorage.setItem("my-custom-colors", design_data.my_custom_colors);
        }
      }
      window.location.href = "../home/home.html";
      return;
    } else {
      failedLoginText.classList.remove("hidden");
    }
  } else {
    localStorage.setItem(usernameInput.value, shaPassword);
    localStorage.setItem("currentUser", usernameInput.value);
    window.location.href = "../home/home.html";
    return;
  }
}

loginButton.addEventListener("click", async (event) => {
  await login(event);
});

window.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    await login(event);
  }
});

setLoginButton();

backBtn.addEventListener("click", () => {
  window.location.href = "../main.html";
});
