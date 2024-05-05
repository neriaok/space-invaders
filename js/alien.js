const ALIEN_SPEED = 500
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3


var gAliens

var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIntervalAliens
var gIsAlienFreeze = false


function createAliens(board) {
    gAliens = []
    for (var i = ALIEN_ROW_COUNT - 1; i >= 0; i--) {
        for (var j = ALIEN_ROW_LENGTH - 1; j >= 0; j--) {
            
            var alien = {
                location: {
                    i: i,
                    j: j
                }
            }
            gAliens.push(alien)
            board[alien.location.i][alien.location.j].gameObject = ALIEN
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

function moveAliens(alien) {

    const moveDiff = { i: 0, j: 1 }
    const nextLocation = {
        i: alien.location.i + moveDiff.i,
        j: alien.location.j + moveDiff.j
    }
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
