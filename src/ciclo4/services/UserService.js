import http from "./http-config";
const getAll = () => {
  return http.get("/user/all");
};

const get = (id) => {
  return http.get(`/user/${id}`);
};

const create = (data) => {
  return http.post(`/user/new`, data);
};

const update = (data) => {
  return http.put(`/user/update`, data);
};

const remove = (id) => {
  return http.delete(`/user/${id}`);
};
const validateEmail =(email)=>{
    return http.get(`/user/emailexist/${email}`)
}

const login = (email,password)=>{
    return http.get(`/user/${email}/${password}`)
}

const getByBirthMonth=(month)=>{
  return http.get(`/user/birthday/${month}`)
}
const exportedObject = {
  getAll,
  get,
  create,
  update,
  remove,
  validateEmail,
  login,
  getByBirthMonth
};
export default exportedObject;
