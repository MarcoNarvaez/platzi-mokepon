const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton-mascota')
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
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueEnemigo = []
let ataquesJugador = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')

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
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌿', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌿', id: 'boton-tierra' },
    { nombre: '🌿', id: 'boton-tierra' },
    { nombre: '🌿', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌿', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label class="tarjeta-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.imagen}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    sectionReiniciar.style.display = 'none'

    botonMascota.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciar)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    //sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    let imagenCapipepo = new Image()
    imagenCapipepo = capipepo.imagen
    lienzo.drawImage(
        imagenCapipepo,
        20,
        40,
        100,
        100
    )

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-fuego')
    botonTierra = document.getElementById('boton-fuego')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataquesJugador.push('FUEGO')
                console.log(ataquesJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataquesJugador.push('AGUA')
                console.log(ataquesJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataquesJugador.push('TIERRA')
                console.log(ataquesJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaques()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo);
    iniciarPelea()
}

function iniciarPelea() {
    if (ataquesJugador.length == 5) {
        combate()
    }    
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let i = 0; i< ataquesJugador.length; i++) {
        if (ataquesJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje('Empate')
        } else if (ataquesJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA') {
            indexAmbosOponentes(i, i)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataquesJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO') {
            indexAmbosOponentes(i, i)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataquesJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA') {
            indexAmbosOponentes(i, i)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Empate!')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Ganaste!')
    } else {
        crearMensajeFinal('Perdiste!')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    resultadoMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataqueJugadorMensaje.appendChild(nuevoAtaqueJugador)
    ataqueEnemigoMensaje.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciar() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)