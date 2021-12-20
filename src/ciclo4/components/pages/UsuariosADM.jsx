import React from "react";
import UserService from "../../services/UserService";
import { Modal, Button } from "react-bootstrap";
import Functions from "../shared/Functions";
class UsuariosADM extends React.Component {
  state = {
    users: [],
  };
  getUsers = () => {
    UserService.getAll()
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleRemove(user, e) {
    let opc = window.confirm(
      "¿Está seguro que desea eliminar el usuario " + user.name + "?"
    );
    if (opc) {
      UserService.remove(user.id)
        .then((response) => {
          if (response.status === 204) {
            alert("Usuario eliminado");
            this.getUsers();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h1>Usuarios</h1>
            </div>
            <div className="col-md-2">
              <ModalUsuario
                title={"Crear Usuario"}
                getUsers={this.getUsers}
              ></ModalUsuario>
            </div>
          </div>
          <div className="row">
            <table id="tablaUsuarios" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Fecha de nacimiento</th>
                  <th>Mes de nacimiento</th>
                  <th>Dirección</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Zona</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.identification}</td>
                    <td>{user.name}</td>
                    <td>{Functions.getJustDate(user.birthtDay)}</td>
                    <td>{user.monthBirthtDay}</td>
                    <td>{user.address}</td>
                    <td>{user.cellPhone}</td>
                    <td>{user.email}</td>
                    <td>{user.zone}</td>
                    <td>{user.type}</td>
                    <td>
                      <div className="d-grid gap-2">
                        <ModalUsuario
                          title="Editar usuario"
                          user={user}
                          getUsers={this.getUsers}
                        ></ModalUsuario>
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => this.handleRemove(user, e)}
                        >
                          Eliminar Usuario
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

export default UsuariosADM;

class ModalUsuario extends React.Component {
  state = {
    show: false,
    user: {
      id: this.props.user ? this.props.user.id : "",
      identification: this.props.user ? this.props.user.identification : "",
      name: this.props.user ? this.props.user.name : "",
      birthtDay: this.props.user ? this.props.user.birthtDay : "",
      monthBirthtDay: this.props.user ? this.props.user.monthBirthtDay : "",
      address: this.props.user ? this.props.user.address : "",
      cellPhone: this.props.user ? this.props.user.cellPhone : "",
      email: this.props.user ? this.props.user.email : "",
      password: this.props.user ? this.props.user.password : "",
      zone: this.props.user ? this.props.user.zone : "",
      type: this.props.user ? this.props.user.type : "ADM",
    },
    confirmPassword: "",
    emailExists: false,
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  closeModal() {
    if (this.props.title === "Crear Usuario") {
      this.setState({
        user: {
          id: "",
          identification: "",
          name: "",
          birthtDay: "",
          monthBirthtDay: "",
          address: "",
          cellPhone: "",
          email: "",
          password: "",
          zone: "",
          type: "ADM",
        },
      });
    }
    this.handleClose();
  }
  handleInput(e, type) {
    let newValue = e.target.value;

    let newUser = this.state.user;
    newUser[type] = newValue;
    if (type === "birthtDay") {
      newUser["monthBirthtDay"] = Functions.getMonthByDate(newValue);
      let date = new Date(newValue)
      date.setHours(date.getHours()+5);
      newUser[type]=date.toISOString();
    } else if (type === "email") {
      UserService.validateEmail(newValue)
        .then((response) => {
          this.setState({ emailExists: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({ user: newUser });
  }

  handleSubmit(e, type, user) {
    let param = type === "Crear Usuario" ?"create":"update";
    if (Functions.validarCamposUsuario(this.state.user,param)) {
      if(Functions.validarFormatoCorreo(this.state.user.email)){
        if (this.state.confirmPassword === this.state.user.password) {
          if (type === "Crear Usuario") {
            if (this.state.emailExists) {
              alert("Ya existe una cuenta con ese correo");
            } else {
              UserService.create(this.state.user)
                .then((response) => {
                  if (response.status === 201) {
                    alert("Usuario creado");
                    this.handleClose();
                    this.props.getUsers();
                    this.setState({
                      user: {
                        id: "",
                        identification: "",
                        name: "",
                        birthtDay: "",
                        monthBirthtDay: "",
                        address: "",
                        cellPhone: "",
                        email: "",
                        password: "",
                        zone: "",
                        type: "",
                      },
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else if (type === "Editar usuario") {
            UserService.update(user)
              .then((response) => {
                alert("Usuario actualizado");
  
                this.props.getUsers();
                this.handleClose();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          alert("Las contraseñas no coinciden");
        }
      }else{
        alert("Formato de correo inválido");
      }
      
    } else {
      alert("Todos los campos deben estar llenos");
    }
  }
  handleClick(e, type) {
    if (this.props.title === "Crear Usuario") {
      e.target.value = "";
      let newValue = e.target.value;
      let newuser = this.state.user;
      newuser[type] = newValue;
      this.setState({ user: newuser });
    }
  }
  comparePassword(e, type) {
    let newValue = e.target.value;
    this.setState({ confirmPassword: newValue });
  }
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          {this.props.title}
        </Button>

        <Modal show={this.state.show} onHide={()=>this.closeModal()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              id="login-form"
              className="form row g-2"
              action=""
              method="post"
            >
              <h3 className="p2 text-center">{this.props.title}</h3>
              <div className="col-md-6">
                <label htmlFor="identification" className="p3">
                  Identificacion:
                </label>
                <br />
                <input
                  type="number"
                  name="identification"
                  id="identification"
                  className="form-control"
                  required
                  maxLength="80"
                  onChange={(e) => {
                    this.handleInput(e, "identification");
                  }}
                  value={this.state.user.identification}
                  disabled={
                    this.props.title === "Editar usuario" ? true : false
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="p3">
                  Nombre y apellido:
                </label>
                <br />
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="form-control"
                  required
                  maxLength="80"
                  onChange={(e) => {
                    this.handleInput(e, "name");
                  }}
                  value={this.state.user.name}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="p3">
                  Fecha de nacimiento:
                </label>
                <br />
                <input
                  type="date"
                  name="birthtDay"
                  id="birthtDay"
                  className="form-control"
                  onChange={(e) => {
                    this.handleInput(e, "birthtDay");
                  }}
                  value={Functions.getJustDate(this.state.user.birthtDay)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="p3">
                  Direccion:
                </label>
                <br />
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  required
                  maxLength="80"
                  onChange={(e) => {
                    this.handleInput(e, "address");
                  }}
                  value={this.state.user.address}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="cellphone" className="p3">
                  Celular:
                </label>
                <br />
                <input
                  type="number"
                  name="cellphone"
                  id="cellphone"
                  className="form-control"
                  required
                  maxLength="80"
                  onChange={(e) => {
                    this.handleInput(e, "cellPhone");
                  }}
                  value={this.state.user.cellPhone}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="p3">
                  E-mail:
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  required
                  maxLength="50"
                  onChange={(e) => {
                    this.handleInput(e, "email");
                  }}
                  value={this.state.user.email}
                />
                <span
                  id="badEmail"
                  className="badEmail"
                  style={{ display: "none" }}
                ></span>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="p3">
                  Clave:
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
                  maxLength="50"
                  onChange={(e) => {
                    this.handleInput(e, "password");
                  }}
                  value={this.state.user.password}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="passwordrepeat" className="p3">
                  Confirmar Clave:
                </label>
                <br />
                <input
                  type="password"
                  name="passwordrepeat"
                  id="passwordrepeat"
                  className="form-control"
                  required
                  maxLength="50"
                  onChange={(e) => {
                    this.comparePassword(e, "password");
                  }}
                  value={this.state.confirmPassword}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="zone" className="p3">
                  Zona :
                </label>
                <br />
                <input
                  type="text"
                  name="zone"
                  id="zone"
                  className="form-control"
                  required
                  maxLength="80"
                  value={this.state.user.zone}
                  onChange={(e) => {
                    this.handleInput(e, "zone");
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="select" className="p3">
                  Cargo
                </label>
                <select
                  id="type"
                  className="form-select"
                  name="select"
                  onChange={(e) => {
                    this.handleInput(e, "type");
                  }}
                  defaultValue={this.state.user.type}
                >
                  <option value="ADM">Administrador</option>
                  <option value="COORD">Coordinador de zona</option>
                  <option value="ASE">Asesor comercial</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-grid gap-2">
              <Button
                variant="secondary"
                onClick={(e) => {
                  this.closeModal(e);
                }}
                size="lg"
              >
                Cerrar
              </Button>
            </div>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={(e) =>
                  this.handleSubmit(e, this.props.title, this.state.user)
                }
              >
                {this.props.title}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
