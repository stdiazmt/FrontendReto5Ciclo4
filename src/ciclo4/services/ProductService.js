import http from './http-config';

const getAll = ()=> {
  return http.get("/chocolate/all");
}

const get = (reference)=> {
  return http.get(`/chocolate/${reference}`);
}

const create = (data)=> {
  return http.post(`/chocolate/new`, data);
}

const update = (data) =>{
  return http.put(`/chocolate/update`, data);
}

const remove = (reference)=> {
  return http.delete(`/chocolate/${reference}`);
}

const findByPrice = (price) => {
  return http.get(`/chocolate?precio=${price}`);
}

const findByCategory = (category) => {
    return http.get(`/chocolate?categoria=${category}`);
}

const findByName = (name) => {
    return http.get(`/chocolate?nombre=${name}`);
}
const getAllCategories = ()=>{
  return http.get(`/chocolate/categorias`);
}

const getByLessOrEqualPrice=(price)=>{
  return http.get(`/chocolate/price/${price}`);
}

const getByWord=(word)=>{
  return http.get(`chocolate/description/${word}`);
}
const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  findByPrice,
  findByCategory,
  findByName,
  getAllCategories,
  getByLessOrEqualPrice,
  getByWord
}
export default exportedObject;

  
