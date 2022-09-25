const btnIniciar = document.getElementById("btn-iniciar");
const containerPregunta = document.getElementById("container-pregunta");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnSiguiente = document.getElementById("btn-siguiente");
const txtPregunta = document.getElementById("txt-pregunta");
const containerRespuestas=document.getElementById("container-respuestas");
const arrRespuestas=containerRespuestas.getElementsByClassName("res")
const respuesta1 = document.getElementById("res1")
const respuesta2 = document.getElementById("res2")
const respuesta3 = document.getElementById("res3")
const respuesta4 = document.getElementById("res4")
const botonesCategorias = document.getElementById("botones-categorias")
const btnCulturaGeneral = document.getElementById("btn-cultura-general")
const btnProgramacion = document.getElementById("btn-programacion")
const btnMultimedia = document.getElementById("btn-multimedia")
const elementoContador=document.getElementById("timer")
let indicePreguntaActual;
let puntaje = 0
const elementoPuntaje = document.createElement("h1")
console.log(arrRespuestas)
btnIniciar.addEventListener("click", iniciar);
btnReiniciar.addEventListener("click",reiniciar);
btnSiguiente.addEventListener("click", ()=>{
    indicePreguntaActual++
    reset()
    mostrarPregunta()
    detenerTiempo()
    iniciarTiempo(15)
})
Array.from(botonesCategorias.children).forEach(categoria =>{
  categoria.addEventListener("click", (e)=>{
   if (e.target==btnCulturaGeneral) {
    iniciarCulturaGeneral()
    console.log("ciclo basico")
   }
   if (e.target==btnProgramacion) {
    iniciarProgramacion()
    console.log("programacion")
   }
   if (e.target==btnMultimedia) {
    iniciarMultimedia()
    console.log("multimedia")
   }
  })
})
function iniciar(){
    btnIniciar.classList.add("ocultar")
    btnCulturaGeneral.classList.remove("ocultar")
    btnProgramacion.classList.remove("ocultar")
    btnMultimedia.classList.remove("ocultar")
}
function iniciarCulturaGeneral(){
    indicePreguntaActual=0;
    preguntas=preguntasCulturaGeneral
    containerPregunta.classList.remove("ocultar");
    detenerTiempo()
    iniciarTiempo(15)
    mostrarPregunta()
    ocultarCategorias()
    ocultarPuntaje()    
    desocultar()
}
function iniciarProgramacion(){
    indicePreguntaActual=0;
    preguntas=preguntasProgramacion
    containerPregunta.classList.remove("ocultar");
    detenerTiempo()
    iniciarTiempo(15)
    mostrarPregunta()
    ocultarCategorias()
    ocultarPuntaje()    
    desocultar()
}
function iniciarMultimedia(){
    indicePreguntaActual=0;
    preguntas=preguntasMultimedia
    containerPregunta.classList.remove("ocultar");
    detenerTiempo()
    iniciarTiempo(15)
    mostrarPregunta()
    ocultarCategorias()
    ocultarPuntaje()    
    desocultar()
}
function desocultar(){
  btnReiniciar.classList.remove("ocultar");
}
function ocultarCategorias() {
  btnCulturaGeneral.classList.add("ocultar")
  btnProgramacion.classList.add("ocultar")
  btnMultimedia.classList.add("ocultar")
}
function reiniciar(){
    btnIniciar.classList.remove("ocultar");
    containerPregunta.classList.add("ocultar");
    btnReiniciar.classList.add("ocultar");
    btnSiguiente.classList.add("ocultar");
    btnCulturaGeneral.classList.add("ocultar")
    btnProgramacion.classList.add("ocultar")
    btnMultimedia.classList.add("ocultar")
    detenerTiempo
   reset()
   ocultarPuntaje()
}

function mostrarPregunta(){
  reset()
    txtPregunta.innerHTML=preguntas[indicePreguntaActual].pregunta;
    preguntas[indicePreguntaActual].respuestas.forEach(respuesta => {
      const boton=document.createElement("button")
      boton.innerText=respuesta.texto
      boton.classList.add("res")
      
      if(respuesta.correcto){
        boton.dataset.correcto=respuesta.correcto
        
      }
     boton.addEventListener("click",seleccionarRespuesta)
      containerRespuestas.appendChild(boton)
    });
    
}
function reset(){
  btnSiguiente.classList.add("ocultar")
  while(containerRespuestas.firstChild){
    containerRespuestas.removeChild(containerRespuestas.firstChild)
  }
}
function seleccionarRespuesta(e){
  const respuestaSeleccionada = e.target
  const correcto=respuestaSeleccionada.dataset.correcto
  Array.from(containerRespuestas.children).forEach(btn=>{
    cambiarColor(btn, btn.dataset.correcto)
    btn.disabled= true;
  })
  
  if(correcto){
    puntaje++
  }
  if(preguntas.length>indicePreguntaActual+1){
    btnSiguiente.classList.remove("ocultar")
  } else{
    btnReiniciar.classList.remove("ocultar")
    mostrarPuntaje()
  }
  detenerTiempo()
}
function cambiarColor(elemento, correcto){
  borrarColor(elemento)
  if (correcto){
    elemento.classList.add("correcto")
  } else{
    elemento.classList.add("incorrecto")
  }
}

