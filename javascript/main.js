const endpoint = `https://apipetshop.herokuapp.com/api/articulos`

fetch(endpoint,)
.then(api => api.json())
.then(datas => {
    myProgram(datas)
})


function myProgram(data){
let articulos = data.response
console.log(articulos)
// ARMAR FUNCION MOSTRAR ARTICULOS POR MEDICAMENTO Y JUGETE :: ESTEBAN Y MIGUEL

if(document.title == "Franco || Jugetes"){
    inyectarDiv(articulos, "articulosJuguetes", "Juguete")
 }
 else {
    inyectarDiv(articulos, "medicamentos", "Medicamento")
 }

function inyectarDiv (articulos, id, tipo) {
    let bodyStore = document.querySelector(`#${id}`)
    let mensajeStock = "Últimas unidades!"
    articulos.forEach(articulo => {
        if(articulo.stock <= 5){
        if(articulo.tipo === `${tipo}`){        
            bodyStore.innerHTML += `
            <div class="">
            <img src= ${articulo.imagen}>
            <p>Nombre: ${articulo.nombre}</p>
            <p>Precio: ${articulo.precio}</p>
            <p>Stock: ${mensajeStock}</p>
            </div>
            `
        }
    } else { 
        if(articulo.tipo === `${tipo}`){        
        bodyStore.innerHTML += `
        <div class="">
        <img src= ${articulo.imagen}>
        <p>Nombre: ${articulo.nombre}</p>
        <p>Precio: ${articulo.precio}</p>
        <p>Stock: ${articulo.stock}</p>
        </div>
        `
    }

    }
    });    
    
}

 
}