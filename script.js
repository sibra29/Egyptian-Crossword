// Egyptian Crossword Game
document.addEventListener('DOMContentLoaded', function() {
    // Game Configuration
    const gameConfig = {
        currentScreen: 'home', // 'home', 'game', 'success'
        boardSize: null, // 5 or 10
        puzzles: {
            "5x5": [
                {
                    grid: [
                        [1, 2, 3, 4, 5],
                        [6, 0, 7, 0, 8],
                        [9, 10, 0, 11, 12],
                        [13, 0, 14, 0, 15],
                        [16, 17, 18, 19, 20]
                    ],
                    clues: {
                        across: [
                            { number: 1, row: 0, col: 0, answer: "NILE", text: "Egypt's famous river" },
                            { number: 6, row: 1, col: 0, answer: "RA", text: "Egyptian sun god" },
                            { number: 7, row: 1, col: 2, answer: "ISIS", text: "Goddess of magic and healing" },
                            { number: 9, row: 2, col: 0, answer: "TOMB", text: "Pharaoh's final resting place" },
                            { number: 11, row: 2, col: 3, answer: "SET", text: "God of chaos and storms" },
                            { number: 13, row: 3, col: 0, answer: "KA", text: "Life force in Egyptian belief" },
                            { number: 14, row: 3, col: 2, answer: "HORUS", text: "Falcon-headed god" },
                            { number: 16, row: 4, col: 0, answer: "MUMMY", text: "Preserved body" }
                        ],
                        down: [
                            { number: 1, row: 0, col: 0, answer: "ANKH", text: "Symbol of life" },
                            { number: 2, row: 0, col: 1, answer: "IBIS", text: "Sacred bird of Thoth" },
                            { number: 3, row: 0, col: 2, answer: "LOTUS", text: "Sacred flower of Egypt" },
                            { number: 4, row: 0, col: 3, answer: "EYES", text: "The 'Eye of __' was a protective symbol" },
                            { number: 5, row: 0, col: 4, answer: "SPHINX", text: "Creature with human head and lion body" },
                            { number: 8, row: 1, col: 4, answer: "TEMU", text: "Ancient creator god of Heliopolis" },
                            { number: 10, row: 2, col: 1, answer: "OSI", text: "First part of an important god's name" },
                            { number: 12, row: 2, col: 4, answer: "TUT", text: "Famous boy king, shortened name" }
                        ]
                    }
                }
            ],
            "10x10": [
                {
                    grid: [
                        [1, 2, 3, 4, 5, 0, 6, 7, 8, 9],
                        [10, 0, 0, 0, 11, 0, 12, 0, 0, 0],
                        [13, 14, 15, 0, 16, 17, 0, 18, 0, 19],
                        [20, 0, 0, 21, 0, 22, 0, 23, 0, 24],
                        [25, 26, 0, 27, 28, 0, 29, 0, 30, 0],
                        [0, 31, 0, 32, 0, 33, 34, 35, 0, 36],
                        [37, 0, 38, 39, 0, 40, 0, 0, 41, 42],
                        [43, 44, 0, 45, 46, 0, 47, 0, 48, 0],
                        [0, 0, 0, 49, 0, 0, 50, 0, 0, 0],
                        [51, 52, 53, 54, 0, 55, 56, 57, 58, 59]
                    ],
                    clues: {
                        across: [
                            { number: 1, row: 0, col: 0, answer: "PHARAOH", text: "Ancient Egyptian ruler" },
                            { number: 6, row: 0, col: 6, answer: "APIS", text: "Sacred bull of Memphis" },
                            { number: 10, row: 1, col: 0, answer: "AMUN", text: "King of the gods" },
                            { number: 11, row: 1, col: 4, answer: "RE", text: "Another name for the sun god" },
                            { number: 12, row: 1, col: 6, answer: "RA", text: "Sun deity" },
                            { number: 13, row: 2, col: 0, answer: "KHUFU", text: "Builder of the Great Pyramid" },
                            { number: 16, row: 2, col: 4, answer: "NEFERTITI", text: "Famous queen whose name means 'the beautiful one has come'" },
                            { number: 20, row: 3, col: 0, answer: "HORUS", text: "Sky god with a falcon head" },
                            { number: 21, row: 3, col: 3, answer: "CANOPIC", text: "_____ jars held organs of the mummified" },
                            { number: 25, row: 4, col: 0, answer: "ANUBIS", text: "Jackal-headed god of mummification" },
                            { number: 27, row: 4, col: 3, answer: "SCARAB", text: "Sacred beetle in ancient Egypt" },
                            { number: 29, row: 4, col: 6, answer: "OSIRIS", text: "God of the afterlife and resurrection" },
                            { number: 31, row: 5, col: 1, answer: "BASTET", text: "Cat goddess" },
                            { number: 33, row: 5, col: 5, answer: "PYRAMID", text: "Monumental tomb structure" },
                            { number: 37, row: 6, col: 0, answer: "ISIS", text: "Wife of Osiris and mother of Horus" },
                            { number: 38, row: 6, col: 2, answer: "SPHINX", text: "Creature with human head and lion body" },
                            { number: 40, row: 6, col: 5, answer: "HATHOR", text: "Goddess of love and music" },
                            { number: 43, row: 7, col: 0, answer: "MENES", text: "First pharaoh to unite Upper and Lower Egypt" },
                            { number: 45, row: 7, col: 3, answer: "NILE", text: "Egypt's lifeline river" },
                            { number: 47, row: 7, col: 6, answer: "SET", text: "God of chaos and storms" },
                            { number: 49, row: 8, col: 3, answer: "EYE", text: "The 'Eye of Horus' is a protective symbol" },
                            { number: 50, row: 8, col: 6, answer: "RA", text: "Egyptian sun deity" },
                            { number: 51, row: 9, col: 0, answer: "HIEROGLYPHS", text: "Egyptian writing system using pictorial symbols" }
                        ],
                        down: [
                            { number: 1, row: 0, col: 0, answer: "PAPYRUS", text: "Ancient Egyptian writing material" },
                            { number: 2, row: 0, col: 1, answer: "HEKA", text: "Egyptian concept of magic" },
                            { number: 3, row: 0, col: 2, answer: "ATEN", text: "Sun disk worshipped during Akhenaten's reign" },
                            { number: 4, row: 0, col: 3, answer: "RAMSES", text: "Name of several powerful pharaohs" },
                            { number: 5, row: 0, col: 4, answer: "OBELISK", text: "Tall, four-sided monument with a pyramid-shaped top" },
                            { number: 7, row: 0, col: 7, answer: "IBIS", text: "Sacred bird associated with Thoth" },
                            { number: 8, row: 0, col: 8, answer: "SENET", text: "Ancient Egyptian board game" },
                            { number: 9, row: 0, col: 9, answer: "ANKH", text: "Cross with a loop, symbolizing life" },
                            { number: 14, row: 2, col: 1, answer: "HATSHEPSUT", text: "Female pharaoh who ruled as king" },
                            { number: 15, row: 2, col: 2, answer: "UDJAT", text: "Another name for the Eye of Horus" },
                            { number: 17, row: 2, col: 5, answer: "TUTANKHAMUN", text: "Boy king whose tomb was discovered in 1922" },
                            { number: 18, row: 2, col: 7, answer: "IMHOTEP", text: "Ancient Egyptian polymath and architect of the Step Pyramid" },
                            { number: 19, row: 2, col: 9, answer: "MAAT", text: "Goddess of truth, balance, and order" },
                            { number: 22, row: 3, col: 5, answer: "PTAH", text: "Creator god of Memphis" },
                            { number: 23, row: 3, col: 7, answer: "SEKHMET", text: "Lion-headed goddess of war" },
                            { number: 24, row: 3, col: 9, answer: "THOTH", text: "Ibis-headed god of wisdom and writing" },
                            { number: 26, row: 4, col: 1, answer: "NUT", text: "Sky goddess who swallows the sun each night" },
                            { number: 28, row: 4, col: 4, answer: "AMMIT", text: "Devourer of impure hearts in the afterlife" },
                            { number: 30, row: 4, col: 8, answer: "SAHU", text: "The spiritual body after death" },
                            { number: 32, row: 5, col: 3, answer: "APIS", text: "Sacred bull worshipped at Memphis" },
                            { number: 34, row: 5, col: 6, answer: "REED", text: "Plant used to make papyrus" },
                            { number: 35, row: 5, col: 7, answer: "MESA", text: "Flattop elevation, similar to those where some tombs were built" },
                            { number: 36, row: 5, col: 9, answer: "ATEF", text: "Crown worn by Osiris" },
                            { number: 39, row: 6, col: 3, answer: "NAOS", text: "Inner sanctuary of a temple" },
                            { number: 41, row: 6, col: 8, answer: "REN", text: "A person's true name in Egyptian belief" },
                            { number: 42, row: 6, col: 9, answer: "HEH", text: "God of infinity and eternity" },
                            { number: 44, row: 7, col: 1, answer: "EDFU", text: "Site of the Temple of Horus" },
                            { number: 46, row: 7, col: 4, answer: "LOTUS", text: "Sacred flower symbolizing rebirth" },
                            { number: 48, row: 7, col: 8, answer: "TET", text: "Pillar symbol associated with Osiris" },
                            { number: 52, row: 9, col: 1, answer: "IB", text: "The heart, weighed against Ma'at's feather" },
                            { number: 53, row: 9, col: 2, answer: "EL", text: "Semitic word for deity adopted by some Egyptians" },
                            { number: 54, row: 9, col: 3, answer: "RA", text: "Sun god" },
                            { number: 55, row: 9, col: 5, answer: "GIZA", text: "Location of the Great Pyramid" },
                            { number: 56, row: 9, col: 6, answer: "LAW", text: "Ma'at represented divine order and ___" },
                            { number: 57, row: 9, col: 7, answer: "YAM", text: "Canaanite god of the sea, known to Egyptians" },
                            { number: 58, row: 9, col: 8, answer: "PSD", text: "Abbreviation for the Per-Djed, a royal treasury" },
                            { number: 59, row: 9, col: 9, answer: "SHU", text: "God of air and father of Nut and Geb" }
                        ]
                    }
                }
            ]
        },
        currentPuzzle: null,
        gameState: {
            selectedCell: null,
            direction: 'across',
            boardState: null,
            revealedSolution: false
        }
    };

    // DOM elements
    const screens = {
        home: document.getElementById('home-screen'),
        game: document.getElementById('game-screen'),
        success: document.getElementById('success-screen')
    };

    // Initialize game
    initializeGame();

    function initializeGame() {
        // Set up event listeners for home screen
        document.getElementById('size-5x5').addEventListener('click', () => startGame(5));
        document.getElementById('size-10x10').addEventListener('click', () => startGame(10));
        
        // Set up event listeners for game screen
        document.getElementById('back-to-home').addEventListener('click', goToHome);
        document.getElementById('check-answers').addEventListener('click', checkAnswers);
        document.getElementById('reveal-answer').addEventListener('click', revealSolution);
        document.getElementById('reset-puzzle').addEventListener('click', resetPuzzle);
        
        // Set up event listener for success screen
        document.getElementById('play-again').addEventListener('click', goToHome);
    }

    // Start game with selected board size
    function startGame(size) {
        gameConfig.boardSize = size;
        
        // Select a random puzzle from the available puzzles for this size
        const puzzles = gameConfig.puzzles[`${size}x${size}`];
        gameConfig.currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        
        // Initialize board state
        initializeBoard();
        
        // Show game screen
        changeScreen('game');
    }

    // Initialize the crossword board
    function initializeBoard() {
        const boardSize = gameConfig.boardSize;
        const puzzle = gameConfig.currentPuzzle;
        
        // Initialize board state matrix
        gameConfig.gameState.boardState = Array(boardSize).fill().map(() => 
            Array(boardSize).fill().map(() => ({
                letter: '',
                isBlack: false,
                number: null,
                acrossClueId: null,
                downClueId: null
            }))
        );
        
        // Set up the grid based on the puzzle definition
        const grid = puzzle.grid;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (grid[row][col] === 0) {
                    gameConfig.gameState.boardState[row][col].isBlack = true;
                } else if (grid[row][col] > 0) {
                    gameConfig.gameState.boardState[row][col].number = grid[row][col];
                }
            }
        }
        
        // Set up across clues references
        puzzle.clues.across.forEach(clue => {
            const { row, col, answer } = clue;
            for (let i = 0; i < answer.length; i++) {
                if (col + i < boardSize && !gameConfig.gameState.boardState[row][col + i].isBlack) {
                    gameConfig.gameState.boardState[row][col + i].acrossClueId = clue.number;
                }
            }
        });
        
        // Set up down clues references
        puzzle.clues.down.forEach(clue => {
            const { row, col, answer } = clue;
            for (let i = 0; i < answer.length; i++) {
                if (row + i < boardSize && !gameConfig.gameState.boardState[row + i][col].isBlack) {
                    gameConfig.gameState.boardState[row + i][col].downClueId = clue.number;
                }
            }
        });
        
        // Generate the grid in the DOM
        createGridDOM();
        
        // Populate clue lists
        populateClues();
        
        // Reset game state
        gameConfig.gameState.revealedSolution = false;
        gameConfig.gameState.selectedCell = null;
    }

    // Create the grid DOM elements
    function createGridDOM() {
        const gridElement = document.getElementById('crossword-grid');
        gridElement.innerHTML = '';
        
        // Set the appropriate grid size class
        gridElement.className = `crossword-grid size-${gameConfig.boardSize}x${gameConfig.boardSize}`;
        
        // Create cells
        for (let row = 0; row < gameConfig.boardSize; row++) {
            for (let col = 0; col < gameConfig.boardSize; col++) {
                const cellData = gameConfig.gameState.boardState[row][col];
                
                // Create cell element
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (cellData.isBlack) {
                    cell.classList.add('black');
                } else {
                    // Create input element for user to enter letters
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.row = row;
                    input.dataset.col = col;
                    
                    // Add event listeners
                    input.addEventListener('input', handleCellInput);
                    input.addEventListener('focus', handleCellFocus);
                    input.addEventListener('keydown', handleKeydown);
                    
                    cell.appendChild(input);
                    
                    // Add number if needed
                    if (cellData.number !== null) {
                        const numberElement = document.createElement('div');
                        numberElement.className = 'cell-number';
                        numberElement.textContent = cellData.number;
                        cell.appendChild(numberElement);
                    }
                }
                
                gridElement.appendChild(cell);
            }
        }
    }

    // Populate clue lists
    function populateClues() {
        const acrossCluesList = document.getElementById('across-clues');
        const downCluesList = document.getElementById('down-clues');
        
        // Clear existing clues
        acrossCluesList.innerHTML = '';
        downCluesList.innerHTML = '';
        
        // Get clues from current puzzle
        const acrossClues = gameConfig.currentPuzzle.clues.across;
        const downClues = gameConfig.currentPuzzle.clues.down;
        
        // Sort clues by number
        const sortedAcrossClues = [...acrossClues].sort((a, b) => a.number - b.number);
        const sortedDownClues = [...downClues].sort((a, b) => a.number - b.number);
        
        // Add across clues
        sortedAcrossClues.forEach(clue => {
            const listItem = document.createElement('li');
            listItem.dataset.clueNumber = clue.number;
            listItem.dataset.direction = 'across';
            listItem.textContent = `${clue.number}. ${clue.text}`;
            listItem.addEventListener('click', () => selectClue(clue.number, 'across'));
            acrossCluesList.appendChild(listItem);
        });
        
        // Add down clues
        sortedDownClues.forEach(clue => {
            const listItem = document.createElement('li');
            listItem.dataset.clueNumber = clue.number;
            listItem.dataset.direction = 'down';
            listItem.textContent = `${clue.number}. ${clue.text}`;
            listItem.addEventListener('click', () => selectClue(clue.number, 'down'));
            downCluesList.appendChild(listItem);
        });
    }

    // Handle input in a cell
    function handleCellInput(event) {
        const input = event.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        
        // Convert to uppercase and update state
        input.value = input.value.toUpperCase();
        gameConfig.gameState.boardState[row][col].letter = input.value;
        
        // Remove any correct/incorrect classes
        const cell = input.parentElement;
        cell.classList.remove('correct', 'incorrect');
        
        // Move to next cell if input is provided
        if (input.value !== '') {
            moveToNextCell(row, col);
        }
        
        // Check if the puzzle is complete
        checkCompletion();
    }

    // Handle focus on a cell
    function handleCellFocus(event) {
        const input = event.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        
        // Update selected cell
        gameConfig.gameState.selectedCell = { row, col };
        
        // Determine direction (prefer current direction if both are available)
        const cellData = gameConfig.gameState.boardState[row][col];
        if (gameConfig.gameState.direction === 'across' && cellData.acrossClueId) {
            // Keep current direction
        } else if (gameConfig.gameState.direction === 'down' && cellData.downClueId) {
            // Keep current direction
        } else if (cellData.acrossClueId) {
            gameConfig.gameState.direction = 'across';
        } else if (cellData.downClueId) {
            gameConfig.gameState.direction = 'down';
        }
        
        // Highlight current word
        highlightCurrentWord();
    }

    // Handle keyboard navigation
    function handleKeydown(event) {
        if (!gameConfig.gameState.selectedCell) return;
        
        const { row, col } = gameConfig.gameState.selectedCell;
        
        switch(event.key) {
            case 'ArrowRight':
                moveToCell(row, col + 1);
                event.preventDefault();
                break;
            case 'ArrowLeft':
                moveToCell(row, col - 1);
                event.preventDefault();
                break;
            case 'ArrowDown':
                moveToCell(row + 1, col);
                event.preventDefault();
                break;
            case 'ArrowUp':
                moveToCell(row - 1, col);
                event.preventDefault();
                break;
            case 'Tab':
                // Tab key toggles direction
                gameConfig.gameState.direction = gameConfig.gameState.direction === 'across' ? 'down' : 'across';
                highlightCurrentWord();
                event.preventDefault();
                break;
            case 'Backspace':
                if (event.target.value === '') {
                    // Move to previous cell if current cell is empty
                    if (gameConfig.gameState.direction === 'across') {
                        moveToCell(row, col - 1);
                    } else {
                        moveToCell(row - 1, col);
                    }
                    event.preventDefault();
                }
                break;
        }
    }

    // Move to the next cell in the current direction
    function moveToNextCell(row, col) {
        if (gameConfig.gameState.direction === 'across') {
            moveToCell(row, col + 1);
        } else {
            moveToCell(row + 1, col);
        }
    }

    // Move to a specific cell
    function moveToCell(row, col) {
        // Check if cell is within grid boundaries
        if (row >= 0 && row < gameConfig.boardSize && col >= 0 && col < gameConfig.boardSize) {
            const cellData = gameConfig.gameState.boardState[row][col];
            
            // Skip black cells
            if (!cellData.isBlack) {
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    const input = cell.querySelector('input');
                    if (input) {
                        input.focus();
                    }
                }
            }
        }
    }

    // Highlight the current word
    function highlightCurrentWord() {
        // Remove existing highlights
        document.querySelectorAll('.cell.highlighted').forEach(cell => {
            cell.classList.remove('highlighted');
        });
        
        document.querySelectorAll('.clues-list li.active').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!gameConfig.gameState.selectedCell) return;
        
        const { row, col } = gameConfig.gameState.selectedCell;
        const cellData = gameConfig.gameState.boardState[row][col];
        
        // Get the clue number for the current direction
        const clueNumber = gameConfig.gameState.direction === 'across' ? 
            cellData.acrossClueId : cellData.downClueId;
            
        if (!clueNumber) return;
        
        // Highlight the clue in the list
        const clueElement = document.querySelector(`.clues-list li[data-clue-number="${clueNumber}"][data-direction="${gameConfig.gameState.direction}"]`);
        if (clueElement) {
            clueElement.classList.add('active');
            // Scroll the clue into view
            clueElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Find the clue
        const clue = findClueByNumber(clueNumber, gameConfig.gameState.direction);
        
        if (!clue) return;
        
        // Highlight all cells in the word
        highlightClue(clue, gameConfig.gameState.direction);
    }

    // Highlight all cells that are part of a clue
    function highlightClue(clue, direction) {
        const { row, col, answer } = clue;
        
        for (let i = 0; i < answer.length; i++) {
            let cellRow = row;
            let cellCol = col;
            
            if (direction === 'across') {
                cellCol += i;
            } else {
                cellRow += i;
            }
            
            // Skip if out of bounds
            if (cellRow >= gameConfig.boardSize || cellCol >= gameConfig.boardSize) continue;
            
            const cell = document.querySelector(`.cell[data-row="${cellRow}"][data-col="${cellCol}"]`);
            if (cell && !cell.classList.contains('black')) {
                cell.classList.add('highlighted');
            }
        }
    }

    // Find a clue by its number and direction
    function findClueByNumber(number, direction) {
        return gameConfig.currentPuzzle.clues[direction].find(clue => clue.number === number);
    }

    // Select a clue by its number and direction
    function selectClue(number, direction) {
        const clue = findClueByNumber(number, direction);
        
        if (clue) {
            // Set direction
            gameConfig.gameState.direction = direction;
            
            // Move to the first cell of the clue
            gameConfig.gameState.selectedCell = { row: clue.row, col: clue.col };
            moveToCell(clue.row, clue.col);
            
            // Highlight the word
            highlightCurrentWord();
        }
    }

    // Check if all answers are correct
    function checkAnswers() {
        // Remove existing result classes
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('correct', 'incorrect');
        });
        
        let allCorrect = true;
        
        // Check all cells
        for (let row = 0; row < gameConfig.boardSize; row++) {
            for (let col = 0; col < gameConfig.boardSize; col++) {
                const cellData = gameConfig.gameState.boardState[row][col];
                
                // Skip black cells
                if (cellData.isBlack) continue;
                
                // Find the expected letter(s) for this cell
                const expectedLetter = findExpectedLetter(row, col);
                
                if (expectedLetter) {
                    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                    const input = cell.querySelector('input');
                    
                    if (input.value === expectedLetter) {
                        cell.classList.add('correct');
                    } else {
                        cell.classList.add('incorrect');
                        allCorrect = false;
                    }
                }
            }
        }
        
        // Check if the puzzle is complete
        if (allCorrect && isPuzzleFilled()) {
            setTimeout(() => {
                changeScreen('success');
            }, 500);
        }
    }

    // Find the expected letter for a cell
    function findExpectedLetter(row, col) {
        // Find any clue that includes this cell
        const acrossClueId = gameConfig.gameState.boardState[row][col].acrossClueId;
        
        if (acrossClueId) {
            const acrossClue = findClueByNumber(acrossClueId, 'across');
            if (acrossClue) {
                const letterPosition = col - acrossClue.col;
                return acrossClue.answer[letterPosition];
            }
        }
        
        const downClueId = gameConfig.gameState.boardState[row][col].downClueId;
        
        if (downClueId) {
            const downClue = findClueByNumber(downClueId, 'down');
            if (downClue) {
                const letterPosition = row - downClue.row;
                return downClue.answer[letterPosition];
            }
        }
        
        return null;
    }

    // Check if the puzzle is filled completely
    function isPuzzleFilled() {
        for (let row = 0; row < gameConfig.boardSize; row++) {
            for (let col = 0; col < gameConfig.boardSize; col++) {
                const cellData = gameConfig.gameState.boardState[row][col];
                
                // Skip black cells
                if (cellData.isBlack) continue;
                
                // Check if cell has a letter
                if (!cellData.letter || cellData.letter === '') {
                    return false;
                }
            }
        }
        
        return true;
    }

    // Reveal the solution
    function revealSolution() {
        if (confirm('Are you sure you want to reveal the solution?')) {
            for (let row = 0; row < gameConfig.boardSize; row++) {
                for (let col = 0; col < gameConfig.boardSize; col++) {
                    const cellData = gameConfig.gameState.boardState[row][col];
                    
                    // Skip black cells
                    if (cellData.isBlack) continue;
                    
                    // Find the expected letter for this cell
                    const expectedLetter = findExpectedLetter(row, col);
                    
                    if (expectedLetter) {
                        // Update the cell with the correct letter
                        cellData.letter = expectedLetter;
                        
                        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                        const input = cell.querySelector('input');
                        
                        input.value = expectedLetter;
                        cell.classList.add('revealed');
                    }
                }
            }
            
            gameConfig.gameState.revealedSolution = true;
        }
    }

    // Reset the current puzzle
    function resetPuzzle() {
        if (confirm('Are you sure you want to reset the puzzle? All your answers will be cleared.')) {
            // Clear all inputs
            for (let row = 0; row < gameConfig.boardSize; row++) {
                for (let col = 0; col < gameConfig.boardSize; col++) {
                    const cellData = gameConfig.gameState.boardState[row][col];
                    
                    // Skip black cells
                    if (cellData.isBlack) continue;
                    
                    // Clear the letter
                    cellData.letter = '';
                    
                    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                    if (cell) {
                        // Remove any status classes
                        cell.classList.remove('correct', 'incorrect', 'revealed');
                        
                        // Clear the input
                        const input = cell.querySelector('input');
                        if (input) {
                            input.value = '';
                        }
                    }
                }
            }
            
            gameConfig.gameState.revealedSolution = false;
        }
    }

    // Check if the puzzle is complete
    function checkCompletion() {
        if (isPuzzleFilled()) {
            // Check all answers
            let allCorrect = true;
            
            for (let row = 0; row < gameConfig.boardSize; row++) {
                for (let col = 0; col < gameConfig.boardSize; col++) {
                    const cellData = gameConfig.gameState.boardState[row][col];
                    
                    // Skip black cells
                    if (cellData.isBlack) continue;
                    
                    // Find the expected letter for this cell
                    const expectedLetter = findExpectedLetter(row, col);
                    
                    if (expectedLetter && cellData.letter !== expectedLetter) {
                        allCorrect = false;
                        break;
                    }
                }
                
                if (!allCorrect) break;
            }
            
            if (allCorrect) {
                setTimeout(() => {
                    changeScreen('success');
                }, 500);
            }
        }
    }

    // Change screen (home, game, success)
    function changeScreen(screen) {
        // Hide all screens
        for (const key in screens) {
            screens[key].classList.remove('active');
        }
        
        // Show requested screen
        screens[screen].classList.add('active');
        
        // Update current screen
        gameConfig.currentScreen = screen;
    }

    // Go back to home screen
    function goToHome() {
        changeScreen('home');
    }
});