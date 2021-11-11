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

    function inyectarDiv (articuloss, id, tipo) {
            let bodyStore = document.querySelector(`#${id}`)
            bodyStore.innerHTML=""
            articuloss.forEach(articulo => {
                if(articulo.tipo === `${tipo}`){        
                    bodyStore.innerHTML += `
                    <div class="col">
                        <div class="card">
                            <img src= ${articulo.imagen}>
                            <div class="card-body">
                                <p>Nombre: ${articulo.nombre}</p>
                                <p>Stock: ${articulo.stock <= 5 ? "Ultimas unidades!" : articulo.stock}</p>
                                <div class="precio-stock">
                                    <p>$${articulo.precio}</p>
                                    <a href="#" data-name="${articulo.nombre}" data-price="${articulo.precio}" class="add-to-cart btn btn-primary">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                }
            })
    }

    const price = document.querySelector("input[type='number']")
price.addEventListener("change", valor => {
    let precioValue = valor.target.value
    let array = [...articulos];
    let arrayFiltrado 
    console.log(precioValue)
    array.forEach(element =>{
        if(element.precio <= precioValue ){
            arrayFiltrado = array.filter( elemento => elemento.precio <= precioValue)
        }
    })
    inyectarDiv(arrayFiltrado, "medicamentos", "Medicamento")
})

// CARRITO JOAQUIN

var shoppingCart = (function() {

  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Guardar carrito
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Cargar carrito
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  var obj = {};
  
  // Agregar al carrito
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }

  // Settear contador del carrito
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  // Sacar item del carrito
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Sacar todos los items del carrito
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Limpiar carrito
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Contador del carrito
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total del carrito
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // Lista del carrito
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  return obj;
})();


// *****************************************
// Eventos
// ***************************************** 
// Agregar Items
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Limpiar Items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>'" + cartArray[i].name + "'</td>"
        + "<td>('" + cartArray[i].price + "')</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }

// Boton borrar item

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})

// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Contador item input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

    // FINAL DEL MYPROGRAM
}