'use strict'
const BOARD_SIZE = 14


const SKY = 'SKY'
const WALL = 'WALL'
const EMPTY = ' '

const HERO = '🗼'
const ALIEN = '👽'
var LASER = '⚡'
var CANDIE = '🌟'

var gBoard
var gGame


function init() {

    gBoard = createBoard()
    console.log('board', gBoard);
    renderBoard(gBoard)
    // clearInterval(gIntervalAliens)
    console.log('aliens:', gAliens);
    gGame = { isOn: false, alienCount: 0 }
    document.querySelector('.popup').hidden = true


    gHero = { pos: { i: 12, j: 6 }, isShoot: false }
    glazer = { pos: { i: gHero.pos.i - 1, j: gHero.pos.j }, KillScore: 0, superModeCount: 3 }

    gMoveDiff = { i: 0, j: 1 }
    gNextId = 101
    gIsWall = true
    gAliensTopRowIdx = 2
    gAliensBottomRowIdx = 0
    gTheGrave = []
    updateScore()
    gCandieInterval = setInterval(addCandie, 10000)
     if (gIntervalAliens) clearInterval(gIntervalAliens)
        gIntervalAliens = setInterval(moveAlien, ALIEN_SPEED)
}
function addCandie() {
    if (!gGame.isOn) return
    var randIdx = getRandomInt(0, BOARD_SIZE)
    var pos = {
        i: 0,
        j: randIdx
    }
    gBoard[pos.i][pos.j].gameObject = CANDIE
    renderCell(pos, CANDIE)

    setTimeout(() => {
        gBoard[pos.i][pos.j].gameObject = null
        renderCell(pos, EMPTY)
    }, 5000);
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
    createAliens(board)
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
            if (currCell.gameObject === CANDIE) {
                strHTML += CANDIE
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
function startBtn() {
    gGame.isOn = true
    var elBtn = document.querySelector('.btn-container')
    elBtn.innerHTML = '<h4 class="btn"> GAME IS ON!!</h4>'
    //    elBtn.style.display = 'none'

}
function showBtn() {
    var elBtn = document.querySelector('.btn-container')
    elBtn.innerHTML = '<button class="btn" onclick="restartBtn()">restart</button>'
    elBtn.style.display = 'block'
}
function restartBtn() {
    init()
    var elBtn = document.querySelector('.btn-container')
    elBtn.innerHTML = '<button class="btnlevel" onclick="level(500 , 8 , 2)">Easy</button><button class="btnlevel" onclick="level(400 , 10 , 6)">Normal</button><button class="btnlevel" onclick="level(300 , 12 , 10)">Hard</button><h1></h1><button class="btn" onclick="startBtn()">press for begin</button>'
}
function gameOver() {
    console.log('sorry,you lose..play again!');
    const elPopup = document.querySelector('.popup')
    elPopup.hidden = false
    elPopup.querySelector('h2').innerText = 'sorry 😥'
    elPopup.querySelector('h3').innerText = 'you lose the game..you can play again!'
}
function isVictory() {
    console.log('victory');
    const elPopup = document.querySelector('.popup')
    elPopup.hidden = false
}

function level(speed, length, diff) {
    console.log('hi' , speed);
    
    ALIEN_SPEED = speed
    ALIEN_ROW_LENGTH = length
    diffLevel = diff
    init()
}
