import logo3 from "../../styles/img/logo3.png";
import logoblack from "../../styles/img/logoblack.jpg";
import { Link } from "react-router-dom";
import { Offcanvas,Alert,Accordion } from "react-bootstrap";
import { useState, useEffect} from "react";
import Functions from "../shared/Functions";
import UserService from "../../services/UserService";
const Navbar = (props) => (
  <>
    <nav
      className="navbar navbar-dark fixed-top"
      style={{ backgroundColor: "#863c59" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand p1" to="/">
          <img src={logoblack} alt="Trulli" width="150" height="80" /> Willy Wonka Tienda de Chocolates
        </Link>
        <OffCanvasExample menu={props.menu} placement={"end"}></OffCanvasExample>
      </div>
    </nav>
  </>
);
export default Navbar;
var user = JSON.parse(sessionStorage.getItem("user"));
function OffCanvasExample({menu, name, ...props }) {
  const [show, setShow] = useState(false);
  const [usersBirthday, setUsersBirthday] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    if(user){
      function getUsersByBirthDay(){
        let mes= new Date(Functions.cargarFechaDeHoy()).getMonth() +1;
        UserService.getByBirthMonth(mes).then((response)=>{
          setUsersBirthday(response.data);
        }).catch((err)=>{
          console.log(err)
        })
      }
      getUsersByBirthDay();
    }
  },[])
  
  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        onClick={handleShow}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={logo3} alt="Trulli" width="200" height="55" />
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{user ? user.name : ""}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {user
                    ? user.type === "ASE"
                      ? "Asesor"
                      : user.type === "COORD"
                      ? "Coordinador"
                      : user.type === "ADM"
                      ? "Administrador"
                      : ""
                    : ""}
                </h6>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          {menu.map((option, index) => (
                                <li key = {index} className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={option.url}>{option.name}</Link>
                                </li>
                            ))}
            
            <li>
              <hr className="dropdown-divider" />
            </li>
            {user ? (
              <>

                <Alert variant="primary">
                  <h3>Cumpleaños</h3>
                  {usersBirthday?( usersBirthday.length>0? (usersBirthday.map((user,index)=>(<Accordion key={index}>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{user.name}</Accordion.Header>
                      <Accordion.Body>
                        <p> {user.name} día {Functions.getJustDate(user.birthtDay).split("-")[2]} mes</p>
                        <span>Felicidades a los cumpleañeros</span> 
                      </Accordion.Body>
                    </Accordion.Item>
                    
                  </Accordion>) )):(<h5>Mes sin cumpleañeros </h5>)):("")}
                </Alert>
              </>
            ) : (
              <></>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
