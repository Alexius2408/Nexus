const inputField = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

async function sendMessage(roomId, author, text) {
  const res = await fetch(
    `http://10.100.120.111:3000/rooms/${roomId}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, text }),
    },
  );

  if (res.status === 404) throw new Error("Room not found");
  if (res.status === 400) throw new Error("Invalid body");
  if (!res.ok) throw new Error(res.statusText || "Request failed");

  return await res.json();
}

async function prepareMessage() {
  const roomId = localStorage.getItem("currentRoom");
  const author = localStorage.getItem("currentUser");
  const text = inputField.value;

  const response = await sendMessage(roomId, author, text);

  let storageKey = author + "_messages";

  let data = JSON.parse(localStorage.getItem(storageKey) || "{}");

  if (!data[roomId]) {
    data[roomId] = [];
  }

  data[roomId].push(response.id);

  localStorage.setItem(storageKey, JSON.stringify(data));
  inputField.value = ""
}

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    prepareMessage()
  }
});

sendBtn.addEventListener("click", await prepareMessage);
