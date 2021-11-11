const endpoint = `https://apipetshop.herokuapp.com/api/articulos`
let chamber = document.title === "Tienda-Medicamento" ? "Medicamento" : "Juguete"

fetch(endpoint, )
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

    function imprimirCarousel(array) {
        array.forEach(element => {
            carousel.innerHTML += `
            <div class="carousel__face" style= "background-image: url(${element.imagen});">

            <span class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${element.nombre}</span>

            </div>
            `
        })
    }
    imprimirCarousel(menos5)

    // ARMAR FUNCION MOSTRAR ARTICULOS POR MEDICAMENTO Y JUGETE :: ESTEBAN Y MIGUEL

    inyectarDiv(articulos)

    function inyectarDiv(articulos) {
        const catalogo = document.querySelector("#articulos");

        catalogo.innerHTML = ""
        articulos.forEach(articulo => {
            if (articulo.tipo === `${chamber}`) {
                catalogo.innerHTML += `
                <div class="col">
                <div class="card">
                    <img src= ${articulo.imagen}>
                    <div class="card-body">
                        <p>Nombre: ${articulo.nombre}</p>
                        <p>Stock: ${articulo.stock <= 5 ? `<span class="ultimas-unidades">Ultimas unidades!</span>` : articulo.stock}</p>
                        <div class="precio-stock">
                            <p>$${articulo.precio}</p>
                            <button>Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
            }
        })
    }
    let mayor = document.getElementById("mayor");
    let menor = document.getElementById("menor");



    
    let articulosCopia = [...articulos]
    mayor.addEventListener("change", () => {
        if (mayor.checked === true) {
            const artMayor = articulosCopia.sort((a, b) => {
                if (b.precio < a.precio) {
                    return -1;
                }
                if (b.precio > a.precio) {
                    return 1;
                }
                return 0;

            });
            inyectarDiv(artMayor)
        } else {
            inyectarDiv(articulos);
        }
        //console.log(miembros);
    })
    menor.addEventListener("change", () => {
        if (menor.checked === true) {
            const artMayor = articulosCopia.sort((a, b) => {
                if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;

            });
            inyectarDiv(artMayor)
        } else {
            inyectarDiv(articulos);
        }
        //console.log(miembros);
    })

let ResultadoValor = document.querySelector("#modificarValor")

    const price = document.querySelector("input[type='number']")
price.addEventListener("change", valor => {
    let precioValue = valor.target.value
    let array = [...articulos];
    let arrayFiltrado 
    array.forEach(element =>{
        if(element.precio <= precioValue ){
            return arrayFiltrado = array.filter( elemento => elemento.precio <= precioValue)
        }
    })
    console.log(arrayFiltrado)
    let filtroCantidad 
    arrayFiltrado.forEach(() => { 
            return filtroCantidad = arrayFiltrado.filter(element => element.tipo === `${chamber}`)
    })
    console.log(filtroCantidad.length);
    ResultadoValor.innerHTML = `${filtroCantidad.length} Articulos `
    inyectarDiv(arrayFiltrado)
})
}


