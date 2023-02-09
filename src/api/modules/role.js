import axios from "axios";

async function RolGetList() {
  let result;
  result = await axios.get(
     "https://localhost:44309/Rol/GetList"
  );
  return result.data;
}



async function RolGet(Id) {
  let result;
  result = await axios.get(
     "https://localhost:44309/Rol/Get?id=" +Id);
  console.log("GETRESULT: ", result.data);
  return result.data;
}
async function createRol(rol) {
  let result;
  result = await axios.post(
    "https://localhost:44309/Rol/Create",
    rol
  );
  console.log("Rol creada: ", result);
  return result;
}

async function deleteRol( Id) {
  let result;
  result = await axios.delete("https://localhost:44309/Rol/Delete?idRol="+Id);
  console.log("Rol Eliminado con exito: ", result);
  return result.data;
}

async function updateRol(rol) {
  let result;
  result = await axios.put(
    "https://localhost:44309/Rol/Update",
   rol
  );
  console.log("Rol Actualizada: ", result);
  return result;
}
export {
  RolGetList,
  updateRol,
  deleteRol,
  createRol,
  RolGet
};