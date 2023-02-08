import axios from "axios";

async function sucursalGetList() {
  let result;
  result = await axios.get(
     "https://localhost:44309/Sucursal/GetList"
  );
  return result.data;
}



async function sucursalGet(Id) {
  let result;
  result = await axios.get(
     "https://localhost:44309/Sucursal/Get?id=" +Id);
  console.log("GETRESULT: ", result.data);
  return result.data;
}
async function createsucursal(sucursal) {
  let result;
  result = await axios.post(
    "https://localhost:44309/Sucursal/Create",
    sucursal
  );
  console.log("sucursal creada: ", result);
  return result;
}

async function deletesucursal( Id) {
  let result;
  result = await axios.delete("https://localhost:44309/Sucursal/Delete?id="+Id);
  console.log("sucursal Eliminada con exito: ", result);
  return result.data;
}

async function updatesucursal(sucursal) {
  let result;
  result = await axios.put(
    "https://localhost:44309/Sucursal/Update",
   sucursal
  );
  console.log("sucursal Actualizada: ", result);
  return result;
}






export {
  sucursalGetList,
  updatesucursal,
  deletesucursal,
  createsucursal,
  sucursalGet
};