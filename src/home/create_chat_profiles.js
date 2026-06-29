const rooms = document.getElementById("chat-rooms");
const chat_name = document.getElementById("chat-name");
const welcome_text = document.getElementById("welcome-text");
const input_box = document.getElementById("messageDiv")

async function getData(arg) {
  try {
    const res = await fetch(`http://10.100.120.111:3000${arg}`);

    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

let rooms_data = await getData("/rooms");

async function sortRooms(rooms_data) {
  if (!rooms_data) return;
  rooms_data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  return rooms_data;
}

function colorFromIndex(index) {
  if (typeof index === "string") {
    let num = 0;
    for (let i = 0; i < index.length; i++) {
      num += index.charCodeAt(i);
    }
    index = num;
  }
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 80%, 30%)`;
}

rooms_data.forEach((element) => {
  createRoomProfile(element)
});


export function createRoomProfile(element) {
  const maindiv = document.createElement("div");
  maindiv.id = element.id;
  maindiv.classList.add("room");

  const nameLetter = document.createElement("div");
  nameLetter.classList.add("nameLetter");

  const firstLetterDiv = document.createElement("div");
  firstLetterDiv.classList.add("firstLetterDiv");

  const firstLetter = document.createElement("p");
  firstLetter.classList.add("firstLetter");
  firstLetter.textContent = element.name.charAt(0).toUpperCase();

  firstLetterDiv.appendChild(firstLetter);

  const fullRoomName = document.createElement("p");
  fullRoomName.classList.add("fullRoomName");
  fullRoomName.textContent = element.name;

  firstLetterDiv.appendChild(fullRoomName);

  nameLetter.appendChild(firstLetterDiv);

  maindiv.appendChild(nameLetter);

  rooms.appendChild(maindiv);

  const color = colorFromIndex(element.id);

  firstLetter.style.backgroundColor = color;

  nameLetter.addEventListener("click", () => {
    chat_name.textContent = element.name;
    chat_name.style.textDecorationColor = color;

    welcome_text.classList.add("hidden");
    input_box.classList.remove("hidden");
  });
}