import { useState } from "react";
import {Card,ListGroup,ListGroupItem} from "react-bootstrap"
import ProductSelectFilter from "../shared/ProductSelectFilter";
import ChooseFilterProduct from "../shared/ChooseFilterProduct";
function Catalog() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("none");
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h1>Catálogo de productos</h1>
        </div>
        <div className="row">
          <h2>Filtrar búsqueda</h2>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            {<ChooseFilterProduct setStatus={setStatus}></ChooseFilterProduct>}
          </div>
          <div className="col-md-6">
            <ProductSelectFilter
              status={status}
              setProducts={setProducts}
              products={products}
            ></ProductSelectFilter>
          </div>
        </div>
        <div className="row mb-3">
          {products.length>0 ? (
            products.map((product, index) => (
              <div className="col-md-4" key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={product.photography}
                  />
                  <Card.Body>
                    <Card.Title>{product.reference}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Precio: $ {product.price}</ListGroupItem>
                    <ListGroupItem>Categoría: {product.category}</ListGroupItem>
                  </ListGroup>
                </Card>
              </div>
            ))
          ) : (
            <p>No hay productos para mostrar</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Catalog;
