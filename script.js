let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle'; // Startet mit Spieler 'circle'

function init() {
    render();
}

function render() {
    const gameBoard = document.getElementById('game-board');
    // Vermeidet das Leeren des Spielfelds

    fields.forEach((field, index) => {
        let fieldElement = gameBoard.querySelector(`.field[data-index="${index}"]`);

        // Erstellt ein neues Feld, wenn es noch nicht existiert
        if (!fieldElement) {
            fieldElement = document.createElement('div');
            fieldElement.className = 'field';
            fieldElement.setAttribute('data-index', index);
            gameBoard.appendChild(fieldElement);
        }

        // Fügt Event-Listener hinzu, wenn das Feld noch nicht belegt ist
        if (field === null) {
            fieldElement.addEventListener('click', function() { onClick(index); }, { once: true });
        } else {
            // Entfernt den Event-Listener, wenn das Feld belegt ist
            fieldElement.removeEventListener('click', function() { onClick(index); });
        }

        // Aktualisiert den Inhalt des Feldes basierend auf seinem Zustand
        if (field === 'circle') {
            fieldElement.innerHTML = generateCircleSVG();
        } else if (field === 'cross') {
            fieldElement.innerHTML = generateCrossSVG();
        } else {
            // Leert den Inhalt, wenn das Feld nicht belegt ist
            fieldElement.innerHTML = '';
        }
    });
}

function onClick(index) {
    if(fields[index] === null) {
        fields[index] = currentPlayer; // Setzt den aktuellen Spieler in das Feld
        updateField(index); // Aktualisiert nur das spezifische Feld

        if(checkForWin()) {
            console.log(`${currentPlayer} wins!`);
            // Weitere Aktionen bei Gewinn, z.B. Spielfelder deaktivieren
        } else {
            // Wechselt den Spieler nur, wenn kein Gewinn festgestellt wurde
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}

function updateField(index) {
    const fieldElement = document.querySelector(`.field[data-index="${index}"]`);
    if(fields[index] === 'circle') {
        fieldElement.innerHTML = generateCircleSVG();
    } else if(fields[index] === 'cross') {
        fieldElement.innerHTML = generateCrossSVG();
    }
    // Deaktiviert den Klick-Listener für das aktualisierte Feld
    fieldElement.removeEventListener('click', onClick);
}



function updateField(index) {
    const gameBoard = document.getElementById('game-board');
    const fieldElement = gameBoard.querySelector(`.field[data-index="${index}"]`);

    if (fields[index] === 'circle') {
        fieldElement.innerHTML = generateCircleSVG();
    } else if (fields[index] === 'cross') {
        fieldElement.innerHTML = generateCrossSVG();
    }

    // Nach der Aktualisierung wird kein Listener hinzugefügt, da das Feld jetzt belegt ist
}



function generateCircleSVG() {
    const svgHTML = `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="none" stroke="#00B0EF" stroke-width="10" stroke-dasharray="251.2" stroke-dashoffset="251.2">
        <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="0.5s" fill="freeze" />
    </circle>
</svg>
    `;
    return svgHTML;
}



function generateCrossSVG() {
    const svgHTML = `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Erster Schenkel des Kreuzes -->
    <line x1="20" y1="20" x2="20" y2="20" stroke="#FFC000" stroke-width="10" stroke-linecap="round">
        <animate attributeName="x2" from="20" to="80" dur="0.25s" fill="freeze" />
        <animate attributeName="y2" from="20" to="80" dur="0.25s" fill="freeze" />
    </line>
    <!-- Zweiter Schenkel des Kreuzes -->
    <line x1="80" y1="20" x2="80" y2="20" stroke="#FFC000" stroke-width="10" stroke-linecap="round">
        <!-- Beginn nach Abschluss der ersten Animation -->
        <animate attributeName="x2" from="80" to="20" dur="0.25s" fill="freeze" begin="0.25s"/>
        <animate attributeName="y2" from="20" to="80" dur="0.25s" fill="freeze" begin="0.25s"/>
    </line>
</svg>
    `;
    return svgHTML;
}

function checkForWin() {
    // Definiert alle möglichen Gewinnkombinationen
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (let combo of winCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Gewinn gefunden
            markWin(combo); // Markiert den Sieg
            return true; // Beendet die Prüfung, da ein Gewinn festgestellt wurde
        }
    }
    return false; // Kein Gewinn gefunden
}

function markWin(winCombo) {
    // Deaktiviert alle Felder, um weitere Klicks zu verhindern
    document.querySelectorAll('.field').forEach(field => {
        field.removeEventListener('click', onClick);
    });
    
    // Optional: Zeichnet einen Strich durch die gewinnenden Felder
    // Dieser Teil benötigt eine spezifischere Implementierung, basierend auf deinem Layout
    // und wie du visuell den Sieg markieren möchtest.
}

function drawWinningLine(winFields) {
    const svg = document.getElementById('winning-line');
    svg.innerHTML = ''; // Entfernt vorherige Linien

    if (winFields.length) {
        const {offsetWidth: width, offsetHeight: height} = document.querySelector('.field');
        const margin = 3; // Ränder zwischen den Feldern

        // Berechnet Start- und Endpunkte
        const startX = ((winFields[0] % 3) * (width + margin)) + (width / 2);
        const startY = (Math.floor(winFields[0] / 3) * (height + margin)) + (height / 2);
        const endX = ((winFields[2] % 3) * (width + margin)) + (width / 2);
        const endY = (Math.floor(winFields[2] / 3) * (height + margin)) + (height / 2);

        // Zeichnet die Linie
        const line = `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="red" stroke-width="4"/>`;
        svg.innerHTML = line;
    }
}

if (checkForWin()) {
    // Angenommen, checkForWin gibt die Indizes der gewinnenden Felder zurück
    drawWinningLine([0, 1, 2]); // Beispiel
}




