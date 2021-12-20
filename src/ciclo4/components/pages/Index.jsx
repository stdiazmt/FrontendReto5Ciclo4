import "../../styles/Style.css";
import React from "react";
import UserService from "../../services/UserService";
import Functions from '../shared/Functions'
class Index extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };
  handleSubmit(e) {
    let email = this.state.user.email;
    let password = this.state.user.password;
    if(Functions.validarFormatoCorreo(email) && !Functions.validaesVacio(password)){
        UserService.login(email,password).then((response)=>{
            if(response.data.id){
                const incomingUser=response.data
                const sesionStore = JSON.stringify(incomingUser);
                sessionStorage.setItem("user", sesionStore);
                switch(incomingUser.type){
                    case "ASE":
                        window.location.href="/Asesor"
                        break;
                    case "COORD":
                        window.location.href="/CoorZona"
                        break;
                    case "ADM":
                        window.location.href="/Main"
                        break;
                    default:
                        alert("Usuario sin rol especificado. Comuníquese con su administrador");
                }
            }else{
                alert("Usuario o contraseña incorrecta");
            }
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        alert("Formato de correo inválido. Recuerde que también debe escrbir su contraseña")
    }
    
  }

  handleChangeInputPassword(e){
      console.log(e)
      let password =e.target.value;
      let changedUser = this.state.user;
      changedUser.password=password;
      this.setState({user:changedUser}) 
  }
  handleChangeInputEmail(e){
      console.log(e)
      let email = e.target.value;
      let changedUser = this.state.user;
      changedUser.email=email;
      this.setState({user:changedUser})
  }
  render() {
    return (
      <>
        <div id="login"></div>
        <div className="sidenav">
          <div className="login-main-text"></div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="useremail"
                    placeholder="E-mail"
                    required
                    maxLength="50"
                    onChange={this.handleChangeInputEmail.bind(this)}
                  />
                  <span id="badEmail" className="badEmail"></span>
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    required
                    maxLength="50"
                    onChange={this.handleChangeInputPassword.bind(this)}
                  />
                </div>
                <button
                  type="button"
                  name="submit"
                  className="btn btn-black btn-md"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Index;
