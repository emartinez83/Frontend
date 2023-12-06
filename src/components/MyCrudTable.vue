<template>
  <v-container>
    <v-card>
      <v-card-title>
        CRUD Table - Proyectos
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="agregarProyecto">Agregar</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
        <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.imagen }}</td>
              <td>{{ item.donatario }}</td>
              <td>{{ item.donadores }}</td>
              <td>{{ item.cantidadDonada }}</td>
              <td>
                <v-btn icon @click="editarItem(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="eliminarProyecto(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>
          {{ proyectoActual ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="editarProyecto">
            <v-text-field v-model="proyectoActual.nombre" label="Nombre"></v-text-field>
            <v-textarea v-model="proyectoActual.descripcion" label="Descripción"></v-textarea>
            <v-text-field v-model="proyectoActual.donatario" label="Donatario"></v-text-field>
            <v-text-field v-model="proyectoActual.donadores" label="Donadores"></v-text-field>
            <v-text-field v-model="proyectoActual.cantidadDonada" label="Cantidad Donada" type="number"></v-text-field>
            <v-btn type="submit" color="primary">{{ proyectoActual ? 'Editar' : 'Agregar' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
// Importa tus referencias y funciones necesarias
import { ref, onMounted } from 'vue';
import ProyectoService from '../ProyectoService.js'; // Asegúrate de que la ruta sea correcta
import {
  VContainer,
  VCard,
  VCardTitle,
  VCardText,
  VDataTable,
  VIcon,
  VBtn,
  VSpacer,
  VImg,
  VDialog,
  VForm,
  VTextField,
  VTextarea, // Asegúrate de importar el componente VTextarea
} from 'vuetify/components';

export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Imagen', value: 'imagen' },
        { text: 'Donatario', value: 'donatario' },
        { text: 'Donadores', value: 'donadores' },
        { text: 'Cantidad Donada', value: 'cantidadDonada' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      items: [],
      showDialog: false,
      nuevoProyecto: {
        nombre: '',
        descripcion: '',
        donatario: '',
        donadores: '',
        cantidadDonada: 0,
      },
      proyectoActual: null,
    };
  },
  methods: {
    cargarProyectos() {
      ProyectoService.getProyectos()
        .then(data => {
          this.items = data;
        })
        .catch(error => {
          console.error('Error al cargar proyectos:', error);
        });
      const token = localStorage.getItem('token');
      console.log('Token:', token);
    },

    agregarProyecto() {
      // Obtén el token de LocalStorage o Vuex
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Manejar caso en el que el token no está presente
        console.error('Token no encontrado o inválido');
        return;
      }
      ProyectoService.addProyecto(this.nuevoProyecto, token)
        .then(nuevoProyectoDesdeBD => {
          // Verifica si imagen es null y establece una imagen predeterminada en su lugar
          const imagenPredeterminada = nuevoProyectoDesdeBD.imagen || 'ruta_default.jpg';

          // Agregar el nuevo proyecto a la lista local
          this.items.push({ ...nuevoProyectoDesdeBD, imagen: imagenPredeterminada });
          this.cerrarDialog();  // Cierra el diálogo después de agregar un proyecto
        })
        .catch(error => {
          console.error('Error al agregar proyecto:', error);
        });
    },


    abrirDialog(proyecto = null) {
      this.proyectoActual = proyecto ? { ...proyecto } : { nombre: '', descripcion: '', donatario: '', donadores: '', cantidadDonada: 0 };
      this.showDialog = true;
    },
    editarItem(item) {
      this.abrirDialog(item);
    },


    editarProyecto() {
      // Obtén el toke de LocalStorage o Vuex
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Manejar caso en el que el token no está presente
        console.error('Token no encontrado o inválido');
        return;
      }

      const { id, ...proyectoActualizado } = this.proyectoActual;

      ProyectoService.editProyecto(id, proyectoActualizado, token)
        .then(() => {
          // Actualizar el objeto proyecto en la lista local
          const indice = this.items.findIndex(p => p.id === id);
          if (indice !== -1) {
            this.items[indice] = { id, ...proyectoActualizado };
          }

          this.cerrarDialog();
          this.cargarProyectos();// Cierra el diálogo después de editar un proyecto
        })
        .catch(error => {
          console.error('Error al editar proyecto:', error);
        });
    },



    eliminarProyecto(id) {
      // Obtén el token de LocalStorage o Vuex
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Manejar caso en el que el token no está presente
        console.error('Token no encontrado o inválido');
        return;
      }
      ProyectoService.deleteProyecto(id, token)
        .then(() => {
          // Filtra la lista local para quitar el proyecto eliminado
          this.items = this.items.filter(p => p.id !== id);
        })
        .catch(error => {
          console.error('Error al eliminar proyecto:', error);
        });
    },
    cerrarDialog() {
      this.showDialog = false;
      // Limpiar el formulario
      this.nuevoProyecto = {
        nombre: '',
        descripcion: '',
        donatario: '',
        donadores: '',
        cantidadDonada: 0,
      };
    },
  },
  components: {
    VContainer,
    VCard,
    VCardTitle,
    VCardText,
    VDataTable,
    VIcon,
    VBtn,
    VSpacer,
    VImg,
    VDialog,
    VForm,
    VTextField,
    VTextarea, // Asegúrate de agregar el componente VTextarea
  },
  mounted() {
    this.cargarProyectos();
  },
};
</script>
