import React, { useState } from "react";
import Functions from "./Functions";
import {
  Button,
  Modal,
  InputGroup,
  Col,
  Row,
  FormControl,
} from "react-bootstrap";
class OrderTableAssessor extends React.Component {
  render() {
    const orders = this.props.theOrders;
    console.log(orders, "ordenes");
    return (
      <table className="table table-bordered border-dark scroll-area">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha del pedido</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.registerDay}</td>
                <td>{order.status}</td>
                <td>
                  <OrderDetail title="Ver orden" order={order} />
                </td>
              </tr>
            ))
          ) : (
            <tr key="0">
              <td colSpan={4}>No hay órdenes para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
export default OrderTableAssessor;
function OrderDetail(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const justDate = Functions.getJustDate(props.order.registerDay);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.title}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Orden #{props.order.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <InputGroup className="mb-8">
                <InputGroup.Text>Fecha </InputGroup.Text>
                <FormControl value={justDate} disabled/>
              </InputGroup>
            </Col>
            <Col>
            <InputGroup className="mb-8">
            <   InputGroup.Text>Estado </InputGroup.Text>
                <FormControl value={props.order.status} disabled/>
            </InputGroup>
            </Col>
          </Row>
          <Row>
            <h4>Productos en la orden</h4>
            <table className="table table-bordered border-dark">
                <thead>
                    <tr>
                        <th>Referencia</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Cantidad en la orden</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.order.products).map((key,index)=>(
                        <tr key={index}>
                            <td>
                            {props.order.products[key].reference}
                            </td>
                            <td>
                                {props.order.products[key].description}
                            </td>
                            <td>
                                {props.order.products[key].price}
                            </td>
                            <td>
                                <img src={props.order.products[key].photography}  alt={props.order.products[key].reference}/>
                            </td>
                            <td>
                                {props.order.quantities[key]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
