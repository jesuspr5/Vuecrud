import axios from "axios";

async function medicinaGetList() {
  let result;
  result = await axios.get(
     "https://localhost:44309/Medicina/GetList"
  );
  return result.data;
}



async function medicinaGet(IdM) {
  let result;
  result = await axios.get(
     "https://localhost:44309/Medicina/Get?id=" +IdM);
  console.log("GETRESULT: ", result.data);
  return result.data;
}
async function createmedicina(medicinaCreate) {
  let result;
  result = await axios.post(
    "https://localhost:44309/Medicina/Create",
    medicinaCreate
  );
  console.log("medicina creada: ", result);
  return result;
}

async function deletemedicina( IdM) {
  let result;
  result = await axios.delete("https://localhost:44309/Medicina/Delete?id="+IdM);
  console.log("medicina Eliminada con exito: ", result);
  return result.data;
}

async function updatemedicina(medicinaUpdate) {
  let result;
  result = await axios.put(
    "https://localhost:44309/Medicina/Update",
    medicinaUpdate
  );
  console.log("Blog Actualizado: ", result);
  return result;
}






export {
  medicinaGetList,
  updatemedicina,
  deletemedicina,
  createmedicina,
  medicinaGet
};
