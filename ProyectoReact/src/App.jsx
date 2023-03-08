import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/navbar'
import Greeting from './components/itemListContainer'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProductList from './components/ProductList'
import axios from 'axios'


function App() {
  const [productos, setProductos]= useState([])

  const getProductos = async () => {
     const res = await axios.get("https://fakestoreapi.com/products")
     setProductos(res.data)
  }

  const text = "de Nintendo"

  const [item, setItem] = useState(0)
  const suma = () => {
    setItem(item + 1)
  }
  const resta = () => {
    setItem(item - 1); if (item <= 0) {
      setItem(0)
    }
  }

  const [usuario, setUsuario] = useState({})

  useEffect(() => {
    getProductos();
  }, [])

  return (

    <div className="App">
      <Navbar item={item} />
      <Greeting text={text} />
      <div>

        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/productos" element={<ProductList productos={productos}/>}/> 
      </Routes>
      <div className="card">
        <div>
          <button onClick={resta}>-</button>
          <button onClick={suma}>+</button>
        </div>
      </div>
      <h2> Usuarios </h2>
      <h3>
          {usuario.name}
        </h3>
        <h3>
          {usuario.phone}
        </h3>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App