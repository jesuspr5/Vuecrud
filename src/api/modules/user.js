import axios from "axios";

async function userGetList() {
  let result;
  result = await axios.get(
     "https://localhost:44309/User/GetList"
  );
  return result.data;
}



async function userGet(Id) {
  let result;
  result = await axios.get(
     "https://localhost:44309/User/Get?id=" +Id);
  console.log("GETRESULT: ", result.data);
  return result.data;
}
async function createUser(rol) {
  let result;
  result = await axios.post(
    "https://localhost:44309/User/Create",
    rol
  );
  console.log("usuario creado: ", result);
  return result;
}

async function deleteUser( Id) {
  let result;
  result = await axios.delete("https://localhost:44309/User/Delete?idRol="+Id);
  console.log("usuario Eliminado con exito: ", result);
  return result.data;
}

async function updateUser(user) {
  let result;
  result = await axios.put(
    "https://localhost:44309/User/Update",
   user
  );
  console.log("usuario Actualizado: ", result);
  return result;
}
export {
  userGetList,
  updateUser,
  deleteUser,
  createUser,
  userGet
};