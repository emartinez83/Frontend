// ProyectoService.js
import axios from 'axios';

const API_URL = 'https://localhost:4001';  // Reemplaza esto con tu URL de backend


export default {
  getProyectos() {
    return axios.get(`${API_URL}/proyect/proyectos`)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

  // Agrega otros métodos según tus necesidades, por ejemplo:

  addProyecto(nuevoProyecto, token) {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    return axios.post(`${API_URL}/proyect/crear`, nuevoProyecto, config)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

// ...


  editProyecto(id, proyectoActualizado,token) {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    return axios.put(`${API_URL}/proyect/actualizar/${id}`, proyectoActualizado,config)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },


  deleteProyecto(id, token) {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const url = `${API_URL}/proyect/eliminar/${id}`;
    console.log('URL DELETE:', url); // Agrega esta línea para imprimir la URL
    return axios.delete(url, config)
       .then(response => response.data)
       .catch(error => Promise.reject(error));
   }
};
