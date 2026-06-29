const welcome_text = document.getElementById("welcome-text");
const input_box = document.getElementById("messageDiv");
const logo_text = document.querySelector(".logo");

async function getRoomMessages(roomId) {
  if (!roomId) throw new Error("roomId required");

  const res = await fetch(
    `http://10.100.120.111:3000/rooms/${roomId}/messages`,
  );

  if (!res.ok) throw new Error(res.statusText || "Request failed");

  return await res.json();
}


function createMyMessages(message) {

}

function createOtherMessages(message) {

}


function addMessage_to_chat(data, my_messages) {
  if (my_messages) {
    if (my_messages.includes(data.id)) {
      createMyMessages(data)
    } else {
      createOtherMessages(data);
    }
  } else {
    createOtherMessages(data);
  }
}

logo_text.addEventListener("click", () => {
  welcome_text.classList.remove("hidden");
  input_box.classList.add("hidden");
});

const chatRoomsContainer = document.getElementById("chat-rooms");

chatRoomsContainer.addEventListener("click", async (e) => {
  const room = e.target.closest(".room");
  if (!room) return;
  let messages = await getRoomMessages(room.id);
  localStorage.setItem("currentRoom", room.id);
  welcome_text.classList.add("hidden");
  const author = localStorage.getItem("currentUser");
  let storageKey = author + "_messages";

  let my_messages = JSON.parse(localStorage.getItem(storageKey) || "{}");

  if (my_messages !== {}) {
    my_messages = my_messages[room.id];
  }

  messages.forEach((message) => {
    addMessage_to_chat(message, my_messages);
  });
});
