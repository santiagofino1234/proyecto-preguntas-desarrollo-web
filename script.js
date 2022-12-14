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
       pregunta: '??Qui??n dijo "Pienso, luego existo"?',
       respuestas: [
         { texto: 'S??crates', correcto: true },
         { texto: 'Plat??n', correcto: false },
         { texto:'Di??genes', correcto:false },
         { texto:'Descartes', correcto:false },
       ]
     },
     {
       pregunta: '??Cu??ntos huesos tiene el cuerpo humano?',
       respuestas: [
         { texto: '210', correcto: false },
         { texto: '198', correcto: false },
         { texto: '206', correcto: true },
         { texto: '6', correcto: false }
       ]
     },
     {
       pregunta: '??Qu?? suceso se conmemora en el d??a 17 de agosto?',
       respuestas: [
         { texto: 'El paso a la inmortalidad del general Don Jos?? de San Mart??n', correcto: true },
         { texto: 'D??a de la soberan??a nacional', correcto: false },
         { texto: 'Navidad', correcto: false },
         { texto: 'D??a de la diversidad cultural', correcto: false }
       ]
     },
     {
       pregunta: '??Cu??ntos a??os tiene un lustro?',
       respuestas: [
         { texto: '25', correcto: false },
         { texto: '100', correcto: false },
         { texto: 'Todos', correcto: false },
         { texto: '5', correcto: true}
       ]
     },
     {
      pregunta: '??Qui??n pint?? la obra "Guernica"?',
      respuestas: [
        { texto: 'Vincent Van Gogh', correcto: false },
        { texto: 'Pablo Picasso', correcto: true },
        { texto: 'Salvador Dal??', correcto: false },
        { texto: 'Diego Vel??zquez', correcto: false}

      ]
    },
    {
      pregunta: '??Cu??nto tiempo tarda la luz en llegar del Sol a la Tierra?',
      respuestas: [
        { texto: '5 minutos', correcto: false },
        { texto: '1 a??o', correcto: false },
        { texto: '8 minutos', correcto: true},
        { texto: '13.2 segundos', correcto: false }
      ]
    },
    {
      pregunta: '??En qu?? pa??s de ??frica el espa??ol es la lengua oficial?',
      respuestas: [
        { texto: 'Sierra Leona', correcto: false },
        { texto: 'Guinea Ecuatorial', correcto: true },
        { texto: 'Costa de Marfil', correcto: false },
        { texto: 'Marruecos', correcto: false}
      ]
    },
    {
      pregunta: '??Cu??l es la conjugaci??n del verbo "caber" en la primera persona del singular del presente indicativo?',
      respuestas: [
        { texto: 'Yo quepo', correcto: true },
        { texto: 'Nosotros cabemos', correcto: false },
        { texto: 'Yo cabo', correcto: false },
        { texto: 'Nosotros quepemos', correcto: false}
      ]
    },
    {
      pregunta: '??Cu??l es la isla m??s grande del mundo?',
      respuestas: [
        { texto: 'Australia', correcto: false },
        { texto: 'Pap??a Nueva Guinea', correcto: false },
        { texto: 'Gran Malvina', correcto: false },
        { texto: 'Groenlandia', correcto: true}
      ]
    },
    {
      pregunta: '??Cu??les son las partes de una fracci??n?',
      respuestas: [
        { texto: 'N??mero y denominado', correcto: false },
        { texto: 'Superior e inferior', correcto: false },
        { texto: 'El de arriba y el de abajo', correcto: false },
        { texto: 'Numerador y denominador', correcto: true}
      ]
    }
   ]

   const preguntasProgramacion = [
    {
      pregunta: '??C??mo se representa el n??mero binario 1010 en decimal?',
      respuestas: [
        { texto: '1010', correcto: false },
        { texto: '20', correcto: false },
        { texto:'10', correcto:true },
        { texto:'15', correcto:false }
      ]
    },
    {
      pregunta: '??Qu?? significan las siglas "POO"?',
      respuestas: [
        { texto: 'Programaci??n orientada a objetos', correcto: true },
        { texto: 'Protocolo optimizado de operabilidad', correcto: false },
        { texto: 'Paltas orientales ostentosas', correcto: false },
        { texto: 'Programacion orientada a organismos', correcto: false }
      ]
    },
    {
      pregunta: '??Qu?? es "Visual Basic"?',
      respuestas: [
        { texto: 'Una empresa de relojes', correcto: false },
        { texto: 'Un lenguaje de programaci??n', correcto: true },
        { texto: 'Una herramienta de tortura', correcto: true },
        { texto: 'Un protocolo de red', correcto: false }
      ]
    },
    {
      pregunta: 'En HTML, ??Qu?? etiqueta se utiliza para establecer un enlace a otra p??gina web?',
      respuestas: [
        { texto: 'link', correcto: false },
        { texto: 'enl', correcto: false },
        { texto: 'l', correcto: false},
        { texto: 'a', correcto: true}
      ]
    },
    {
      pregunta: '??Cu??l es el lenguaje de programaci??n m??s usado?',
      respuestas: [
        { texto: 'Java', correcto: false },
        { texto: 'Python', correcto: true },
        { texto: 'C', correcto: false },
        { texto: 'C#', correcto: false }
      ]
    },
    {
      pregunta: 'En JavaScript, ??Con que s??mbolo se ponen comentarios de una l??nea?',
      respuestas: [
        { texto: '//', correcto: true },
        { texto: '#', correcto: false },
        { texto: '{}', correcto: false },
        { texto: '/**/', correcto: false }
      ]
    },
    {
      pregunta: '??C??mo se llama el lenguaje de consultas usado en bases de datos relacionales?',
      respuestas: [
        { texto: 'Visual Basic', correcto: false },
        { texto: 'SQL', correcto: true },
        { texto: 'CQL', correcto: false },
        { texto: 'C++', correcto: false }
      ]
    },
  ]

  const preguntasMultimedia = [
    {
      pregunta: '??Cu??nto es 2+2?',
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
