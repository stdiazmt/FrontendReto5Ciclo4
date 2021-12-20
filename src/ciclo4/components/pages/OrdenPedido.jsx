import React from "react";
import ProductService from "../../services/ProductService";
import OrderService from "../../services/OrderService";
import Functions from "../shared/Functions";

class OrdenPedido extends React.Component {
  getProducts() {
    ProductService.getAll()
      .then((response) => {
        this.setState(function (state, props) {
          return { products: response.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  state = {
    order: {
      id: "",
      registerDay: Functions.cargarFechaDeHoy(),
      status: "Pendiente",
      products: {},
      quantities: {},
      salesMan: JSON.parse(sessionStorage.getItem("user"))
    },
    products: [],
  };
  componentDidMount() {
    this.getProducts();
  }

  createUI() {
     return <table
     id="tablaProductosEnOrden"
     className="table table-bordered border-dark"
   >
     <thead>
       <tr>
         <th>Referencia</th>
         <th>Precio unitario</th>
         <th>Cantidad</th>
         <th>Eliminar</th>
       </tr>
     </thead>
     <tbody id="bodyTablaProductosEnOrden">
       {this.state.order.products ? (
         Object.keys(this.state.order.products).map(
           (key, index) => (
             <tr key={key}>
               <td>{this.state.order.products[key].reference}</td>
               <td>{this.state.order.products[key].price}</td>
               <td>
                 <input
                   type="number"
                   value={
                     this.state.order.quantities.hasOwnProperty(
                      this.state.order.products[key].reference
                     )
                       ? this.state.order.quantities[this.state.order.products[key].reference]
                       : (1)
                   }
                   placeholder="Cantidad"
                   onChange={this.handleChangeInput.bind(this, this.state.order.products[key].reference)}
                 />
               </td>
               <td>
                 <button
                   id={"remove-" + this.state.order.products[key].reference}
                   className="btn btn-secondary"
                   onClick={
                     this.removeClick.bind(this,this.state.order.products[key].reference)
                    }
                 >
                   Eliminar
                 </button>
               </td>
             </tr>
           )
         )
       ) : (
         <tr>
           <td colSpan={4}>
             Aún no se han agregado productos a la orden
           </td>
         </tr>
       )}
       <tr></tr>
     </tbody>
   </table> 
  }

  handleChangeInput(reference, event) {
    let quantities = this.state.order.quantities;
    quantities[reference] = parseInt(event.target.value);
    if(quantities[reference]<=0){
      quantities[reference]=1;
    }
    let newOrder = this.state.order;
    newOrder.quantities=quantities
    this.setState({ order:newOrder });
  }

  addClick(product) {
    let products = this.state.order.products;
    let quantities = this.state.order.quantities;
    quantities[product.reference] = 1;
    products[product.reference]=product;
    let newOrder = this.state.order;
    newOrder.products=products;
    newOrder.quantities=quantities
    this.setState({ order:newOrder});
  }

  removeClick(reference) {
    let products= this.state.order.products;
    let quantities = this.state.order.quantities;
    delete products[reference];
    delete quantities[reference];
    let newOrder=this.state.order;
    newOrder.products=products;
    newOrder.quantities=quantities;
    this.setState({ order:newOrder });
  }

  handleSubmit(event) {
    event.preventDefault();
    OrderService.create(this.state.order).then((response)=>{
      if(response.data.id){
        alert("Orden creada satisfactoriamente");
        window.location.href="/Asesor";
      }
    }).catch((err)=>{
      alert("Error al crear orden",err)
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h2>Crear Pedidos</h2>
          <div className="col-sm-4">
            <h3>Información del pedido</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="registerDay" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  name="registerDay"
                  className="form-control"
                  id="registerDay"
                  disabled
                  value={this.state.order.registerDay}
                />
              </div>
              <div className="mb-3">
                <button id="crearOrden" className="btn btn-primary" onClick={(e)=>{this.handleSubmit(e)}}>
                  Crear orden
                </button>
              </div>
            </form>
            <h2>Productos en la orden</h2>
            {this.createUI()}
          </div>
          <div className="col-sm-7 h-50">
            <h2>Lista de productos</h2>
            <table
              id="tablaProductos"
              className="table table-bordered border-dark scroll-area"
            >
              <thead>
                <tr>
                  <th>Referencia</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.length > 0 ? (
                  this.state.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.reference}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <img
                          src={product.photography}
                          alt={product.reference}
                          width={10}
                          height={10}
                        />
                      </td>
                      <td>
                        <button
                          id={"add-" + product.reference}
                          className="btn btn-primary"
                          onClick={
                            this.addClick.bind(this,product)
                          }
                        >
                          Agregar a la orden
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="0">
                    <td colSpan={6}>No hay productos para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6"></div>
        </div>
      </div>
    );
  }
}
export default OrdenPedido;
