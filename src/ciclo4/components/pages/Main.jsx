import FondoUsuarios from '../../styles/img/usersIcon.png'
import FondoProductos from '../../styles/img/headerbg.jpg'
import { Link } from "react-router-dom";
const Main = () => (
    <section className="row p-4">
      <div className="row mt-5">
        <div className="container-fluid">
          <div className="row center">
            <div className="col-md-6 card-deck">

              <Link to="/UsuariosADM">
                <div className="card p2 text-center bg-secondary mb-3">
                  <img className="card-img-top" src={FondoUsuarios} alt="Card cap"/>
                  <div className="card-body">
                    <Link to="/UsuariosADM" className="btn btn-dark">Usuarios</Link>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 ">
              <Link to="/ProductosADM">
                <div className="card p2 text-center bg-secondary mb-3">
                  <img className="card-img-top" src={FondoProductos} alt="Card cap"/>
                  <div className="card-body">
                    <Link to="/ProductosADM" className="btn btn-dark">Productos</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
)
export default Main;