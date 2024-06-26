
var LASER_SPEED = 80

var gHero
var glazer

var gCandieInterval


function createHero(board) {
    gHero = {
        pos: { i: 12, j: 6 },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
}
// Move the hero right (1) or left (-1) 
function moveHero(ev) {
    if (!gGame.isOn) return

    const nextLocation = onKeyDown(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]


    if (nextCell.type === WALL) return


    //moving from current location:

    //update MODAL
    gBoard[gHero.pos.i][gHero.pos.j] = EMPTY
    //update DOM
    renderCell(gHero.pos, EMPTY)

    // Move the spaceship to new location:

    //update MODAL
    gHero.pos = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = HERO
    // update DOM
    renderCell(nextLocation, HERO)
}

function onKeyDown(eventKeyboard) {
    // console.log(eventKeyboard);

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }

    switch (eventKeyboard) {
        case 'x':
            console.log('supermode');
            superMode()
            break;
        case 'n':
            checkAlienNeigh(gHero.pos.i, gHero.pos.j)
            break;
        case ' ':
            if (gHero.isShoot) break
            glazer.pos.i = gHero.pos.i - 1
            glazer.pos.j = gHero.pos.j
            shoot(glazer)

            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

    }
    return nextLocation
}

function shoot(lazer) {

    gHero.isShoot = true
    gBoard[lazer.pos.i][lazer.pos.j].gameObject = LASER
    renderCell(lazer.pos, LASER)

    setTimeout(() => {
        blinkLaser(lazer)
    }, LASER_SPEED);
}

function superMode() {
    if (glazer.superModeCount === 0) return
    glazer.superModeCount--
    updateSuper()
  
    LASER_SPEED = 40
    LASER = '💥'

    setTimeout(() => {
        LASER_SPEED = 80
        LASER = '⚡'
    }, 5000);
}
// renders a LASER at specific cell for short time and removes it 
function blinkLaser(lazer) {

    gBoard[lazer.pos.i][lazer.pos.j].gameObject = null
    renderCell(lazer.pos, EMPTY)
    // NEXT LOCATION: 
    lazer.pos.i--

    if (lazer.pos.i !== -1) {
        var nextCell = gBoard[lazer.pos.i][lazer.pos.j]

        // console.log(nextCell);
        if (nextCell.gameObject === CANDIE) {
            glazer.KillScore += 50
            updateScore()
            clearInterval(gIntervalAliens)
            setTimeout(() => {
                gIntervalAliens = setInterval(moveAlien, ALIEN_SPEED)
            }, 5000);
        }

        if (nextCell.gameObject === ALIEN) {
            killAlien(lazer)
            glazer.KillScore += 10

            updateScore()

            if (!gAliens.length) {
                gGame.isOn = false
                isVictory()
                showBtn()
                return
            }
            gHero.isShoot = false
            return
        }

        shoot(lazer)

    } else {
        gHero.isShoot = false
        return
    }
}

function killAlien(object) {
    for (var i = 0; i < gAliens.length; i++) {
        var alien = gAliens[i]
        // console.log(alien);
        if (alien.location.i === object.pos.i && alien.location.j === object.pos.j) {
            gAliens.splice(i, 1)
            gTheGrave.push(alien)
            // kill alien in the MODAL & DOM
            gBoard[object.pos.i][object.pos.j].gameObject = null
            renderCell(object.pos, EMPTY)
        }
    }
}

function checkAlienNeigh(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            const currCell = gBoard[i][j];
            if (currCell.gameObject === ALIEN) {
                var currAlien = {
                    pos: {
                        i: i,
                        j: j
                    }
                }
                killAlien(currAlien)
                return
            }
        }
    }
    console.log('no alien around you!');
    updateSpan()
}
function updateScore() {
    var score = document.querySelector('.score span')
    score.innerText = glazer.KillScore
}

function updateSuper(){
    var elSuper = document.querySelector('.super span')
    elSuper.innerText = ' ' + glazer.superModeCount
    elSuper.style.color = 'red'
}

function updateSpan(){
    var elmsg = document.querySelector('.neighbers span')
    console.log(elmsg);
    elmsg.innerText = 'NO ALIENS AROUND YOU'
    elmsg.style.color = 'red'

    setTimeout(() => {
        elmsg.innerText = 'press n'
    }, 1000);
}
