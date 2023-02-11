import axios from "axios";

async function usersGetList() {
  let result;
  result = await axios.get(
     "https://localhost:44309/User/GetList"
  );
  return result.data;
}



async function usersGet(Id) {
  let result;
  result = await axios.get(
     "https://localhost:44309/User/Get?id=" +Id);
  console.log("GETRESULT: ", result.data);
  return result.data;
}
async function createUser(user) {
  let result;
  result = await axios.post(
    "https://localhost:44309/User/Create",
    user
  );
  console.log("usuario creado: ", result);
  return result;
}

async function deleteUser( Id) {
  let result;
  result = await axios.delete("https://localhost:44309/User/Delete?idUser="+Id);
  console.log("usuario Eliminado con exito: ", result);
  return result.data;
}

async function updateUser(user) {
  let result;
  result = await axios.put(
    "https://localhost:44309/User/Update",
 user
  );
  console.log("usuario Actualizada: ", result);
  return result;
}



async function loginUser (userToLogin) {
  let result
  console.log('USUARIO: ', userToLogin)
  result = await axios
    .post(
      'https://localhost:44309/auth/login',
      userToLogin
    )
    .then(data => {
      console.log(data)
      return data.data
    })
    .catch(error => {
      return error.response.data
    })
  console.log('LoginData: ', result)
  return result
}
export {
  usersGetList,
  loginUser,
  updateUser,
  deleteUser,
  createUser,
  usersGet,
}

