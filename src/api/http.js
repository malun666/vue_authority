/* jshint esversion: 6 */
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

export default {
  getLength() {
    return axios.get('/api/user');
  },
  getUser(num, size) {
    return axios.get(`/api/user?_page=${num}&_limit=${size}`);
  },
  modifyUser(id, data) {
    return axios.put(`/api/user/${id}`, data);
  },
  deleteUser(id) {
    return axios.delete(`/api/user/${id}`);
  },
  addUser(data) {
    return axios.post('/api/user', data);
  },
  searchUser(txt) {
    return axios(`/api/user/?q=${txt}`);
  },
  getAllauthority() {
    return axios('/per/permission');
  },
  getCurUserPermission(id) {
    return axios(`/per/user_permission?userId=${id}`);
  },
  userAddPermission(data) {
    return axios.post('/per/user_permission', data);
  },
  userDeletePermission(id) {
    return axios.delete(`/per/user_permission/${id}`);
  },
  getAllRole() {
    return axios('per/role');
  },
  getCurUserRole(id) {
    return axios(`/per/user_role?userId=${id}`);
  },
  userAddRole(data) {
    return axios.post('/per/user_role', data);
  },
  userDeleteRole(id) {
    return axios.delete(`/per/user_role/${id}`);
  },
  loadUserPer(id) {
    return axios.get(`/per/getUserPer/${id}`);
  }
};
