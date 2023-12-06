// AuthService.js
import axios from 'axios';

const API_URL = 'https://localhost:4001';

export default {
  login(credentials) {
    console.log('Enviando solicitud al backend:', `${API_URL}/verificarCredenciales`, credentials);
    return axios.post(`${API_URL}/verificarCredenciales`, credentials)
      .then(response => {
        console.log('Respuesta del backend:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error en la solicitud al backend:', error.response.data);
        return Promise.reject(error.response.data);
      });
  },
};
