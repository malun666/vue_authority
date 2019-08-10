/* jshint esversion: 6 */
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

export default {
  getLength() {
    return axios('/api/user');
  },
  getUser(url) {
    return axios(url);
  },
  modifyUser(url, data) {
    return axios.put(url, data);
  },
  deleteUser(url) {
    return axios.delete(url);
  },
  addUser(url, data) {
    return axios.put(url, data);
  },
  searchUser(url) {
    return axios(url);
  },
  getAllauthority() {
    return axios('/per/permission');
  },
  getCurUserPermission(url) {
    return axios(url);
  },
  userAddPermission(url, data) {
    return axios.post(url, data);
  },
  userDeletePermission(url) {
    return axios.delete(url);
  },
  getAllRole() {
    return axios('per/role');
  },
  getCurUserRole(url) {
    return axios(url);
  },
  userAddRole(url, data) {
    return axios.post(url, data);
  },
  userDeleteRole(url) {
    return axios.delete(url);
  }
};
