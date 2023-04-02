import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "../../db/firebase-config"

const agregarCarta = async (producto, cantidad) => {
    const cartCollectionRef = collection(db, "cart")
    const cartCollection = await getDocs(cartCollectionRef);
    let cart = cartCollection.docs[0].data();
    for (let index = 0; index < cantidad; index++) {
      cart.productos.push(producto);  
    }
    let docRef = doc(db, "cart", cart.id)
    setDoc(docRef, cart)
    return cart
}
const eliminarCarta = async (producto) => {
    const cartCollectionRef = collection(db, "cart")
    const cartCollection = await getDocs(cartCollectionRef);
    let cart = cartCollection.docs[0].data();
    for (let i = 0; i < cart.productos.length; i++) {
        if(producto.id === cart.productos[i].id){
            cart.productos.splice(i, 1) 
        }  
    }
    let docRef = doc(db, "cart", cart.id)
    setDoc(docRef, cart)
    return cart
}

export { agregarCarta, eliminarCarta }