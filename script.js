let fields = [null, null, null, null, null, null, null, null, null];

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
            fieldElement.textContent = 'O';
        } else if(field === 'cross') {
            fieldElement.textContent = 'X';
        }
        gameBoard.appendChild(fieldElement);
    });
}