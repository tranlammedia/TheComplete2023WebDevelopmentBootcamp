var keys = {
    'w': 'sounds/crash.mp3',
    'a': 'sounds/kick-bass.mp3',
    's': 'sounds/snare.mp3',
    'd': 'sounds/tom-1.mp3',
    'j': 'sounds/tom-2.mp3',
    'k': 'sounds/tom-3.mp3',
    'l': 'sounds/tom-4.mp3',
}
document.addEventListener('keydown', handleClick)
function handleClick(event) {
    pressKey = event.key
    el_clear = document.querySelector('.pressed')
    if (el_clear) {
        console.log(el_clear)
        el_clear.classList.remove('pressed')
    }
    el = document.querySelector('.'+pressKey)
    if (el) {
        list_class = el.classList
        list_class.add('pressed')
        audio = new Audio(keys[pressKey]);
        audio.play();
    }
    el_clear = document.querySelector('.pressed')
    if (el_clear) {
        setTimeout(() => { el.classList.remove('pressed') },100)
        // el_clear.classList.remove('pressed')
    }
    // alert(keys[event.code])
}
function Car(name,type) {
    this.name = name
    this.type = type
}
car1 = new Car('name1','red')