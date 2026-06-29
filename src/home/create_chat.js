const welcome_text = document.getElementById("welcome-text");
const logo_text = document.querySelector(".logo");

async function getRoomMessages(roomId) {
  if (!roomId) throw new Error("roomId required");

  const res = await fetch(
    `http://10.100.120.111:3000/rooms/${roomId}/messages`,
  );

  if (!res.ok) throw new Error(res.statusText || "Request failed");

  return await res.json();
}

function addMessage_to_chat(data) {
  console.log(data)
}

logo_text.addEventListener("click", () => {
    welcome_text.classList.remove("hidden");
});


const chatRoomsContainer = document.getElementById("chat-rooms");

chatRoomsContainer.addEventListener("click", async (e) => {
  const room = e.target.closest(".room");
  if (!room) return;
  let messages = await getRoomMessages(room.id);
  welcome_text.classList.add("hidden");
  messages.forEach((message) => {
    addMessage_to_chat(message);
  });
});
