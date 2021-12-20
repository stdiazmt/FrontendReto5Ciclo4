import "./App.css";
import Navbar from "./ciclo4/components/shared/Navbar";
import Rutas from "./Rutas";
function App() {
  let user = JSON.parse(sessionStorage.getItem("user"));
  let opciones = [];
  if (user) {
    switch (user.type) {
      case "ADM":
        opciones = [
          {
            name: "Gestiona tus productos",
            url: "/ProductosADM",
          },
          {
            name: "Usuarios",
            url: "/UsuariosADM",
          },
          {
            name: "Inicio",
            url: "/",
          },
          {
            name: "Catálogo",
            url: "/Catalog",
          },
        ];
        break;
      case "ASE":
        opciones = [
          {
            name: "Órdenes de producto",
            url: "/Asesor",
          },
          {
            name: "Catálogo",
            url: "/Catalog",
          },
          {
            name: "Inicio",
            url: "/",
          }
        ];
        break;
      case "COORD":
        opciones =[
          {
            name: "Órdenes de producto",
            url: "/CoorZona",
          },
          {
            name: "Catálogo",
            url: "/Catalog",
          },
          {
            name: "Inicio",
            url: "/",
          }
        ]
        break;
      default:
        opciones =[
          {
            name: "Catálogo",
            url: "/Catalog",
          },
          {
            name: "Inicio",
            url: "/",
          }
        ]
    }
  }else{
    opciones =[
      {
        name: "Catálogo",
        url: "/Catalog",
      },
      {
        name: "Inicio",
        url: "/",
      }
    ]
  }
  return (
    <div className="md:flex min-h-screen">
      <div className="container-fluid">
        <div className="row">
          <Navbar menu={opciones}/>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <Rutas />
        </div>
      </div>
    </div>
  );
}

export default App;
