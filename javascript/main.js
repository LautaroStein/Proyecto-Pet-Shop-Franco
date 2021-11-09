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