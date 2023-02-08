import axios from 'axios'

async function usersGetList () {
  let result
  result = await axios.get(
    'https://as-humedal-api.azurewebsites.net/Users/GetList?Page=1&Rows=123123'
  )
  return result.data.data.items
}

async function usersGet (IdUserLanding) {
  let result
  result = await axios.get(
    '' +
      IdUserLanding
  )
  console.log('GETRESULT: ', result.data.data)
  return result.data.data
}
async function createUser (userToCreate) {
  let result
  result = await axios.post(
    '',
    userToCreate
  )
  console.log('Usuario creado: ', result)
  return result
}

async function deleteUser (IdUserLanding) {
  let result
  result = await axios.delete(
    '' +
      IdUserLanding
  )
  console.log('Usuario Eliminado: ', result)
  return result
}

async function updateUser (userToUpdate) {
  let result
  result = await axios.post(
    '',
    userToUpdate
  )
  console.log('Usuario Actualizado: ', result)
  return result
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
