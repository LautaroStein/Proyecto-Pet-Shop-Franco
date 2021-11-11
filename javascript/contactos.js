// // validar formularios

let enviar = document.getElementById("enviar");
let modal = document.getElementById("modal-conteiner");
let closes = document.getElementById("close");


    function mostrarModal(e) {
        modal.classList.add('show');
        e.preventDefault();
        closes.addEventListener('click', () =>{
            modal.classList.remove('show');
            e.target[0].value = ""
            e.target[1].value = ""
            e.target[2].value = ""
            e.target[3].value = ""
            e.target[7].value = ""
        })
}   
formulario.addEventListener('submit',mostrarModal);
