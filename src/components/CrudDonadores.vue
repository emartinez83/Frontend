<template>
  <v-container>
    <v-card>
      <v-card-title>
        CRUD Table - Donadores
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="agregarDonador">Agregar</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
        >
          <!-- ... otras columnas ... -->

          <!-- Slot para los botones de acciones para cada fila -->
          <template v-slot:item="{ item }">
            <tr>
              <!-- ... tus otras columnas ... -->
              <td>
                <v-btn icon @click="editarItem(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="eliminarItem(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>

          <!-- ... otras columnas ... -->
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Dialogo de Agregar Donador -->
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>
          {{ donadorActual ? 'Editar Donador' : 'Agregar Nuevo Donador' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="donadorActual ? editarDonador : agregarDonador">
            <v-text-field v-model="nuevoDonador.rfc" label="RFC"></v-text-field>
            <v-text-field v-model="nuevoDonador.nombre" label="Nombre"></v-text-field>
            <v-text-field v-model="nuevoDonador.proyectosAsociados" label="Proyectos Asociados"></v-text-field>
            <v-text-field v-model="nuevoDonador.imagen" label="Imagen"></v-text-field>
            <v-text-field v-model="nuevoDonador.cantidadDonada" label="Cantidad Donada"></v-text-field>
            <v-btn type="submit" color="primary">{{ donadorActual ? 'Editar' : 'Agregar' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import DonadorService from '../DonadoresService.js';
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
  VTextField
} from 'vuetify/components';

export default {
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
    VTextField
  },
  setup() {
    const showAgregarDonadorDialog = ref(false);
    const items = ref([]); // Estado y métodos para el diálogo de agregar donador
    const showDialog = ref(false);
    const headers = [
      { text: 'RFC', value: 'rfc' },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Proyectos Asociados', value: 'proyectosAsociados' },
      { text: 'Imagen', value: 'imagen' },
      { text: 'Cantidad Donada', value: 'cantidadDonada' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ];
    const nuevoDonador = ref({
      rfc: '',
      nombre: '',
      proyectosAsociados: '',
      imagen: '',
      cantidadDonada: 0,
    });
    const donadorActual = ref(null);

    const editarDonador = () => {
      DonadorService.editDonador(donadorActual.value.id, nuevoDonador.value)
        .then(() => {
          cargarDonadores();
          cerrarDialog();
          nuevoDonador.value = {
            rfc: '',
            nombre: '',
            proyectosAsociados: '',
            imagen: '',
            cantidadDonada: 0,
          };
        })
        .catch(error => {
          console.error('Error al editar donador:', error);
        });
    };

    const abrirDialog = (donador) => {
      donadorActual.value = donador;
      showDialog.value = true;
    };

    const cerrarAgregarDonadorDialog = () => {
      showAgregarDonadorDialog.value = false;
      // Limpiar el formulario
      nuevoDonador.value = {
        rfc: '',
        nombre: '',
        proyectosAsociados: '',
        imagen: '',
        cantidadDonada: 0,
      };
    };
    const abrirAgregarDonadorDialog = () => {
      showAgregarDonadorDialog.value = true;
    };

    const cargarDonadores = () => {
      DonadorService.getDonadores()
        .then(data => {
          console.log(data);
          items.value = data.map(({ createdAt, ...rest }) => rest);
        })
        .catch(error => {
          console.error('Error al cargar donadores:', error);
        });
    };

    const agregarDonador = () => {
      // Lógica para enviar la solicitud de agregar donador
      DonadorService.addDonador(nuevoDonador.value)
        .then(() => {
          // Actualizar la tabla después de agregar
          cargarDonadores();
          // Cerrar el diálogo
          cerrarAgregarDonadorDialog();
        })
        .catch(error => {
          console.error('Error al agregar donador:', error);
        });
    };
    const eliminarItem = (donador) => {
      const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este donador?');
      if (confirmarEliminar) {
        eliminarDonador(donador.id);
      }
    };


    const eliminarDonador = (id) => {
      const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este donador?');
      if (confirmarEliminar) {
        DonadorService.deleteDonador(id)
          .then(() => {
            cargarDonadores();
          })
          .catch(error => {
            console.error('Error al eliminar donador:', error);
          });
      }
    };

    onMounted(() => {
      cargarDonadores();
    });

    const editarItem = (donador) => {
      donadorActual.value = { ...donador };
      abrirDialog();
    };


    return {
      headers,
      showAgregarDonadorDialog,
      nuevoDonador,
      donadorActual,
      abrirAgregarDonadorDialog,
      cerrarAgregarDonadorDialog,
      agregarDonador,
      items,
      showDialog,
      editarDonador,
      eliminarDonador,
      editarItem,
      eliminarItem,
    };
  }
};
</script>
