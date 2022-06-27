const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const winning_text = document.querySelector("[data-winning-p]")
const winning = document.querySelector("[data-winning]")
const btn_winning = document.querySelector("[data-winning-btn]")

let isCircleTurn;

const winningCombination =  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]
const startGame = () => {
    isCircleTurn = false;
    
    for(const cell of cellElements) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    }
    setBoardHover()
    winning.classList.remove('show-winning')
}

const checkForWin = (currentPlayer) => {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const endGame = (isDraw) => {
 if(isDraw) {
    winning_text.innerHTML = 'Empate!'
 } else {
    winning_text.innerHTML = isCircleTurn 
    ? 'O Venceu!'
    : 'X venceu'
 }
 winning.classList.add('show-winning')
}
const checkForDraw = () => {
    return[...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const setBoardHover = () => {
    board.classList.remove("circle")
    board.classList.remove("x")

    if(isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}
const swapTurns = () => {
    isCircleTurn = !isCircleTurn
    setBoardHover()
}

const handleClick = (e) => {
    const cell = e.target
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd)

    const isWin = checkForWin(classToAdd)
   
    const isDraw = checkForDraw()

    if(isWin) {
        endGame(false)
    } else if(isDraw) {
        endGame(true)
    } else {
        swapTurns()
    }

    
}
startGame()

btn_winning.addEventListener('click', startGame)