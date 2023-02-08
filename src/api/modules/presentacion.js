import axios from "axios";

async function presentacionGetList() {
  let result;
  result = await axios.get(
     "https://localhost:44309/Presentacion/GetList"
  );
  return result.data;
}



async function  presentacionGet(Id) {
  let result;
  result = await axios.get(
     "https://localhost:44309/Presentacion/Get?id=" +Id);
  console.log("GETRESULT: ", result.data);
  return result.data;
}
async function createpresentacion( presentacion) {
  let result;
  result = await axios.post(
    "https://localhost:44309/Presentacion/Create",
    presentacion
  );
  console.log(" presentacion creada: ", result);
  return result;
}

async function deletepresentacion( Id) {
  let result;
  result = await axios.delete("https://localhost:44309/Presentacion/Delete?id="+Id);
  console.log(" presentacion Eliminada con exito: ", result);
  return result.data;
}

async function updatepresentacion(presentacion) {
  let result;
  result = await axios.put(
    "https://localhost:44309/Presentacion/Update",
    presentacion
  );
  console.log(" presentacion Actualizada: ", result);
  return result;
}

export {
    presentacionGetList,
    updatepresentacion,
    deletepresentacion,
    createpresentacion,
    presentacionGet
  };