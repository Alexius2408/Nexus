const welcome_text = document.getElementById("welcome-text");
const input_box = document.getElementById("messageDiv");
const logo_text = document.querySelector(".logo");
const chat_name = document.getElementById("chat-name");
const chat_messages_div = document.getElementById("chat_messages");
const chatRoomsContainer = document.getElementById("chat-rooms");
const messagesBox = document.getElementById("messages-area")

let pollController = null;

async function getRoomMessages(roomId) {
  const res = await fetch(`http://10.100.120.111:3000/rooms/${roomId}/messages`);
  if (!res.ok) throw new Error("Request failed");
  return await res.json();
}

function createMyMessages(message) {
  const chat_message = document.createElement("div");
  chat_message.classList.add("chat_message");
  chat_message.style.borderRadius = "15px 0 15px 15px";
  chat_message.style.alignSelf = "flex-end";

  const my_div = document.createElement("div");
  my_div.classList.add("other");
  my_div.id = message.id;

  const header_message = document.createElement("div");
  header_message.classList.add("header_message");

  const author_name = document.createElement("h3");
  author_name.classList.add("author");
  author_name.textContent = message.author;

  const created_at = document.createElement("p");
  created_at.classList.add("created_at");
  created_at.textContent = new Date(message.createdAt).toLocaleTimeString();

  const text_message = document.createElement("p");
  text_message.classList.add("text_message");
  text_message.textContent = message.text;

  header_message.appendChild(author_name);
  header_message.appendChild(created_at);

  my_div.appendChild(header_message);
  my_div.appendChild(text_message);
  chat_message.appendChild(my_div);
  chat_messages_div.appendChild(chat_message);
}

function createOtherMessages(message) {
  const chat_message = document.createElement("div");
  chat_message.classList.add("chat_message");
  chat_message.style.borderRadius = "0 15px 15px 15px";

  const other_div = document.createElement("div");
  other_div.classList.add("other");
  other_div.id = message.id;

  const header_message = document.createElement("div");
  header_message.classList.add("header_message");

  const author_name = document.createElement("h3");
  author_name.classList.add("author");
  author_name.textContent = message.author;

  const created_at = document.createElement("p");
  created_at.classList.add("created_at");
  created_at.textContent = new Date(message.createdAt).toLocaleTimeString();

  const text_message = document.createElement("p");
  text_message.classList.add("text_message");
  text_message.textContent = message.text;

  header_message.appendChild(author_name);
  header_message.appendChild(created_at);

  other_div.appendChild(header_message);
  other_div.appendChild(text_message);
  chat_message.appendChild(other_div);
  chat_messages_div.appendChild(chat_message);
}

function scrollToBottom() {
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function addMessage_to_chat(message) {
  if (!message) return;

  const currentUser = localStorage.getItem("currentUser");
  const isMine = message.author === currentUser;

  if (isMine) {
    createMyMessages(message);
  } else {
    createOtherMessages(message);
  }
  scrollToBottom();
}

function stopLongPoll() {
  if (pollController) pollController.abort();
}

async function startLongPoll(roomId, lastId) {
  stopLongPoll();
  pollController = new AbortController();

  try {
    const res = await fetch(
      `http://10.100.120.111:3000/rooms/${roomId}/messages?since=${lastId}`,
      { signal: pollController.signal }
    );

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();

    let newLastId = lastId;

    if (Array.isArray(data)) {
      data.forEach((msg) => {
        addMessage_to_chat(msg);
        newLastId = String(msg.id);
      });
    } else if (data) {
      addMessage_to_chat(data);
      newLastId = String(data.id);
    }

    setTimeout(() => {
      startLongPoll(roomId, newLastId);
    }, 300);

  } catch (e) {
    if (e.name !== "AbortError") {
      setTimeout(() => startLongPoll(roomId, lastId), 1000);
    }
  }
}

logo_text.addEventListener("click", () => {
  welcome_text.classList.remove("hidden");
  input_box.classList.add("hidden");
  chat_messages_div.innerHTML = "";
  chat_name.textContent = "";
  stopLongPoll();
});

chatRoomsContainer.addEventListener("click", async (e) => {
  stopLongPoll();

  const room = e.target.closest(".room");
  if (!room) return;

  const messages = await getRoomMessages(room.id);

  localStorage.setItem("currentRoom", room.id);

  welcome_text.classList.add("hidden");

  chat_messages_div.innerHTML = "";

  let last_message_id = "0";

  messages.forEach((message) => {
    addMessage_to_chat(message);
    last_message_id = String(message.id);
  });

  startLongPoll(room.id, last_message_id);
});
