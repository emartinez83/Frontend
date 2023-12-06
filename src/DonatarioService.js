// DonatarioService.js
import axios from 'axios';

const API_URL = 'https://localhost:4001';

export default {
  getDonatarios() {

    return axios.get(`${API_URL}/dont/donatarios`)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

  addDonatario(nuevoDonatario, token) {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    return axios.post(`${API_URL}/dont/crear`, nuevoDonatario, config)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

  editDonatario(id, donatarioActualizado,token) {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    return axios.put(`${API_URL}/dont/actualizar/${id}`, donatarioActualizado,config)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

  deleteDonatario(id,token) {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    return axios.delete(`${API_URL}/dont/eliminar/${id}`,config)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }
};
