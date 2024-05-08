var ALIEN_SPEED = 500
var ALIEN_ROW_LENGTH = 8
var ALIEN_ROW_COUNT = 3
var diffLevel = 2


var gMoveDiff


var gAliens
var gNextId
var gIsWall

var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIntervalAliens
var gTheGrave



function createAliens(board) {
    gAliens = []
    for (var i = ALIEN_ROW_COUNT - 1; i >= 0; i--) {
        for (var j = ALIEN_ROW_LENGTH - 1; j >= 0; j--) {

            var alien = {
                location: {
                    id: gNextId++,
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

function createAliensTWO(board, fromI, toI, fromJ, toJ) {
    gNextId = 101
    gAliens = []
    for (var i = toI; i >= fromI; i--) {
        for (var j = toJ; j >= fromJ; j--) {

            var alien = {
                id: gNextId++,
                location: {
                    i: i,
                    j: j
                }
            }
            gAliens.push(alien)
            board[alien.location.i][alien.location.j].gameObject = ALIEN

            renderCell(alien.location, ALIEN)

            checkTheGrave(alien)

        }
    }
}

function checkTheGrave(alien) {
    var posI = getAlienById(alien.id, gAliens)
    var posj = getAlienById(alien.id, gTheGrave)

    if (posj !== null) {
        gAliens.splice(posI, 1)
        gTheGrave.push(alien)
        // kill alien in the MODAL & DOM
        gBoard[alien.location.i][alien.location.j].gameObject = null
        renderCell(alien.location, EMPTY)
    }
}


function getAlienById(alienId, array) {
    for (var i = 0; i < array.length; i++) {
        var alien = array[i]
        if (alien.id === alienId) return i
    }
    return null // if the id dont exist===out from the loop return null.
}
function cleanAliens() {
    gIsWall = true
    gAliens = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.gameObject === ALIEN) {
                gBoard[i][j].gameObject = null
                renderCell({ i: i, j: j }, EMPTY)
            }
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
    if (!gGame.isOn) return
    const nextLocation = {
        i: alien.location.i + gMoveDiff.i,
        j: alien.location.j + gMoveDiff.j
    }

    if (nextLocation.i === BOARD_SIZE - 2) {
        gGame.isOn = false
        gameOver()
        showBtn()
        return
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
        gIsWall = true
    } else if (pos.j === -1) {
        shiftBoardRight()
        gIsWall = true
    } else
    gIsWall = false
}
function shiftBoardRight() {
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
    shiftBoardDown(0, ALIEN_ROW_LENGTH - 1)
    console.log('clear');
    clearInterval(gIntervalAliens)
    // renderBoard(gBoard)

    gMoveDiff = { i: 0, j: 1 }
    gIntervalAliens = setInterval(moveAlien, ALIEN_SPEED)
}

function shiftBoardLeft() {
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
    shiftBoardDown(ALIEN_ROW_LENGTH - diffLevel, BOARD_SIZE-1)
    clearInterval(gIntervalAliens)
    // renderBoard(gBoard)

    gMoveDiff = { i: 0, j: -1 }
    gIntervalAliens = setInterval(moveAlienleft, ALIEN_SPEED)
}

function shiftBoardDown(fromJ, toJ) {
    cleanAliens()
    createAliensTWO(gBoard, gAliensBottomRowIdx, gAliensTopRowIdx, fromJ, toJ)
}
function getAlienHTML(alien) {
    var color = alien.color
    return `<span class = "alien" style="background-color: ${color}" >${ALIEN}</span>`
    
}