function borrarColor(elemento){
  elemento.classList.remove("correcto")
  elemento.classList.remove("incorrecto")
}
let contador
function iniciarTiempo(tiempo){
  contador=setInterval(timer, 1000)
  function timer(){
    elementoContador.innerHTML=tiempo
    tiempo--
    if(tiempo<0){
      clearInterval(contador)
      elementoContador.innerHTML="15"
      mostrarPuntaje()
      Array.from(containerRespuestas.children).forEach(btn=>{
        cambiarColor(btn, btn.dataset.correcto)
        btn.disabled= true;
      })
    }
  }
}
function detenerTiempo(){
  clearInterval(contador)
}

function mostrarPuntaje(){
  elementoPuntaje.innerHTML = `Puntaje: ${puntaje}`
  elementoPuntaje.classList.remove("ocultar")
    containerPregunta.appendChild(elementoPuntaje)
}

function ocultarPuntaje(){
  puntaje=0
  elementoPuntaje.classList.add("ocultar")
}

let preguntas = []

 const preguntasCulturaGeneral = [
     {
       pregunta: '¿Cuánto es 2+2?',
       respuestas: [
         { texto: '4', correcto: true },
         { texto: '22', correcto: false },
         { texto:'5', correcto:false },
         { texto:'5', correcto:false },
       ]
     },
     {
       pregunta: '¿Cuántos huesos tiene el cuerpo humano?',
       respuestas: [
         { texto: '210', correcto: false },
         { texto: '198', correcto: false },
         { texto: '206', correcto: true },
         { texto: '6', correcto: false }
       ]
     },
     {
       pregunta: '¿Qué suceso se conmemora en el día 17 de agosto?',
       respuestas: [
         { texto: 'El paso a la inmortalidad del general Don José de San Martín', correcto: true },
         { texto: 'Día de la soberanía nacional', correcto: false },
         { texto: 'Navidad', correcto: false },
         { texto: 'Día de la diversidad cultural', correcto: false }
       ]
     },
     {
       pregunta: '¿Cuántos años tiene un lustro?',
       respuestas: [
         { texto: '25', correcto: false },
         { texto: '100', correcto: false },
         { texto: 'Todos', correcto: false },
         { texto: '5', correcto: true}
       ]
     }
   ]

   const preguntasProgramacion = [
    {
      pregunta: '¿Cómo se representa el número binario 1010 en decimal?',
      respuestas: [
        { texto: '1010', correcto: false },
        { texto: '20', correcto: false },
        { texto:'10', correcto:true },
        { texto:'15', correcto:false }
      ]
    },
    {
      pregunta: '¿Qué significan las siglas "POO"?',
      respuestas: [
        { texto: 'Programación orientada a objetos', correcto: true },
        { texto: 'Protocolo optimizado de operabilidad', correcto: false },
        { texto: 'Paltas orientales ostentosas', correcto: false },
        { texto: 'Programacion orientada a organismos', correcto: false }
      ]
    },
    {
      pregunta: '¿Qué es "Visual Basic"?',
      respuestas: [
        { texto: 'Una empresa de relojes', correcto: false },
        { texto: 'Un lenguaje de programación', correcto: true },
        { texto: 'Una herramienta de tortura', correcto: true },
        { texto: 'Un protocolo de red', correcto: false }
      ]
    },
    {
      pregunta: 'En HTML, ¿Qué etiqueta se utiliza para establecer un enlace a otra página web?',
      respuestas: [
        { texto: 'link', correcto: false },
        { texto: 'enl', correcto: false },
        { texto: 'l', correcto: false},
        { texto: 'a', correcto: true}
      ]
    }
  ]

  const preguntasMultimedia = [
    {
      pregunta: '¿Cuánto es 2+2?',
      respuestas: [
        { texto: '4', correcto: true },
        { texto: '22', correcto: false },
        { texto:'5', correcto:false },
        { texto:'5', correcto:false },
      ]
    },
    {
      pregunta: 'Pregunta 2',
      respuestas: [
        { texto: 'respuesta', correcto: true },
        { texto: 'respuesta', correcto: true },
        { texto: 'respuesta', correcto: true },
        { texto: 'respuesta', correcto: true }
      ]
    },
    {
      pregunta: 'pregunta?',
      respuestas: [
        { texto: 'respuesta', correcto: false },
        { texto: 'respuesta', correcto: true },
        { texto: 'respuesta', correcto: false },
        { texto: 'respuesta', correcto: false }
      ]
    },
    {
      pregunta: 'pregunta',
      respuestas: [
        { texto: 'respuesta', correcto: false },
        { texto: 'respuesta', correcto: true }
      ]
    }
  ]
