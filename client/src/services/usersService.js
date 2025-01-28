import api from "./api";

const usersService = {
  postUsers: (data) => {
    return api.post("/users", data);
  },
  getUsers: () => {
    return api.get("/users");
  },
  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },
  putUsers: (id, data) => {
    return api.put(`/users/${id}`, data);
  },
  deleteUsers: (id) => {
    return api.delete(`/users/${id}`);
  },
};

export default usersService;
