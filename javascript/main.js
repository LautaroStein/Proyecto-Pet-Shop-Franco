const endpoint = `https://apipetshop.herokuapp.com/api/articulos`

fetch(endpoint,)
.then(api => api.json())
.then(datas => {
    myProgram(datas)
})


function myProgram(data){
let articulos = data
console.table(articulos)
// ARMAR FUNCION MOSTRAR ARTICULOS POR MEDICAMENTO Y JUGETE :: ESTEBAN Y MIGUEL















}

// // validar formularios

let enviar = document.getElementById("enviar");
let modal = document.getElementById("modal-conteiner");
let closes = document.getElementById("close");



   function mostrarModal(e) {
       e.preventDefault();
       
       enviar.addEventListener('click', () =>{
       modal.classList.add('show');
      })


      closes.addEventListener('click', () =>{
          modal.classList.remove('show');
      })

      e.target[0].value = " "
      e.target[1].value = " "
      e.target[2].value = " "
      e.target[3].value = " "
      e.target[7].value = " "
      
    }    
   
   formulario.addEventListener('submit',mostrarModal);
    

      
        


