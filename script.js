let history = [];

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value); // Use with caution
        const operation = display.value + ' = ' + result;
        display.value = result;
        addToHistory(operation);
    } catch (error) {
        console.error(error); 
        display.value = 'Error';
    }
}

function addToHistory(operation) {
    history.push(operation);
}

function clearHistory() {
    history = []; 
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; 
    const emptyHistoryMessage = document.getElementById('emptyHistoryMessage');
    emptyHistoryMessage.style.display = 'block'; 
}

function toggleHistory() {
    const modal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');
    const emptyHistoryMessage = document.getElementById('emptyHistoryMessage');
    
    historyList.innerHTML = ''; 
    emptyHistoryMessage.style.display = 'none'; 

    if (history.length === 0) {
        emptyHistoryMessage.style.display = 'block'; 
    } else {
        history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            historyList.appendChild(listItem);
        });
    }

    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function toggleInfo() {
    const modal = document.getElementById('infoModal');
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    const historyModal = document.getElementById('historyModal');
    const infoModal = document.getElementById('infoModal');
    if (event.target === historyModal) {
        historyModal.style.display = "none";
    }
    if (event.target === infoModal) {
        infoModal.style.display = "none";
    }
}

document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event) {
    const key = event.key;
    const display = document.getElementById('display');

    if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape' || key === 'c') {
        clearDisplay();
    }
}