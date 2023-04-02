import React from 'react'
import { v4 as uuid } from 'uuid'

function Checkout(props) {

  let carrito = props.cart.productos
  let total = 0

  for (let producto of carrito) {
    let precio = Number(producto.card_prices[0].tcgplayer_price)
    total += precio
    total = Number(Math.round(total+'e2')+'e-2');
  }
  return (<div>

    {carrito === undefined ? <h1>Agrega algo a tu carrito para un checkout</h1> : (
      <> <h1>Estos son tus productos</h1>
        {carrito.map((producto, index) => {
          return (
            <div key={index}>
              <li >Nombre de la carta: {producto.name}{" \t"}
                Precio de la carta: ${producto.card_prices[0].tcgplayer_price}</li>
            </div>
          )
        })}<h1>Su total es: ${total}</h1></>
    )}
  </div>
  )
}

export default Checkout