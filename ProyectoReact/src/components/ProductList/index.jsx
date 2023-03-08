const ProductList = ({ productos }) => {
    return (
        <div>{productos.map(producto => <h4>{producto.title}</h4>)}</div>
    )
}

export default ProductList