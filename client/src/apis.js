import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/user';

const API = axios.create({
  baseURL: baseUrl,
});

export const registerUser = (data) => {
  return API.post('/register', data);
};
export const loginUser = (data) => {
  return API.post('/login', data);
};
export const getAllUsers = () => {
  return API.get('/getAllusers');
};

export const deleteUsers = (ids) => {
  return API.delete('/delete-user', ids);
};
