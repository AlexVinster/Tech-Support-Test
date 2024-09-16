const boards = [
    // Valid board
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 0, 3, 4, 8], // Zero
        [1, 0, 0, 3, 4, 2, 5, 6, 0],
        [8, 5, 9, 7, 6, 1, 0, 2, 0],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 0, 1, 5, 3, 7, 2, 1, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 0, 0, 4, 8, 1, 1, 7, 9]
    ],
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 7] // Duplicate 
    ],
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 5, 9, 6, 3, 1],
        [3, 4, 5, 2, 8, 6, 1, 7, 9] // Column duplicate
    ],
    [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, -1, 9, 5, 3, 4, 8], // Negative number
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  ];
  
  function validSolution(board) {
  
    // Check for 0 or -1 etc.
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let value = board[row][col];
            if (value <= 0 || value > 9) {
                return `Неприпустиме число або порожнє поле (${value}) у позиції (${row + 1}, ${col + 1})`;
            }
        }
    }
  
    // Check rows
    for (let row = 0; row < 9; row++) {
        if (!isUnique(board[row])) {
            return `Повторення у рядку ${row + 1}`;
        }
    }
  
    // Check columns
    for (let col = 0; col < 9; col++) {
        const column = board.map(row => row[col]);
        if (!isUnique(column)) {
            return `Повторення у стовпці ${col + 1}`;
        }
    }
  
    return true;
  }
  
  function renderBoard(board, elementId) {
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = board[row][col] !== 0 ? board[row][col] : '';
            boardElement.appendChild(cell);
        }
    }
  }
  
  function validateSudoku(boardIndex) {
    const messageElement = document.getElementById(`message-${boardIndex}`);
    const validationResult = validSolution(boards[boardIndex - 1]);
    if (validationResult === true) {
        messageElement.textContent = 'Розв\'язок правильний!';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = `Розв\'язок неправильний: ${validationResult}`;
        messageElement.style.color = 'red';
    }
  }
  
  // boards output
  renderBoard(boards[0], 'board-1');
  renderBoard(boards[1], 'board-2');
  renderBoard(boards[2], 'board-3');
  renderBoard(boards[3], 'board-4');
  renderBoard(boards[4], 'board-5');
  