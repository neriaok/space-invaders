'use strict'

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}

function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}
// Returns the class name for a specific cell
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
// found elCell by i & j // 
//if there are conditiones in render board between the "<td>" like in mainspeeper so:

// var className = currCell.isShown ? `mark` : ' '
//             strHTML += `<td class="${className}"`

//from ex-pacmen-game.js:

// const className = `cell cell-${i}-${j}`

// strHTML += `<td class="${className}">${cell}</td>`

// function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
// }

// // or
// /// from ex-chess:
// const tdId = `cell-${i}-${j}`
// strHtml += `<td id="${tdId}"></td`

// function getSelector(coord) {
//     return `#cell-${coord.i}-${coord.j}`
// }

// function markCells(coords) {
//     // console.log('coords:', coords)
//     // DONE: query select them one by one and add mark 
//     for (var i = 0; i < coords.length; i++) {
//         const coord = coords[i]
//         const selector = getSelector(coord)
//         const elCell = document.querySelector(selector)
//         elCell.classList.add('mark')
//     }
// }
// //or
// // from ex-ballboard:

// strHTML += `<td data-i=${i} data-j=${j}></td`

// function renderCell(cellI, cellJ, val) {
//     const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
//     elCell.innerText = val
//     return elCell
// }
///////////////////////////


 // if (elBox.classList.contains('nice-box')) {
            //     elBox.classList.remove('nice-box')
            // } else {
            //     elBox.classList.add('nice-box')
            // }
            // THE SAME
            // elBox.classList.toggle('nice-box')
//////////////////////////////////////////
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
'use strict'
// for update the Dom
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}
// Returns the class name for a specific cell
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}
/////// id cell to object///////////
function getCellCoord(strCellId) { 
    const coord = {}
    const parts = strCellId.split('-')
    // console.log('parts:', parts)
    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord
}
////get object location and return str for dom////
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}
///////////////////////////////////
function sumCol(mat, colIdx) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
      const col = mat[i][colIdx]
      //    console.log(col);
      sum += col
    }
    return sum
  }
  
  function sumRow(mat, rowIdx) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
      const row = mat[rowIdx][i]
      sum += row
    }
    return sum
  }
  
  function sumPrimeryDiagonal(mat) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
      sum += mat[i][i]
    }
      return sum
  
  }
  
  function sumSeconderyDiagonal(mat){
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
      sum += mat[i][mat.length - 1 - i]
    }
      return sum
  
  }
///////////////////////////////////////////  
function printMultTable(){
    const cols = 10
    const rows = 10
    const board = []
    for (var i  = 0 ; i < rows ; i++){
        board[i] = []
        for (var j = 0 ; j < cols ; j++){
            board[i][j] = (i+1) * (j+1) // this create multtable specific
        }
    }
    console.table(board);
}
function findMaxInMat(mat){
    var max = -Infinity
    for (var i  = 0 ; i < mat.length ; i++){
        // const row = mat[i]
        for (var j = 0 ; j < mat[0].length ; j++){
            const num = mat[i][j]
            if(num > max) max = num
        }
    }
    return max
}

////////////////////////////////////////////////////////
function getAnswer(ask) {
    var answer = prompt(ask)
    return answer
}
/////////////////// make player /////////////////////////
//var gNextId = 101
//var gPlayers = createPlayers() 
function createPlayer(name) {
    return {
        id: gNextId++,//global var
        name: name,
        score: getRandomInt(0, 101)

    }
}
function createPlayers() {
    var player1 = createPlayer('neria')
    var player2 = createPlayer('hadar')
    var player3 = createPlayer('sol')

    return [player1, player2, player3]
}
function getPlayerById(playerId) {
    for (var i = 0; i < gPlayers.length; i++) {
        var player = gPlayers[i]
        if (player.id === playerId) return player
    }
    return null // if the id dont exist===out from the loop return null.
}
function findBestPlayer(){
    var bestPlayer = null // null because sometimes we dont have access to the first.
    // null because its empty *object*.if we will put bestplayer= 0 or else its can be object. 
    for ( var i = 0 ; i < gPlayers.length ; i++){
        var player = gPlayers[i]
        if(!bestPlayer||player.score > bestPlayer.score)//.score because bestplayer is object in meanetime is null
        //||bestplayer because null is false and without this we will accept error.
         bestPlayer = player
    } 
    return bestPlayer

}
function findBestPlayers(){
    var bestplayers = []
    var bestScore = -Infinity
    for (var i = 0 ; i < gPlayers.length ; i++){
        var player = gPlayers[i]
        if(player.score > bestScore){
            bestplayers = [player]
            bestScore = player.score
        } else if (player.score === bestScore){
            bestplayers.push(player)
        }
        return bestplayers
        

        }
    }

//////////////////////////////////////////////////////
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

// function countFoodAround(board, rowIdx, colIdx) {
// var foodCount = 0
// for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
// if (i < 0 || i >= board.length) continue
// for (var j = colIdx - 1; j <= colIdx + 1; j++) {
// if (i === rowIdx && j === colIdx) continue
// if (j < 0 || j >= board[0].length) continue
// var currCell = board[i][j]
// if (currCell === FOOD) foodCount++
// }
// }
// return foodCount
// }

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getEmptyCell(board) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; i++) {
            if (currCell.type === FLOOR && currCell.gameElement === null)
                emptyCells.push({ i, j })
        }
    }
    if (!emptyCells.length) return null

    const randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]

}
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}
// Returns the class name for a specific cell
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}
//////////////////one way////////////////////////////////////////
var gNums = [1, 2, 3, 4, 5, 6, 7]
// console.log('gNums', gNums)
// shuffle(gNums)
// console.log('gNums', gNums)


// var num = drawNum();
// console.log('num:', num);
// console.log('gNums:', gNums);

// num = drawNum();


// function drawNum() {
//     return gNums.pop()
// }

// function shuffle(items) {
//     for (var i = items.length - 1; i > 0; i--) {
//         var randIdx = getRandomInt(0, i + 1);
//         var keep = items[i];
//         items[i] = items[randIdx];
//         items[randIdx] = keep;
//     }
//     return items;
// }


//////////////// better way except shuffle : ///////////////////////////////////////////////////////////////

// var gNums2 = [1, 2, 3, 4, 5, 6, 7]
// console.log('gNums2', gNums2)

// var num = drawNum2()
// console.log('num', num)
// console.log('gNums2', gNums2)

// num = drawNum2()
// console.log('num', num)
// console.log('gNums2', gNums2)

// function drawNum2() {
//     var randIdx = getRandomInt(0, gNums2.length)
//     var num = gNums2[randIdx]
//     gNums2.splice(randIdx, 1)
//     return num
// }

// function resetNums() {
//     gNums2 = []
//     for (var i = 1; i < 100; i++) {
//         gNums2.push(i)
//     }
// }


// var board = [
//     [{ val: 13, isHit: true }, { val: 66, isHit: false }],
//     [{ val: 1, isHit: false }, { val: 6, isHit: false }]
// ]

// console.table(board)


/////////////////////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
