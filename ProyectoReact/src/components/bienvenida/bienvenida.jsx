import "./bienvenida.css"

const Greeting = (prop) =>  {
    return(<div className="bienvenida"><h2>Bienvenido al E-commerce {prop.text}
    </h2></div>)
    
}


export default Greeting 