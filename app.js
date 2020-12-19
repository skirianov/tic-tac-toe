let box = document.querySelectorAll('.field-box');
box = [...box];
let userName;
let mark;
const submit = document.querySelector('#submit');
let counter = 0;

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

    
    return {
        board,
        buildBoard,
        changeBoard
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
                (mark === 'X')? box[i].style.color ="red" : box[i].style.color = "blue";
                let counter = box.indexOf(box[i]);
                gameBoard.changeBoard(counter,mark);
                ifWin.checkWin();
                move();
            } 
            })
        }
    };

    return {
        name,
        move,
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
        [1,4,7],
        [3,4,5]
    ];

    let winner;

    const checkWin = () => {
        counter++;
        for (let i = 0; i < winConditions.length; i++){
            if (gameBoard.board[winConditions[i][0]] === 'X' && 
            gameBoard.board[winConditions[i][1]] === 'X' && 
            gameBoard.board[winConditions[i][2]] === 'X') {
                winner = userName + ' is a winner!';
                callModal(winner);
            } else if (gameBoard.board[winConditions[i][0]] === 'O' &&
             gameBoard.board[winConditions[i][1]] === 'O' &&
              gameBoard.board[winConditions[i][2]] === 'O'){
                winner = "AI is a winner!";
                callModal(winner);
            } else if (counter === 9 && !winner){
                callModal("It's a Draw")
            }
        }
    };

    return {
        checkWin
    }
})();

const callModal = (winner) => {
    const page = document.querySelector('.page');
    const modal = document.querySelector('.modal');
    const msg = document.querySelector('.msg-text');

    page.style.filter = "blur(4px)";
    modal.style.display = "block";
    msg.textContent = winner;
}

const submitUserName = () => {
    const warning = document.querySelector('#warning');
    userName = document.querySelector('#user-name').value;
    
    if (!userName){
        warning.style.display = "block";
        return
    };

    loadMain();

    return {
        userName
    }
};


submit.addEventListener('click',submitUserName);

function loadMain(){
    const intro = document.querySelector('.intro');
    intro.style.display = "none";
    const page = document.querySelector('.page');
    page.style.display = "block";
    const user = document.querySelector('#user');
    user.textContent = userName;
}