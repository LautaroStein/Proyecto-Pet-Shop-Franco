const endpoint = `https://apipetshop.herokuapp.com/api/articulos`

fetch(endpoint,)
.then(api => api.json())
.then(datas => {
    myProgram(datas)
})


function myProgram(data){


let articulos = data.response
console.table(articulos)
// ARMAR FUNCION MOSTRAR ARTICULOS POR MEDICAMENTO Y JUGETE :: ESTEBAN Y MIGUEL
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




}
