import { createRoomProfile } from "./create_chat_profiles.js";

const popupWindow = document.getElementById("popUp");
const roomNameInput = document.getElementById("roomNameInput");
const addNewChatBtn = document.getElementById("plus-sign");
const closeNewChatPopup = document.getElementById("closeCreateChat");
const createRoomBtn = document.getElementById("createRoomBtn");

function openPopup() {
  popupWindow.style.display = "block";
}

function closePopup() {
  popupWindow.style.display = "none";
}

async function submitRoom() {
  const value = roomNameInput.value.trim();
  if (!value) {
    alert("Bitte einen Raumnamen eingeben.");
    return;
  }

  const data = await createRoom(value);
  if (data) {
    createRoomProfile(data);
    closePopup();
    roomNameInput.value = "";
  }
}

addNewChatBtn.addEventListener("click", openPopup)

closeNewChatPopup.addEventListener("click", closePopup)

createRoomBtn.addEventListener("click", submitRoom)

async function createRoom(roomName) {
  try {
    const response = await fetch("http://10.100.120.111:3000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: roomName
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Fehler: ${data.error ?? "Unbekannter Fehler"}`);
      return false;
    }

    return data;
  } catch (err) {
    alert("Netzwerkfehler: Server nicht erreichbar.");
    console.error(err);
    return undefined;
  }
}

