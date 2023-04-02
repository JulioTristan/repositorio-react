import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Greeting from './components/bienvenida/bienvenida'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/home'
import CardList from './components/CardList/cardList'
import axios from 'axios'
import db from '../db/firebase-config.js'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import CardDetails from './components/CardListDetail/cardListDetail'
import { v4 as uuid } from 'uuid'
import Cart from './components/carrito/cart'
import Checkout from './components/Checkout/checkout'


function App() {
  const [item, setItem] = useState(0)
  const text = "TCG"
  const [cards, setCards] = useState([])
  const cardCollectionRef = collection(db, "cardinfo")
  const cartCollectionRef = collection(db, "cart")
  const [cart, setCart] = useState({productos: []})
  const [cantidad, setCantidad] = useState(1)

  //poblar base de datos
  // const getCards = async () => {
  //   const res = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=Branded")
  //   setCards(res.data)
  //   let cards = res.data.data
  //   for (let card of cards) {
  //    let id = card.id.toString()
  //    let docRef = doc(db, "cardinfo", id)
  //    card = {... card, createAt:serverTimestamp()}
  //    setDoc(docRef, card)
  //   }
  // }

  const getCart = async () => {
    const cartCollection = await getDocs(cartCollectionRef);
    if(cartCollection.docs.length === 0){
      let id = uuid()
      let cart = {createAt:serverTimestamp(), productos:[], id:id};
      let docRef = doc(db, "cart", id)
      setDoc(docRef, cart)
    } else{
      let cart = cartCollection.docs[0].data();
      setCart(cart);
    }
  }

  const suma = () => {
    setItem(item + 1)
  }
  const resta = () => {
    setItem(item - 1); if (item <= 0) {
      setItem(0)
    }
  }
  
   const getCards = async () => {
   const cardsCollection = await getDocs(cardCollectionRef);
     setCards(cardsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   }

   useEffect(() => {
   getCards();
   getCart();
   }, [])
   
  return (

    <div className="App">
      <Navbar item={item} />
      <Greeting text={text} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<CardList cards={cards} setCart={setCart} setCantidad={setCantidad} cantidad={cantidad} />} />
        <Route path="/cardDetail/:productoId" element={<CardDetails cards={cards} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>}/>
      </Routes>
      <div className="card">
      </div>
    </div>
  )
}

export default App