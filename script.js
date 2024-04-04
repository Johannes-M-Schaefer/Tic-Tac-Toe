let fields = [null, 'circle', 'cross', null, null, null, null, null, null];

function init() {
    render();
} 

function render() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Leert das Spielfeld vor dem Neuaufbau

    fields.forEach((field, index) => {
        const fieldElement = document.createElement('div');
        fieldElement.className = 'field';
        fieldElement.setAttribute('data-index', index);
        if(field === 'circle') {
            fieldElement.innerHTML = generateCircleSVG();
        } else if(field === 'cross') {
            fieldElement.innerHTML = generateCrossSVG();
        }
        gameBoard.appendChild(fieldElement);
    });
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
        <animate attributeName="x2" from="80" to="20" dur="0.25s" fill="freeze" begin="0.25s"/>
        <animate attributeName="y2" from="20" to="80" dur="0.25s" fill="freeze" begin="0.25s"/>
    </line>
</svg>
    `;
    return svgHTML;
}





