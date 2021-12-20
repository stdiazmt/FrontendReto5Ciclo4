
import { useState } from "react";
import "../../styles/buttons.css";
import OrderTableAssessor from "../shared/OrderTableAssessor";
import ChooseFilter from "../shared/ChooseFilter";
import OrderSelectFilter from "../shared/OrderSelectFilter";
import { Link } from "react-router-dom";



const Asesor = function () {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("none");
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h1>Asesor Comercial</h1>
        </div>
        <div className="col-md-2">
          <Link to="/OrdenPedido"><button className="btn btn-primary">Crear Pedido</button></Link>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <h2>Tus pedidos</h2>
        </div>
        <div className="col-md-6">
          <ChooseFilter setStatus={setStatus}></ChooseFilter>
        </div>
        <div className="col-md-6">
          <OrderSelectFilter
            filter={status}
            setOrders={setOrders}
            orders={orders}
          ></OrderSelectFilter>
        </div>
      </div>

      <div className="row mb-3">
        <OrderTableAssessor theOrders={orders} />
      </div>
    </div>
    </>
  );
};

export default Asesor;
