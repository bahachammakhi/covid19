import { axiosPost, axiosGet, axiosPatch, axiosDelete, Response, axiosPut } from './http';
import query from 'querystring';
import axios from 'axios';
const authorizationBearer = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${authorizationBearer}`,
  },
};
const encodePost = (url, data) => {
  return axios.post(`https://api-covid19.wereact.co/${url}`, query.stringify(data), config);
};
const encodePatch = (url, data) => {
  return axios.patch(`https://api-covid19.wereact.co/${url}`, query.stringify(data), config);
};
export const getStart = () => axiosGet('starships/9/');

// export const loginRequest = data =>
//   axios.post('https://api-covid19.wereact.co/auth/login', query.stringify(data), config);
export const loginRequest = data => encodePost('/auth/login', data);
export const addSuspect = data => axiosPost('/suspect', { data });
export const getSuspects = () => axiosGet('/suspect');
export const updateSuspect = (data, id) => axiosPatch(`/suspect/${id}`, { data });
export const deleteSuspect = id => axiosDelete(`/suspect/${id}`);
export const getBraclets = () => axiosGet('/bracelet');
export const addBraclet = data => encodePost('/bracelet', data);
export const updateBraclet = (data, id) => encodePatch(`/bracelet/${id}`, data);
export const deleteBraclet = id => axiosDelete(`/bracelet/${id}`);
export const getUsers = () => axiosGet('/user');
export const addUser = data => encodePost('/user', data);
export const updateUser = (data, id) => encodePatch(`/user/${id}`, data);
export const deleteUser = id => axiosDelete(`/user/${id}`);
export const refreshRequest = refreshToken => encodePost('/refreshtoken', refreshToken);
