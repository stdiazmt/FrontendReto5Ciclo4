function validarFormatoCorreo(correo) {
  if (
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(correo)
  ) {
    return true;
  }
  return false;
}

function validaesVacio(dato) {
  return !dato.trim().length;
}

function isNumeric(numstr) {
  if (numstr.match(/^\d+$/)) {
    return true;
  } else {
    return false;
  }
}

function getJustDate(fullDate) {
  var day = new Date(fullDate);
  var dd = String(day.getDate()).padStart(2, "0");
  var mm = String(day.getMonth() + 1).padStart(2, "0");
  var yyyy = day.getFullYear();
  return  yyyy+"-" +mm + "-"+ dd;
}

function getMonthByDate(date){
  return getJustDate(date).split("-")[1]
}
function validarCamposUsuario(obj,type){
  if(obj.identification===""||
  obj.name===""||
  obj.birthDay===""||
  obj.address===""||
  obj.cellPhone===""||
  obj.email===""||
  obj.password===""||
  obj.zone===""||
  obj.type===""){
    return false;
  }
  if(type!=="create"){
    if(!obj.id){
      return false
    }
  }
  return true;
}

function cargarFechaDeHoy() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  return today;
}
const exportObj = {
  validarFormatoCorreo,
  validaesVacio,
  isNumeric,
  getJustDate,
  validarCamposUsuario,
  getMonthByDate,
  cargarFechaDeHoy
};

export default exportObj;
