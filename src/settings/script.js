const bgSelect = document.getElementById('bg-color');
const textSelect = document.getElementById('text-color');
const fontSelect = document.getElementById('font-family');
const resetBtn = document.getElementById('reset-btn');

// 1. Einstellungen aus dem Speicher laden und anwenden
function loadSettings() {
    const savedBg = localStorage.getItem('nexus-bg') || '#0B1215';
    const savedText = localStorage.getItem('nexus-text') || '#FAF9F6';
    const savedFont = localStorage.getItem('nexus-font') || "'Segoe UI', Arial, sans-serif";

    // CSS Variablen im Dokument überschreiben
    document.documentElement.style.setProperty('--dynamic-bg', savedBg);
    document.documentElement.style.setProperty('--dynamic-text', savedText);
    document.documentElement.style.setProperty('--dynamic-font', savedFont);

    // Dropdowns auf den gespeicherten Wert setzen
    bgSelect.value = savedBg;
    textSelect.value = savedText;
    fontSelect.value = savedFont;
}

// 2. Einzelne Einstellung speichern
function saveSetting(key, value, cssVariable) {
    localStorage.setItem(key, value);
    document.documentElement.style.setProperty(cssVariable, value);
}

// Event Listener für Änderungen an den Dropdowns
bgSelect.addEventListener('change', (e) => {
    saveSetting('nexus-bg', e.target.value, '--dynamic-bg');
});

textSelect.addEventListener('change', (e) => {
    saveSetting('nexus-text', e.target.value, '--dynamic-text');
});

fontSelect.addEventListener('change', (e) => {
    saveSetting('nexus-font', e.target.value, '--dynamic-font');
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('nexus-bg');
    localStorage.removeItem('nexus-text');
    localStorage.removeItem('nexus-font');
    loadSettings(); // Lädt die Standardwerte neu
});

// Beim Laden der Seite Einstellungen direkt ausführen
window.addEventListener('DOMContentLoaded', loadSettings);