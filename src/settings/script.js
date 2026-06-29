const bgSelect = document.getElementById('bg-color');
const textSelect = document.getElementById('text-color');
const fontSelect = document.getElementById('font-family');
const accentSelect = document.getElementById('accent-color');
const resetBtn = document.getElementById('reset-btn');

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

function loadSettings() {
    const savedBg = localStorage.getItem('nexus-bg') || '#0B1215';
    const savedText = localStorage.getItem('nexus-text') || '#FAF9F6';
    const savedFont = localStorage.getItem('nexus-font') || "'Segoe UI', Arial, sans-serif";
    const savedAccent = localStorage.getItem('nexus-accent') || '#ff6600';
    const savedAccentRgb = localStorage.getItem('nexus-accent-rgb') || '255, 102, 0';

    document.documentElement.style.setProperty('--dynamic-bg', savedBg);
    document.documentElement.style.setProperty('--dynamic-text', savedText);
    document.documentElement.style.setProperty('--dynamic-font', savedFont);
    document.documentElement.style.setProperty('--orange', savedAccent);
    document.documentElement.style.setProperty('--orange-rgb', savedAccentRgb);

    bgSelect.value = savedBg;
    textSelect.value = savedText;
    fontSelect.value = savedFont;
    accentSelect.value = savedAccent;

    loadCustomColors();
}

function loadCustomColors() {
    const customColors = JSON.parse(localStorage.getItem('my-custom-colors') || '[]');
    customColors.forEach(color => {
        const option = document.createElement('option');
        option.value = color.hex;
        option.textContent = color.name;
        
        if (color.target === 'bg') bgSelect.appendChild(option.cloneNode(true));
        else if (color.target === 'text') textSelect.appendChild(option.cloneNode(true));
        else accentSelect.appendChild(option.cloneNode(true));
    });
}

function saveSetting(key, value, cssVariable, isAccent = false) {
    localStorage.setItem(key, value);
    document.documentElement.style.setProperty(cssVariable, value);
    if (isAccent) {
        const rgb = hexToRgb(value);
        localStorage.setItem('nexus-accent-rgb', rgb);
        document.documentElement.style.setProperty('--orange-rgb', rgb);
    }
}

// Logik für den Hinzufügen-Button (aus der settings.html getriggert)
window.addCustomColor = function() {
    const name = document.getElementById('custom-name').value;
    const hex = document.getElementById('custom-hex').value;
    const target = document.getElementById('target-dropdown').value;

    if (name && hex) {
        const targetSelect = (target === 'bg') ? bgSelect : (target === 'text') ? textSelect : accentSelect;
        
        const newOption = document.createElement('option');
        newOption.value = hex;
        newOption.textContent = name;
        targetSelect.appendChild(newOption);

        let colors = JSON.parse(localStorage.getItem('my-custom-colors') || '[]');
        colors.push({ name, hex, target });
        localStorage.setItem('my-custom-colors', JSON.stringify(colors));

        document.getElementById('custom-name').value = '';
        document.getElementById('custom-hex').value = '';
    }
};

bgSelect.addEventListener('change', (e) => saveSetting('nexus-bg', e.target.value, '--dynamic-bg'));
textSelect.addEventListener('change', (e) => saveSetting('nexus-text', e.target.value, '--dynamic-text'));
fontSelect.addEventListener('change', (e) => saveSetting('nexus-font', e.target.value, '--dynamic-font'));
accentSelect.addEventListener('change', (e) => saveSetting('nexus-accent', e.target.value, '--orange', true));

resetBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

window.addEventListener('DOMContentLoaded', loadSettings);