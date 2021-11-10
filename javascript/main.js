const endpoint = `https://apipetshop.herokuapp.com/api/articulos`

fetch(endpoint,)
.then(api => api.json())
.then(datas => {
    myProgram(datas)
})


function myProgram(data){
    
    let articulos = data.response
    console.table(articulos)

function filtroStock(array) {
    let arrayGeneral = [...array];
    
    let arrayfilter = arrayGeneral.filter((element) => element.stock <= 5);
    
    return arrayfilter;
}
    let menos5 = filtroStock(articulos)

    let carousel = document.querySelector("#carousells")
    function imprimirCarousel (array){
        array.forEach(element => {
            carousel.innerHTML += `
            <div class="carousel__face" style= "background-image: url(${element.imagen});">
                <span>${element.nombre} </span>
            </div>
            `
        })
    }
    imprimirCarousel(menos5)
    
    // ARMAR FUNCION MOSTRAR ARTICULOS POR MEDICAMENTO Y JUGETE :: ESTEBAN Y MIGUEL
    
    if(document.title == "Franco || Jugetes"){
        inyectarDiv(articulos, "articulosJuguetes", "Juguete")
    }
    else {
        inyectarDiv(articulos, "medicamentos", "Medicamento")
    }

    function inyectarDiv (articulos, id, tipo) {
            let bodyStore = document.querySelector(`#${id}`)
            articulos.forEach(articulo => {
                if(articulo.tipo === `${tipo}`){        
                    bodyStore.innerHTML += `
                    <div class="">
                    <img src= ${articulo.imagen}>
                    <p>Nombre: ${articulo.nombre}</p>
                    <p>Precio: ${articulo.precio}</p>
                    <p>Stock: ${articulo.stock <= 5 ? "Ultimas unidades!" : articulo.stock}</p>
                    <button>Comprar</button>
                    </div>
                    `
                }
            })
    }




















    // FINAL DEL MYPROGRAM
}
