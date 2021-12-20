import ProductService from "../../services/ProductService";
import { Button, Modal } from "react-bootstrap";
import React from "react";
import "../../styles/productos.css";
import Functions from "../shared/Functions";

class ProductosADM extends React.Component {
  getProducts = () => {
    ProductService.getAll()
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getProducts();
  }
  state = {
    products: [],
  };
  handleRemove(product, e) {
    let opc = window.confirm(
      "¿Está seguro de que desea eliminar el producto " +
        product.reference +
        "?"
    );
    if (opc) {
      ProductService.remove(product.reference)
        .then((response) => {
          if (response.status === 204) {
            alert("Producto Eliminado");
            this.getProducts();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h1>Productos</h1>
            </div>
            <div className="col-md-2">
              <ModalProduct
                title="Crear Producto"
                getProducts={this.getProducts}
              ></ModalProduct>
            </div>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th>Refrencia</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Disponibilidad</th>
                  <th>Cantidad</th>
                  <th>Foto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.reference}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>{product.availability ? "Sí" : "No"}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <img
                        src={product.photography}
                        alt={product.reference}
                        width={100}
                        height={55}
                      />
                    </td>
                    <td>
                      <div className="d-grid gap-2">
                        <ModalProduct
                          title={"Editar producto"}
                          product={product}
                          getProducts={this.getProducts}
                        />
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => this.handleRemove(product, index, e)}
                        >
                          Eliminar producto
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
export default ProductosADM;

class ModalProduct extends React.Component {
  state = {
    show: false,
    product: {
      reference: this.props.product ? this.props.product.reference : "",
      description: this.props.product ? this.props.product.description : "",
      category: this.props.product ? this.props.product.category : "",
      availability: this.props.product ? this.props.product.availability : true,
      price: this.props.product ? this.props.product.price : 0,
      quantity: this.props.product ? this.props.product.quantity : 0,
      photography: this.props.product ? this.props.product.photography : "",
    },
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleInput(e, type) {
    let newValue = e.target.value;
    if (Functions.isNumeric(newValue)) {
      if (newValue.startsWith("0")) {
        newValue = newValue.substring(1);
      }
      newValue = parseFloat(newValue);
    }
    let newProduct = this.state.product;
    newProduct[type] = newValue;
    this.setState({ product: newProduct });
  }
  handleRadio(e, type) {
    let newProduct = this.state.product;
    if (type === "availability") {
      newProduct["availability"] = true;
    } else {
      newProduct["availability"] = false;
    }
    this.setState({ product: newProduct });
  }
  handleSubmit(e, type, product) {
    if (type === "Crear Producto") {
      ProductService.create(product)
        .then((response) => {
          alert("Producto creado");
          this.handleClose();
          this.props.getProducts();
          this.setState({
            product: {
              reference: "",
              description: "",
              category: "",
              availability: true,
              price: 0,
              quantity: 0,
              photography: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "Editar producto") {
      ProductService.update(product)
        .then((response) => {
          alert("Producto actualizado");

          this.props.getProducts();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  closeModal() {
    if (this.props.title === "Crear Producto") {
      this.setState({
        product: {
          reference: "",
          description: "",
          category: "",
          availability: true,
          price: 0,
          quantity: 0,
          photography: "",
        },
      });
      
    }
    this.handleClose();
  }
  handleClick(e, type) {
    if (this.props.title === "Crear Producto") {
      e.target.value = "";
      let newValue = e.target.value;
      let newProduct = this.state.product;
      newProduct[type] = newValue;
      this.setState({ product: newProduct });
    }
  }
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          {this.props.title}
        </Button>

        <Modal show={this.state.show} onHide={(e)=>{this.closeModal(e)}}>
          <Modal.Header closeButton>
            <Modal.Title>Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              id="login-form"
              className="form row g-2"
              action=""
              method="post"
            >
              <div className="col-md-6">
                <label htmlFor="reference" className="p3">
                  Referencia:
                </label>
                <input
                  type="text"
                  name="reference"
                  id="reference"
                  className="form-control"
                  value={this.state.product.reference}
                  onChange={(e) => this.handleInput(e, "reference")}
                  onClick={(e) => this.handleClick(e, "reference")}
                  disabled={
                    this.props.title === "Crear Producto" ? false : true
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="category" className="p3">
                  Categoría:
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="form-control"
                  required
                  maxLength="80"
                  value={this.state.product.category}
                  onChange={(e) => this.handleInput(e, "category")}
                  onClick={(e) => this.handleClick(e, "category")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="p3">
                  Precio:
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  required
                  maxLength="80"
                  value={this.state.product.price}
                  onChange={(e) => this.handleInput(e, "price")}
                  onClick={(e) => this.handleClick(e, "price")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="p3">
                  Disponibilidad:
                </label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDisponibilidad"
                    id="radioDisponibilidadSi"
                    defaultChecked={this.state.product.availability}
                    onChange={(e) => this.handleRadio(e, "availability")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="radioDisponibilidadSi"
                  >
                    Sí
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDisponibilidad"
                    id="radioDisponibilidadNo"
                    defaultChecked={!this.state.product.availability}
                    onChange={(e) => this.handleRadio(e, "noavailability")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="radioDisponibilidadNo"
                  >
                    No
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="description" className="p3">
                  Descripción:
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  required
                  maxLength="80"
                  value={this.state.product.description}
                  onChange={(e) => this.handleInput(e, "description")}
                  onClick={(e) => this.handleClick(e, "description")}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="quantity" className="p3">
                  Cantidad:
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="form-control"
                  value={this.state.product.quantity}
                  onChange={(e) => this.handleInput(e, "quantity")}
                  onClick={(e) => this.handleClick(e, "quantity")}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="photo" className="p3">
                  Foto (enlace):
                </label>
                <input
                  type="text"
                  name="photo"
                  id="photo"
                  className="form-control"
                  value={this.state.product.photography}
                  onChange={(e) => this.handleInput(e, "photography")}
                  onClick={(e) => this.handleClick(e, "photography")}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e)=>{this.closeModal(e)}}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={(e) =>
                this.handleSubmit(e, this.props.title, this.state.product)
              }
            >
              {this.props.title}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
