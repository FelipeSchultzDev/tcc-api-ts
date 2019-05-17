
let Reset = '\x1b[0m' // Precisa sempre estrar no final das cores
// let Bright = '\x1b[1m' // Aumenta o brilho da letra
// let Underscore = '\x1b[4m' // Sublinhado
// let Reverse = '\x1b[7m' // Reverte o fundo e a letra

let Foreground = [
  ['BLACK', '\x1b[30m'],
  ['RED', '\x1b[31m'],
  ['GREEN', '\x1b[32m'],
  ['YELLOW', '\x1b[33m'],
  ['BLUE', '\x1b[34m'],
  ['PURPLE', '\x1b[35m'],
  ['CYAN', '\x1b[36m'],
  ['WHITE', '\x1b[37m'],
  ['', '']
]
let Background = [
  ['BLACK', '\x1b[40m'],
  ['RED', '\x1b[41m'],
  ['GREEN', '\x1b[42m'],
  ['YELLOW', '\x1b[43m'],
  ['BLUE', '\x1b[44m'],
  ['PURPLE', '\x1b[45m'],
  ['CYAN', '\x1b[46m'],
  ['WHITE', '\x1b[47m'],
  ['', '']
]

function setForeground (color) {
  for (let i = 0; i < Foreground.length; i++) {
    if (Foreground[i][0] === color.toUpperCase()) {
      return i
    }
  }
  return 8
}
function setBackground (color) {
  for (let i = 0; i < Background.length; i++) {
    if (Background[i][0] === color.toUpperCase()) {
      return i
    }
  }
  return 8
}
let ColorCMD = function (fg, bg, msg) {
  let FG = setForeground(fg)
  let BG = setBackground(bg)

  console.log(`${Foreground[FG][1]}${Background[BG][1]}%s${Reset}`, msg)
}

module.exports = ColorCMD
