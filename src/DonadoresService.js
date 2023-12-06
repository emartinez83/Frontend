// DonadorService.js

const API_URL = 'https://localhost:4001'; // Reemplaza esto con la URL de tu API

export default {
  async getDonadores() {
    try {
      const response = await fetch(`${API_URL}/don/donadores`);
      const data = await response.json();
      return data.map(({ createdAt, updatedAt, ...donador }) => donador); // Excluye createdAt y updatedAt
    } catch (error) {
      throw new Error('Error al obtener donadores');
    }
  },

  async addDonador(nuevoDonador) {
    try {
      const response = await fetch(`${API_URL}/don/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoDonador),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al agregar donador');
    }
  },

  editDonador(id, donador) {
    return fetch(`${API_URL}/don/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donador),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  async deleteDonador(id) {
    try {
      const response = await fetch(`${API_URL}/don/eliminar/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al eliminar donador');
    }
  },
};
