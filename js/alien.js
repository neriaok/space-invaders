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

var gRock
var ROCK = '⚓'
var ROCK_SPEED = 500


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

            renderCell(alien.location, getAlienHTML(alien))

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
    gRock = {
        pos: {
            i: getRandomInt(0,10),
            j: gAliensTopRowIdx
        }
    }
    if (nextLocation.i === gRock.pos.i && nextLocation.j === gRock.pos.i) {

        console.log(gRock);
        shootRock(gRock)
    }
     
    if (nextLocation.i === BOARD_SIZE - 2 || gHero.lives === 0) {
        updateLives()
        gGame.isOn = false
        gameOver()
        showBtn()
        return
    }

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if(nextCell === HERO){
        gHero.lives--
        updateLives()
     }

    handleAlienHit(nextLocation)

    // if (gIsWall) return
    var before = nextCell.gameObject === ALIEN ? getAlienHTML(alien): null



    // moving from current location:
    // update MODAL
    var currCell = gBoard[alien.location.i][alien.location.j]

    currCell.gameObject = before

    // update DOM
    renderCell(alien.location, before)


    // Move to new location:
    alien.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j].gameObject = ALIEN
    renderCell(alien.location, getAlienHTML(alien))
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
    shiftBoardDown(ALIEN_ROW_LENGTH - diffLevel, BOARD_SIZE - 1)
    clearInterval(gIntervalAliens)
    // renderBoard(gBoard)

    gMoveDiff = { i: 0, j: -1 }
    gIntervalAliens = setInterval(moveAlienleft, ALIEN_SPEED)
}

function shiftBoardDown(fromJ, toJ) {
    cleanAliens()
    createAliensTWO(gBoard, gAliensBottomRowIdx, gAliensTopRowIdx, fromJ, toJ)
}

function shootRock(rock) {
    rock.pos.i+=2
    gBoard[rock.pos.i][rock.pos.j].gameObject = ROCK
    renderCell(rock.pos, ROCK)

    setTimeout(() => {
        blinkRock(rock)
    }, ROCK_SPEED);

}

function blinkRock(rock) {

    gBoard[rock.pos.i][rock.pos.j].gameObject = null
    renderCell(rock.pos, EMPTY)
    // NEXT LOCATION: 
    rock.pos.i++
    rock.pos.j

    if (rock.pos.i !== BOARD_SIZE-1) {
        var nextCell = gBoard[rock.pos.i][rock.pos.j]

         if(nextCell === HERO){
            if(gHero.lives === 0){
                gGame.isOn = false
                gameOver()
                showBtn()
                return
            }
            gHero.lives--
            updateLives()
            return
         }


        shootRock(rock)
}
}

function getAlienHTML(alien) {
    var color = getRandomColor()
    return `<span class = "alien" style="background-color: ${color}" >${ALIEN}</span>`

}