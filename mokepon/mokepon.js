const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const resultadoMensaje = document.getElementById('resultado')
const ataqueJugadorMensaje = document.getElementById('ataque-jugador')
const ataqueEnemigoMensaje = document.getElementById('ataque-enemigo')

const sectionMensajes = document.getElementById('resultado')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opccionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, imagen, vida) {
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', '/assets/hipodoge.png', 5)

let capipepo = new Mokepon('Capipepo', '/assets/capipepo.png', 5)

let ratigueya = new Mokepon('Ratigueya', '/assets/ratigueya.png', 5)

hipodoge.ataques.push(
    { nombre: '/assets/soltar.png', id: 'boton-agua' },
    { nombre: '/assets/soltar.png', id: 'boton-agua' },
    { nombre: '/assets/soltar.png', id: 'boton-agua' },
    { nombre: '/assets/fuego.png', id: 'boton-fuego' },
    { nombre: '/assets/planta.png', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '/assets/planta.png', id: 'boton-tierra' },
    { nombre: '/assets/planta.png', id: 'boton-tierra' },
    { nombre: '/assets/planta.png', id: 'boton-tierra' },
    { nombre: '/assets/soltar.png', id: 'boton-agua' },
    { nombre: '/assets/fuego.png', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '/assets/fuego.png', id: 'boton-fuego' },
    { nombre: '/assets/fuego.png', id: 'boton-fuego' },
    { nombre: '/assets/fuego.png', id: 'boton-fuego' },
    { nombre: '/assets/soltar.png', id: 'boton-agua' },
    { nombre: '/assets/planta.png', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opccionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label class="tarjeta-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.imagen}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opccionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    sectionReiniciar.style.display = 'none'

    botonMascota.addEventListener('click', seleccionarMascotaJugador)

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)

    botonReiniciar.addEventListener('click', reiniciar)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3)

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego() {
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fuego'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Agua'
    } else {
        ataqueEnemigo = 'Tierra'
    }

    combate()
}

function combate() {

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje('Empate')
    } else if (ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') {
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua') {
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('Perdiste')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('Ganaste!!!')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Perdiste :(')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    resultadoMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    
    ataqueJugadorMensaje.appendChild(nuevoAtaqueJugador)
    ataqueEnemigoMensaje.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}

function reiniciar() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)