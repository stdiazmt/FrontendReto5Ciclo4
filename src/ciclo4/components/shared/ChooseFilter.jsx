import { Form } from "react-bootstrap";
var theSetStatus;
function cambiarEstado(e){
    let el=document.getElementById("selectStatus");
    theSetStatus(el.value)
}
function ChooseFilter({ setStatus }) {
  theSetStatus=setStatus
  let el = (
    <>
      <label htmlFor="selectStatus">Seleccione un filtro</label>
      <Form.Select
        onChange={cambiarEstado}
        aria-label="Default select example"
        key="filterSelect"
        name="selectStatus"
        id="selectStatus"
      >
        <option disabled>Seleccione el filtro de búsqueda</option>
        <option value="none">Ninguno</option>
        <option value="status">Por estado</option>
        <option value="date">Por fecha</option>
      </Form.Select>
    </>
  );
  return el;
}
export default ChooseFilter;
