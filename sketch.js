let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let playerTurn = true;
  
  function setup() {
    createCanvas(400, 400);
    stroke(0);
    strokeWeight(3);
    textSize(64);
    textAlign(CENTER, CENTER);
  }
  
  function drawBoard() {
    line(width / 3, 0, width / 3, height);
    line(2 * width / 3, 0, 2 * width / 3, height);
  
    line(0, height / 3, width, height / 3);
    line(0, 2 * height / 3, width, 2 * height / 3);
  
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        text(board[i][j], (i + 0.5) * (width / 3), (j + 0.5) * (height / 3));
  }
  
  function draw() {
    background(255);
    drawBoard();
    if(checkWin(board) !== false){
       if(checkWin(board) == 1)
         createElement('h1','Player Wins!');
      else if(checkWin(board) == -1)
        createElement('h1','AI Wins!');
      else
        createElement('h1','Tie!');
      noLoop();
      playerTurn = false;
    }
  }
  
  function playerMove() {
    let xPos = floor(mouseX / (width / 3));
    let yPos = floor(mouseY / (height / 3));
    
    if(board[xPos][yPos] == ''){
    board[xPos][yPos] = 'X';
    playerTurn = false;
    if(checkWin(board) !== false)
        return;
     
    aiMove();
    }
  }
  
  function aiMove() {
    let bestScore = Infinity;
    let bestMove;
  
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = 'O';
          let score = minimax(board, 0, false);
          board[i][j] = '';
          if (score < bestScore) {
            bestScore = score;
            bestMove = {
              i,
              j
            };
          }
        }
      }
    board[bestMove.i][bestMove.j] = 'O';
    playerTurn = true;
  }
  
  function minimax(board, depth, isMin) {
    if (checkWin(board) !== false) {
      let score = checkWin(board);
      return score;
    }
  
    if (isMin) {
      let bestScore = Infinity;
  
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
            board[i][j] = 'O';
            score = minimax(board, depth + 1, false)
            board[i][j] = '';
            if (score < bestScore)
              bestScore = score;
          }
        }
      return bestScore;
    } 
    else {
      let bestScore = -Infinity;
  
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
            board[i][j] = 'X';
            score = minimax(board, depth + 1, true)
            board[i][j] = '';
            if (score > bestScore)
              bestScore = score;
          }
        }
      return bestScore;
    }
  }
  
  function checkWin(board) {
      if ((tripleEquals(board[0][0], board[1][1], board[2][2]) || tripleEquals(board[0][2], board[1][1], board[2][0])) && board[1][1] != '')
      return board[1][1] == 'X' ? 1 : -1;
    
    for (let i = 0; i < 3; i++)
      if (tripleEquals(board[i][0], board[i][1], board[i][2]) && board[i][0] != '')
        return board[i][0] == 'X' ? 1 : -1;
    for (let i = 0; i < 3; i++)
      if (tripleEquals(board[0][i], board[1][i], board[2][i]) && board[0][i] != '')
        return board[0][i] == 'X' ? 1 : -1;
  
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] == '')
          return false
  
    return 0;
  }
  
  function tripleEquals(a, b, c) {
    return (a == b) ? (b == c) ? (a == c) : false : false;
  }
  
  function mousePressed() {
    if (playerTurn) {
      playerMove();
    }
  }