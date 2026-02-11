/* =====================================================
   📌 ELEMENTOS
===================================================== */

const startScreen = document.getElementById('startScreen')
const questionScreen = document.getElementById('questionScreen')
const finalScreen = document.getElementById('finalScreen')

const card = document.getElementById('card')
const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')
const music = document.getElementById('bgMusic')

const buttonsContainer = document.querySelector('.buttons')

let noActive = false // Se activa después de mostrar la pregunta

/* =====================================================
   🎵 INICIO EXPERIENCIA
===================================================== */

card.addEventListener('click', () => {
  music.play().catch(() => {})

  startScreen.classList.add('hidden')

  setTimeout(() => {
    questionScreen.classList.remove('hidden')

    setTimeout(() => {
      noActive = true
    }, 600)
  }, 600)
})

/* =====================================================
   😈 BOTÓN NO - MODO IMPOSIBLE
===================================================== */

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function moveRandomInsideContainer() {
  const containerRect = buttonsContainer.getBoundingClientRect()
  const rect = noBtn.getBoundingClientRect()

  const maxX = containerRect.width - rect.width
  const maxY = containerRect.height - rect.height

  const randomX = Math.random() * maxX
  const randomY = Math.random() * maxY

  noBtn.style.left = randomX + 'px'
  noBtn.style.top = randomY + 'px'
}

function escapeFromMouse(mouseX, mouseY) {
  const containerRect = buttonsContainer.getBoundingClientRect()
  const rect = noBtn.getBoundingClientRect()

  const btnCenterX = rect.left + rect.width / 2
  const btnCenterY = rect.top + rect.height / 2

  const distance = getDistance(mouseX, mouseY, btnCenterX, btnCenterY)

  if (distance < 200) {
    const angle = Math.atan2(btnCenterY - mouseY, btnCenterX - mouseX)

    const escapeDistance = 300

    let newX = rect.left + Math.cos(angle) * escapeDistance
    let newY = rect.top + Math.sin(angle) * escapeDistance

    const minX = containerRect.left
    const minY = containerRect.top
    const maxX = containerRect.right - rect.width
    const maxY = containerRect.bottom - rect.height

    newX = Math.max(minX, Math.min(maxX, newX))
    newY = Math.max(minY, Math.min(maxY, newY))

    noBtn.style.left = newX - containerRect.left + 'px'
    noBtn.style.top = newY - containerRect.top + 'px'
  }
}

document.addEventListener('mousemove', (event) => {
  if (!noActive) return
  escapeFromMouse(event.clientX, event.clientY)
})

/* Protección extra si casi lo tocan */
noBtn.addEventListener('mouseenter', () => {
  if (!noActive) return
  moveRandomInsideContainer()
})

/* Protección móvil */
noBtn.addEventListener('touchstart', (e) => {
  if (!noActive) return
  e.preventDefault()
  moveNoSafely()
})

function moveNoSafely() {
  const container = document.querySelector('.buttons')
  const containerRect = container.getBoundingClientRect()
  const yesRect = yesBtn.getBoundingClientRect()

  const btnWidth = noBtn.offsetWidth
  const btnHeight = noBtn.offsetHeight

  let tries = 0
  let newX, newY, newRect

  do {
    newX = Math.random() * (containerRect.width - btnWidth)
    newY = Math.random() * (containerRect.height - btnHeight)

    newRect = {
      left: containerRect.left + newX,
      right: containerRect.left + newX + btnWidth,
      top: containerRect.top + newY,
      bottom: containerRect.top + newY + btnHeight,
    }

    tries++
  } while (isOverlapping(newRect, yesRect) && tries < 50)

  noBtn.style.left = newX + 'px'
  noBtn.style.top = newY + 'px'
}

/* =====================================================
   💖 BOTÓN SÍ - FINAL ANIMADO
===================================================== */

yesBtn.addEventListener('click', () => {
  questionScreen.classList.add('hidden')

  setTimeout(() => {
    finalScreen.classList.remove('hidden')

    /* 🎵 Cambiar música */
    music.pause()
    music.src = 'assets/music/final.mp3'
    music.currentTime = 0
    music.play().catch(() => {})

    /* 🎬 Cambiar fondo a gif */
    document.body.style.backgroundImage = "url('assets/pixel/oiia.gif')"
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundRepeat = 'no-repeat'

    createHearts()
  }, 600)
})

/* =====================================================
   💗 CORAZONES
===================================================== */

function createHearts() {
  setInterval(() => {
    const heart = document.createElement('div')
    heart.classList.add('heart')
    heart.innerText = '💖✨💗🌸💞✨'

    heart.style.left = Math.random() * window.innerWidth + 'px'
    heart.style.top = '100%'

    document.body.appendChild(heart)

    setTimeout(() => {
      heart.remove()
    }, 3000)
  }, 300)
}

function isOverlapping(rect1, rect2) {
  return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)
}

/* =====================================================
   🧠 CONSOLA DIVERTIDA
===================================================== */

console.log('%c¿Intentando hackear el destino? 😼', 'color: hotpink; font-size: 18px;')
console.log("%cEl botón 'NO' está protegido por magia ancestral ✨", 'color: red; font-size: 14px;')
console.log("%cRíndete y dale al 'SI' 💖", 'color: purple; font-size: 14px;')
