const resetBtn = document.getElementById('reset-btn');
const custom_color_btn = document.getElementById('add-custom-color-btn');

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

function setupCustomSelect(selectId, selectedId, itemsId, storageKey, cssVar, isAccent = false, onChangeCallback = null) {
    const selectedEl = document.getElementById(selectedId);
    const itemsEl = document.getElementById(itemsId);
    
    if (!selectedEl || !itemsEl) return;

    selectedEl.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.select-items').forEach(el => {
            if (el !== itemsEl) el.classList.add('select-hide');
        });
        itemsEl.classList.toggle('select-hide');
    });

    itemsEl.addEventListener('click', function(e) {
        const item = e.target.closest('div[data-value]');
        if (!item) return;
        
        const value = item.getAttribute('data-value');
        
        selectedEl.innerHTML = item.innerHTML;
        selectedEl.setAttribute('data-value', value);
        itemsEl.classList.add('select-hide');
        
        if (storageKey && cssVar) {
            saveSetting(storageKey, value, cssVar, isAccent);
        }
        
        if (onChangeCallback) {
            onChangeCallback(value);
        }
    });
}

function updateCustomSelectDisplay(selectedId, itemsId, value) {
    const selectedEl = document.getElementById(selectedId);
    const itemsEl = document.getElementById(itemsId);
    const item = itemsEl.querySelector(`div[data-value="${value}"]`);
    if (item) {
        selectedEl.innerHTML = item.innerHTML;
        selectedEl.setAttribute('data-value', value);
    }
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

    loadCustomColors();

    updateCustomSelectDisplay('select-selected-bg', 'select-items-bg', savedBg);
    updateCustomSelectDisplay('select-selected-text', 'select-items-text', savedText);
    updateCustomSelectDisplay('select-selected-accent', 'select-items-accent', savedAccent);
    updateCustomSelectDisplay('select-selected-font', 'select-items-font', savedFont);
    updateCustomSelectDisplay('select-selected-target', 'select-items-target', 'bg');

    document.getElementById('select-selected-font').style.fontFamily = savedFont;
}

function loadCustomColors() {
    const customColors = JSON.parse(localStorage.getItem('my-custom-colors') || '[]');
    customColors.forEach(color => {
        const itemsEl = document.getElementById(`select-items-${color.target}`);
        if (itemsEl) {
            const div = document.createElement('div');
            div.setAttribute('data-value', color.hex);
            div.innerHTML = `<span class="color-dot" style="background-color: ${color.hex};"></span>${color.name}`;
            itemsEl.appendChild(div);
        }
    });
}

window.addCustomColor = function() {
    const name = document.getElementById('custom-name').value;
    const hex = document.getElementById('custom-hex').value;
    const targetEl = document.getElementById('select-selected-target');
    const target = targetEl ? targetEl.getAttribute('data-value') : 'bg';

    if (name && hex) {
        const itemsEl = document.getElementById(`select-items-${target}`);
        if (itemsEl) {
            const div = document.createElement('div');
            div.setAttribute('data-value', hex);
            div.innerHTML = `<span class="color-dot" style="background-color: ${hex};"></span>${name}`;
            itemsEl.appendChild(div);
        }

        let colors = JSON.parse(localStorage.getItem('my-custom-colors') || '[]');
        colors.push({ name, hex, target });
        localStorage.setItem('my-custom-colors', JSON.stringify(colors));

        document.getElementById('custom-name').value = '';
        document.getElementById('custom-hex').value = '';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    setupCustomSelect('custom-bg-select', 'select-selected-bg', 'select-items-bg', 'nexus-bg', '--dynamic-bg');
    setupCustomSelect('custom-text-select', 'select-selected-text', 'select-items-text', 'nexus-text', '--dynamic-text');
    setupCustomSelect('custom-accent-select', 'select-selected-accent', 'select-items-accent', 'nexus-accent', '--orange', true);
    setupCustomSelect('custom-font-select', 'select-selected-font', 'select-items-font', 'nexus-font', '--dynamic-font', false, (val) => {
        document.getElementById('select-selected-font').style.fontFamily = val;
    });
    setupCustomSelect('custom-target-select', 'select-selected-target', 'select-items-target', null, null);

    document.addEventListener('click', () => {
        document.querySelectorAll('.select-items').forEach(el => el.classList.add('select-hide'));
    });
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem("nexus-accent");
    localStorage.removeItem("nexus-accent-rgb");
    localStorage.removeItem("nexus-bg");
    localStorage.removeItem("nexus-font");
    localStorage.removeItem("nexus-text");
    location.reload();
});

if (custom_color_btn) {
    custom_color_btn.addEventListener("click", () => {
        addCustomColor();
    });
}