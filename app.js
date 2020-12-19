let box = document.querySelectorAll('.field-box');
box = [...box];
let clicked;
let userName = 'Nastya';
let mark;


const gameBoard = (() => {
    const board = ['','','',
                    '','','',
                    '','',''];
    const buildBoard = () => {
        for (let i = 0; i <box.length; i++){
            box[i].textContent = board[i];
        }
    };

    const changeBoard = (counter, mark) => {
        board.splice(counter,1,mark);
    };
    let counter = 0;
    const count = () => {
        gameBoard.counter++;
    }

    
    return {
        board,
        buildBoard,
        changeBoard,
        counter,
        count
    }
})();

gameBoard.buildBoard();

// Module for players
const Players = (name) => {

    const move = () => { //move on click
        for (let i = 0; i < box.length; i++){
            if (!mark || mark === 'O'){
                mark = 'X'
            } else if (mark === 'X') {
                mark = 'O';
            };
            box[i].addEventListener('click', () => {
                if (!box[i].textContent){ 
                box[i].textContent = mark;
                let counter = box.indexOf(box[i]);
                gameBoard.changeBoard(counter,mark);
                gameBoard.count();
                ifWin.checkWin();
                move();
            } 
            })
        }
    };

    return {
        name,
        move
    }
};

let player1 = Players(userName);
player1.move();

const ifWin = (() => {
    const winConditions = [
        [0,1,2],
        [2,5,8],
        [8,7,6],
        [6,3,0],
        [6,4,2],
        [0,4,8],
        [1,4,7]
    ];

    const checkWin = () => {
        for (let i = 0; i < winConditions.length; i++){
            if (gameBoard.board[winConditions[i][0]] === 'X' && 
            gameBoard.board[winConditions[i][1]] === 'X' && 
            gameBoard.board[winConditions[i][2]] === 'X') {
                console.log('X wins!');
            } else if (gameBoard.board[winConditions[i][0]] === 'O' &&
             gameBoard.board[winConditions[i][1]] === 'O' &&
              gameBoard.board[winConditions[i][2]] === 'O'){
                console.log('O wins!');
            }
        }
    };

    return {
        checkWin
    }
})();

/*

*/