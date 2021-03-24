import api from "./api";

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  }
}
async function getById(id) {
  return await api.get(`/books/${id}`);

}
async function create(data) {
  return await api.post(`/user/books`, data);
}

async function update(id,data) {
  return await api.put(`/user/books/${id}`, data);
}
async function deleteBook(id) {
  return await api.delete(`user/books/${id}`);
}
export const Books = {
  getById,
  create,
  update,
  deleteBook,
};
