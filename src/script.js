const track = document.getElementById('track');
const dots = document.querySelectorAll('.nav-dot');
const login_btn = document.getElementById("login-btn")

let currentIndex = 0;

function moveToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

dots.forEach(element => {
    element.addEventListener("click", (event) => {
        moveToSlide(element.id.replaceAll("dot", ""))
    })
});

login_btn.addEventListener("click", () => {
    window.location.href = "./login/login.html"
})

setInterval(() => {
    let nextIndex = (currentIndex + 1) % 3;
    moveToSlide(nextIndex);
}, 3000);
