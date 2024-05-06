const ALIEN_SPEED = 500
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

var gMoveDiff = { i: 0, j: 1 }


var gAliens
var gIsWall = false

var gAliensTopRowIdx = 2
var gAliensBottomRowIdx = 0

var gIntervalAliens


var gIsAlienFreeze = false


function createAliens(board, fromI, toI, fromJ, toJ) {
    gAliens = []
    for (var i = toI; i >= fromI; i--) {
        for (var j = toJ; j >= fromJ; j--) {

            var alien = {
                location: {
                    i: i,
                    j: j
                }
            }
            gAliens.push(alien)
            board[alien.location.i][alien.location.j].gameObject = ALIEN

            if (gIntervalAliens) clearInterval(gIntervalAliens)
            gIntervalAliens = setInterval(moveAlien, ALIEN_SPEED)
        }
    }
}
function cleanAliens() {
    gIsWall = true
    gAliens = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.gameObject === ALIEN) gBoard[i][j].gameObject = null
        }
    }
}

function moveAlien() {
    for (var i = 0; i < gAliens.length; i++) {
        const alien = gAliens[i]
        // console.log(alien);
        moveAliens(alien)
    }
}

function moveAlienleft() {
    for (var i = gAliens.length - 1; i >= 0; i--) {
        const alien = gAliens[i]
        // console.log(alien);
        moveAliens(alien)
    }
}


function moveAliens(alien) {

    const nextLocation = {
        i: alien.location.i + gMoveDiff.i,
        j: alien.location.j + gMoveDiff.j
    }

    handleAlienHit(nextLocation)
    // if (gIsWall) return
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    var before = nextCell.gameObject === ALIEN ? ALIEN : null

    // moving from current location:
    // update MODAL
    var currCell = gBoard[alien.location.i][alien.location.j]

    currCell.gameObject = before

    // update DOM
    renderCell(alien.location, before)


    // Move to new location:
    alien.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j].gameObject = ALIEN
    renderCell(alien.location, ALIEN)
}
function handleAlienHit(pos) {
    if (pos.j === BOARD_SIZE) {
        shiftBoardLeft()

    } else if (pos.j === -1) {
        shiftBoardRight()
    }

}
function shiftBoardRight() {
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
    cleanAliens()
    createAliens(gBoard, gAliensBottomRowIdx, gAliensTopRowIdx, 0, ALIEN_ROW_LENGTH - 1)
    console.log('clear');
    clearInterval(gIntervalAliens)
    renderBoard(gBoard)

    gMoveDiff = { i: 0, j: 1 }
    gIntervalAliens = setInterval(moveAlien, ALIEN_SPEED)
}

function shiftBoardLeft() {
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
    shiftBoardDown()
    clearInterval(gIntervalAliens)
    renderBoard(gBoard)

    gMoveDiff = { i: 0, j: -1 }
    gIntervalAliens = setInterval(moveAlienleft, ALIEN_SPEED)
}

function shiftBoardDown() {
    cleanAliens()
    createAliens(gBoard, gAliensBottomRowIdx, gAliensTopRowIdx, 6, 13)
}