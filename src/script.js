function applyGlobalSettings() {
    const savedBg = localStorage.getItem('nexus-bg');
    const savedText = localStorage.getItem('nexus-text');
    const savedFont = localStorage.getItem('nexus-font');

    if (savedBg) document.documentElement.style.setProperty('--dynamic-bg', savedBg);
    if (savedText) document.documentElement.style.setProperty('--dynamic-text', savedText);
    if (savedFont) document.documentElement.style.setProperty('--dynamic-font', savedFont);
}
window.addEventListener('DOMContentLoaded', applyGlobalSettings);


const track = document.getElementById('track');
const dots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;

function moveToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

setInterval(() => {
    let nextIndex = (currentIndex + 1) % 3;
    moveToSlide(nextIndex);
}, 3000);