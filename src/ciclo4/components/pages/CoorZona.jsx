import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import OrderService from "../../services/OrderService";
import Functions from "../shared/Functions";
import { Button, Modal, Col, Row } from "react-bootstrap";

class CoorZona extends React.Component {
  state = {
    orders: [],
  };
  componentDidMount() {
    this.getOrders();
  }
  getOrders= () =>{
    OrderService.getAll()
      .then((response) => {
        this.setState({ orders: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h1>Orden</h1>
            </div>
          </div>
          <table className="table table-bordered border-dark scroll-area">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha de la orden</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{Functions.getJustDate(order.registerDay)}</td>
                  <td>{order.status}</td>
                  <td>
                    <ModalOrden
                      order={order}
                      getOrders={this.getOrders}
                    ></ModalOrden>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default CoorZona;

function ModalOrden(props) {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState(props.order);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [status, setStatus] = useState(
    props.order.status === "Aprobada" || props.order.status === "Pendiente"
      ? "Aprobada"
      : "Rechazada"
  );
  function changeStatus(e, newStatus) {
    setStatus(newStatus);
  }
  function updateOrder() {
    let copyOrder = order;
    copyOrder.status = status;
    setOrder(copyOrder);
    OrderService.update(order)
      .then((response) => {
        alert("Orden Actualizada");
        handleClose();
        props.getOrders();
      })
      .catch((err) => {});
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ver detalle orden
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Orden Pedido</h4>
          <table className="table table-bordered border-dark scroll-area">
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Disponibilidad</th>
                <th>Precio</th>
                <th>Foto</th>
                <th>Cantidad solicitada</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.order.products).map((key, index) => (
                <tr key={index}>
                  <td>{props.order.products[key].reference}</td>
                  <td>{props.order.products[key].category}</td>
                  <td>{props.order.products[key].description}</td>
                  <td>
                    {props.order.products[key].availability ? "Sí" : "No"}
                  </td>
                  <td>{props.order.products[key].price}</td>
                  <td>
                    <img
                      src={props.order.products[key].photography}
                      alt={key}
                      width={100}
                      height={50}
                    />
                  </td>
                  <td>{props.order.quantities[key]}</td>
                  <td>{props.order.products[key].quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Estado:
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Aprobado"
                  name="formHorizontalOrden"
                  id="radioOrdenaprobada"
                  defaultChecked={
                    status === "Aprobada" || status === "Pendiente"
                      ? true
                      : false
                  }
                  onChange={(e) => changeStatus(e, "Aprobada")}
                />
                <Form.Check
                  type="radio"
                  label="Rechazado"
                  name="formHorizontalOrden"
                  id="radioOrdenrechazada"
                  defaultChecked={status === "Rechazada" ? true : false}
                  onChange={(e) => changeStatus(e, "Rechazada")}
                />
              </Col>
            </Form.Group>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={updateOrder}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
