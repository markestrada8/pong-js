const ball = document.querySelector('.ball')
const leftBumper = document.querySelector('.left-bumper')
const rightBumper = document.querySelector('.right-bumper')

const playButton = document.querySelector('.play-button')

const displayScore = (leftScore, rightScore) => {
  const oldLeftScore = document.querySelector('.score-left')
  const oldRightScore = document.querySelector('.score-right')
  const leftScoreP = document.createElement('p')
  const rightScoreP = document.createElement('p')
  leftScoreP.classList.add('score-left')
  rightScoreP.classList.add('score-right')
  const leftScoreText = document.createTextNode(`Left: ${leftScore}`)
  const rightScoreText = document.createTextNode(`Right: ${rightScore}`)
  leftScoreP.appendChild(leftScoreText)
  rightScoreP.appendChild(rightScoreText)
  const scoreElement = document.querySelector('.score')
  scoreElement.replaceChild(leftScoreP, oldLeftScore)
  scoreElement.replaceChild(rightScoreP, oldRightScore)
}

let rightBumperYMin = 50
let leftBumperYMin = 50
let rightBumperYMax = rightBumperYMin + 140
let leftBumperYMax = leftBumperYMin + 140
rightBumper.style.bottom = `${rightBumperYMin}px`
leftBumper.style.bottom = `${leftBumperYMin}px`

let leftScore = 0
let rightScore = 0

let xPosition = 0
let yPosition = 0

document.addEventListener('keydown', function (event) {

  console.log(leftBumperYMin, leftBumper.style.bottom, rightBumperYMin, rightBumper.style.bottom)
  console.log(leftBumperYMax, rightBumperYMax)
  if (event.key === 'ArrowUp') {
    rightBumperYMin += 8
    rightBumperYMax = rightBumperYMin + 140
    rightBumper.style.bottom = `${rightBumperYMin}px`
  }
  if (event.key === 'ArrowDown') {
    rightBumperYMin -= 8
    rightBumperYMax = rightBumperYMin + 140
    rightBumper.style.bottom = `${rightBumperYMin}px`
  }
  if (event.key === 'w') {
    leftBumperYMin += 8
    leftBumperYMax = leftBumperYMin + 140
    leftBumper.style.bottom = `${leftBumperYMin}px`
  }
  if (event.key === 's') {
    leftBumperYMin -= 8
    leftBumperYMax = leftBumperYMin + 140
    leftBumper.style.bottom = `${leftBumperYMin}px`
  }
})

let gameOn = false

playButton.addEventListener('click', () => {
  gameOn = !gameOn
  console.log(gameOn)

  let xReverse = false
  let yReverse = false

  const run = setInterval(() => {

    if (xReverse) {
      ball.style.left = `${xPosition}px`
      xPosition--
      if (xPosition === 70) {
        console.log('Left position: ', yPosition, leftBumperYMin, leftBumperYMax)
        if (yPosition + 13 >= leftBumperYMin && yPosition + 13 <= leftBumperYMax) {
          xReverse = false
        }

      }
      if (xPosition < 0) {
        xReverse = false
        rightScore++
        displayScore(leftScore, rightScore)

      }
    } else {
      ball.style.left = `${xPosition}px`
      xPosition++
      if (xPosition > (window.innerWidth - 96)) {
        if ((yPosition + 13 > rightBumperYMin) && (yPosition + 13 < rightBumperYMax)) {
          xReverse = true
        }
      }
      if (xPosition > window.innerWidth - 26) {
        xReverse = true
        leftScore++
        displayScore(leftScore, rightScore)
      }
    }
    if (yReverse) {
      ball.style.bottom = `${yPosition}px`
      yPosition--
      if (yPosition === 0) {
        yReverse = false
      }
    } else {
      ball.style.bottom = `${yPosition}px`
      yPosition++
      if (yPosition === window.innerHeight - 26) {
        yReverse = true
      }
    }

  }, 10)

})



