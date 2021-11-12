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
            <span  data-bs-target="#staticBackdrop">${element.nombre}</span>
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
                            <a href="#" data-name="${articulo.nombre}"" data-price="${articulo.precio}" class="add-to-cart button">Add to cart</a>
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



    
    mayor.addEventListener("change", () => {
        if (mayor.checked === true) {
            articulos.sort((a, b) => {
                if (b.precio < a.precio) {
                    return -1;
                }
                if (b.precio > a.precio) {
                    return 1;
                }
                return 0;
            });
            inyectarDiv(articulos)
        }
    })
    menor.addEventListener("change", () => {
        if (menor.checked === true) {
            articulos.sort((a, b) => {
                if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
            });
            inyectarDiv(articulos)
        }
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

// CARRITO JOAQUIN
var shoppingCart = (function() {
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    var obj = {};
    
    // Add to cart
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
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
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
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
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
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        title: 'Agregado al carrito'
      })
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
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
        + "<td>'" + cartArray[i].total + "'</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
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
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  document.querySelector("#compraya").addEventListener("click", () => {
    Swal.fire(
      'Te quitamos todo tu dinero!',
    )
    document.querySelector(".show-cart").innerHTML = ""
    document.querySelector(".total-cart").innerHTML = ""
  })
  
}
