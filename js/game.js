'use strict'
const BOARD_SIZE = 14


const SKY = 'SKY'
const WALL = 'WALL'
const EMPTY = ' '

const HERO = '🗼'
const ALIEN = '👽'
var LASER = '⚡'

var gBoard
var gGame = { isOn: true, alienCount: 0 ,gameDone: false}


function init() {
    gBoard = createBoard()
    console.log('board', gBoard);
    renderBoard(gBoard)
    console.log('aliens:', gAliens);
    gIsAlienFreeze = true

    
    // handleAlienHit()
    }


function createBoard() {

    const size = BOARD_SIZE
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()


            if (i === 13) board[i][j].type = WALL
        }
    }
    createHero(board)
    createAliens(board , gAliensBottomRowIdx, gAliensTopRowIdx , 0 , ALIEN_ROW_LENGTH - 1)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({ i, j }) + ' '
            cellClass += (currCell.type === SKY) ? 'sky' : 'wall'
            strHTML += `<td class="cell ${cellClass}" >`

            if (currCell.gameObject === HERO) {
                strHTML += HERO
            }
            if (currCell.gameObject === ALIEN) {
                strHTML += ALIEN
            }
            if (currCell.gameObject === LASER) {
                strHTML += LASER
            }

            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function createCell(gameObject = null) {
    return { type: SKY, gameObject: gameObject }
}
function startBtn(){
   gGame.isOn = true
   var elBtn = document.querySelector('.btn-container')
   elBtn.innerHTML = '<h4 class="btn"> GAME IS ON!!</h4>'
//    elBtn.style.display = 'none'
   
}
function showBtn(){
    var elBtn = document.querySelector('.btn')
   elBtn.innerHTML ='<button class="btn" onclick="restartBtn()">restart</button>'
   elBtn.style.display = 'block'
}
function restartBtn(){
    init()
}
