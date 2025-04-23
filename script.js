// Crossword Game Logic
document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const state = {
        grid: Array(5).fill().map(() => Array(5).fill({
            letter: '',
            isBlack: false,
            number: null,
            acrossClueId: null,
            downClueId: null
        })),
        clues: {
            across: [],
            down: []
        },
        nextClueId: 1,
        selectedCell: null,
        direction: 'across' // 'across' or 'down'
    };

    // Initialize the grid
    initializeGrid();
    
    // Add event listeners
    document.getElementById('add-clue-form').addEventListener('submit', handleAddClue);
    document.getElementById('reset-board').addEventListener('click', resetBoard);
    document.getElementById('check-answers').addEventListener('click', checkAnswers);

    // Initialize the grid with cells
    function initializeGrid() {
        const gridElement = document.getElementById('crossword-grid');
        gridElement.innerHTML = '';
        
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.addEventListener('input', handleCellInput);
                input.addEventListener('focus', handleCellFocus);
                input.addEventListener('keydown', handleKeydown);
                
                cell.appendChild(input);
                gridElement.appendChild(cell);
            }
        }
    }

    // Handle adding a new clue
    function handleAddClue(event) {
        event.preventDefault();
        
        // Get form values
        const direction = document.getElementById('clue-direction').value;
        const row = parseInt(document.getElementById('clue-row').value) - 1; // Convert to 0-based
        const col = parseInt(document.getElementById('clue-col').value) - 1; // Convert to 0-based
        const clueText = document.getElementById('clue-text').value;
        const answer = document.getElementById('clue-answer').value.toUpperCase();
        
        // Validate inputs
        if (row < 0 || row >= 5 || col < 0 || col >= 5) {
            alert('Starting position must be within the 5x5 grid.');
            return;
        }
        
        if (answer.length < 2) {
            alert('Answer must be at least 2 letters long.');
            return;
        }
        
        // Check if answer fits in the grid
        if (direction === 'across' && col + answer.length > 5) {
            alert('Answer is too long to fit across from this position.');
            return;
        }
        
        if (direction === 'down' && row + answer.length > 5) {
            alert('Answer is too long to fit down from this position.');
            return;
        }
        
        // Check for conflicts with existing cells
        if (!checkForConflicts(row, col, direction, answer)) {
            alert('This answer conflicts with existing words on the board.');
            return;
        }
        
        // Add the clue
        const clueId = state.nextClueId++;
        const newClue = {
            id: clueId,
            number: getNextClueNumber(),
            text: clueText,
            answer: answer,
            row: row,
            col: col
        };
        
        state.clues[direction].push(newClue);
        
        // Update the grid cells
        placeWordOnGrid(row, col, direction, answer, clueId);
        
        // Update clue displays
        updateClueDisplay();
        
        // Reset the form
        document.getElementById('add-clue-form').reset();
    }

    // Check if a new word conflicts with existing cells
    function checkForConflicts(startRow, startCol, direction, word) {
        for (let i = 0; i < word.length; i++) {
            let row = startRow;
            let col = startCol;
            
            if (direction === 'across') {
                col += i;
            } else {
                row += i;
            }
            
            const cell = state.grid[row][col];
            
            // If cell is not empty and has a different letter, there's a conflict
            if (cell.letter !== '' && cell.letter !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Place a word on the grid
    function placeWordOnGrid(startRow, startCol, direction, word, clueId) {
        for (let i = 0; i < word.length; i++) {
            let row = startRow;
            let col = startCol;
            
            if (direction === 'across') {
                col += i;
            } else {
                row += i;
            }
            
            // Update the cell in the grid
            state.grid[row][col] = {
                ...state.grid[row][col],
                letter: word[i],
                [direction === 'across' ? 'acrossClueId' : 'downClueId']: clueId
            };
            
            // Update the cell number if it's the start of a word
            if (i === 0) {
                state.grid[row][col].number = getClueByIdFromDirection(clueId, direction).number;
            }
            
            // Update the visual cell
            updateCellUI(row, col);
        }
    }

    // Get the next available clue number
    function getNextClueNumber() {
        // Find all cells with numbers
        const numberedCells = [];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (state.grid[row][col].number !== null) {
                    numberedCells.push(state.grid[row][col].number);
                }
            }
        }
        
        // If no numbers yet, start with 1
        if (numberedCells.length === 0) {
            return 1;
        }
        
        return Math.max(...numberedCells) + 1;
    }

    // Get a clue by its ID from a specific direction
    function getClueByIdFromDirection(id, direction) {
        return state.clues[direction].find(clue => clue.id === id);
    }

    // Update the UI display of a cell
    function updateCellUI(row, col) {
        const cellData = state.grid[row][col];
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        
        // Remove existing number if any
        const existingNumber = cellElement.querySelector('.cell-number');
        if (existingNumber) {
            existingNumber.remove();
        }
        
        // Add cell number if needed
        if (cellData.number !== null) {
            const numberElement = document.createElement('div');
            numberElement.className = 'cell-number';
            numberElement.textContent = cellData.number;
            cellElement.appendChild(numberElement);
        }
        
        // Update input value
        const input = cellElement.querySelector('input');
        input.value = cellData.letter;
        
        // Update cell appearance
        if (cellData.isBlack) {
            cellElement.classList.add('black');
            input.disabled = true;
        } else {
            cellElement.classList.remove('black');
            input.disabled = false;
        }
    }

    // Update the clue lists display
    function updateClueDisplay() {
        const acrossCluesList = document.getElementById('across-clues');
        const downCluesList = document.getElementById('down-clues');
        
        // Clear existing clues
        acrossCluesList.innerHTML = '';
        downCluesList.innerHTML = '';
        
        // Sort clues by number
        const sortedAcrossClues = [...state.clues.across].sort((a, b) => a.number - b.number);
        const sortedDownClues = [...state.clues.down].sort((a, b) => a.number - b.number);
        
        // Add across clues
        sortedAcrossClues.forEach(clue => {
            const listItem = document.createElement('li');
            listItem.dataset.clueId = clue.id;
            listItem.dataset.direction = 'across';
            listItem.textContent = `${clue.number}. ${clue.text}`;
            listItem.addEventListener('click', () => selectClue(clue.id, 'across'));
            acrossCluesList.appendChild(listItem);
        });
        
        // Add down clues
        sortedDownClues.forEach(clue => {
            const listItem = document.createElement('li');
            listItem.dataset.clueId = clue.id;
            listItem.dataset.direction = 'down';
            listItem.textContent = `${clue.number}. ${clue.text}`;
            listItem.addEventListener('click', () => selectClue(clue.id, 'down'));
            downCluesList.appendChild(listItem);
        });
    }

    // Handle input in a cell
    function handleCellInput(event) {
        const input = event.target;
        const cell = input.parentElement;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Update the grid state
        state.grid[row][col].letter = input.value.toUpperCase();
        input.value = state.grid[row][col].letter;
        
        // Move to next cell if applicable
        if (input.value !== '') {
            moveToNextCell(row, col);
        }
    }

    // Handle focus on a cell
    function handleCellFocus(event) {
        const input = event.target;
        const cell = input.parentElement;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        state.selectedCell = { row, col };
        highlightCurrentWord();
    }

    // Handle keyboard navigation
    function handleKeydown(event) {
        if (!state.selectedCell) return;
        
        const { row, col } = state.selectedCell;
        
        switch(event.key) {
            case 'ArrowRight':
                state.direction = 'across';
                moveToCell(row, col + 1);
                event.preventDefault();
                break;
            case 'ArrowLeft':
                state.direction = 'across';
                moveToCell(row, col - 1);
                event.preventDefault();
                break;
            case 'ArrowDown':
                state.direction = 'down';
                moveToCell(row + 1, col);
                event.preventDefault();
                break;
            case 'ArrowUp':
                state.direction = 'down';
                moveToCell(row - 1, col);
                event.preventDefault();
                break;
            case 'Backspace':
                if (event.target.value === '') {
                    // Move to previous cell if current cell is empty
                    if (state.direction === 'across') {
                        moveToCell(row, col - 1);
                    } else {
                        moveToCell(row - 1, col);
                    }
                }
                break;
        }
    }

    // Move to the next cell in the current direction
    function moveToNextCell(row, col) {
        if (state.direction === 'across') {
            moveToCell(row, col + 1);
        } else {
            moveToCell(row + 1, col);
        }
    }

    // Move to a specific cell
    function moveToCell(row, col) {
        // Check if cell is within grid boundaries
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (cell && !cell.classList.contains('black')) {
                const input = cell.querySelector('input');
                if (input && !input.disabled) {
                    input.focus();
                    state.selectedCell = { row, col };
                    highlightCurrentWord();
                }
            }
        }
    }

    // Highlight the current word
    function highlightCurrentWord() {
        // Remove existing highlights
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('highlighted');
        });
        
        document.querySelectorAll('.clues-list li').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!state.selectedCell) return;
        
        const { row, col } = state.selectedCell;
        const cellData = state.grid[row][col];
        
        // Find the current clue
        const clueId = state.direction === 'across' ? cellData.acrossClueId : cellData.downClueId;
        
        if (!clueId) return;
        
        // Highlight the clue in the list
        const clueElement = document.querySelector(`.clues-list li[data-clue-id="${clueId}"][data-direction="${state.direction}"]`);
        if (clueElement) {
            clueElement.classList.add('active');
            clueElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Find the clue
        const clue = getClueByIdFromDirection(clueId, state.direction);
        
        if (!clue) return;
        
        // Highlight all cells in the word
        for (let i = 0; i < clue.answer.length; i++) {
            let highlightRow = clue.row;
            let highlightCol = clue.col;
            
            if (state.direction === 'across') {
                highlightCol += i;
            } else {
                highlightRow += i;
            }
            
            const cellToHighlight = document.querySelector(`.cell[data-row="${highlightRow}"][data-col="${highlightCol}"]`);
            if (cellToHighlight) {
                cellToHighlight.classList.add('highlighted');
            }
        }
    }

    // Select a clue
    function selectClue(clueId, direction) {
        state.direction = direction;
        const clue = getClueByIdFromDirection(clueId, direction);
        
        if (clue) {
            moveToCell(clue.row, clue.col);
        }
    }

    // Reset the board
    function resetBoard() {
        if (confirm('Are you sure you want to reset the board? All clues and answers will be removed.')) {
            state.grid = Array(5).fill().map(() => Array(5).fill({
                letter: '',
                isBlack: false,
                number: null,
                acrossClueId: null,
                downClueId: null
            }));
            state.clues = { across: [], down: [] };
            state.nextClueId = 1;
            state.selectedCell = null;
            
            // Reinitialize the UI
            initializeGrid();
            updateClueDisplay();
        }
    }

    // Check answers
    function checkAnswers() {
        // Remove existing result classes
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('correct', 'incorrect');
        });
        
        let allCorrect = true;
        
        // Check across words
        state.clues.across.forEach(clue => {
            for (let i = 0; i < clue.answer.length; i++) {
                const row = clue.row;
                const col = clue.col + i;
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                const input = cell.querySelector('input');
                
                if (input.value === clue.answer[i]) {
                    cell.classList.add('correct');
                } else {
                    cell.classList.add('incorrect');
                    allCorrect = false;
                }
            }
        });
        
        // Check down words
        state.clues.down.forEach(clue => {
            for (let i = 0; i < clue.answer.length; i++) {
                const row = clue.row + i;
                const col = clue.col;
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                const input = cell.querySelector('input');
                
                if (input.value === clue.answer[i]) {
                    cell.classList.add('correct');
                } else {
                    cell.classList.add('incorrect');
                    allCorrect = false;
                }
            }
        });
        
        if (allCorrect && state.clues.across.length + state.clues.down.length > 0) {
            setTimeout(() => {
                alert('Congratulations! All answers are correct!');
            }, 100);
        }
    }
});