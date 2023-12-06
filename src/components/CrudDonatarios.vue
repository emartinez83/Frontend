<template>
  <v-container>
    <v-card>
      <v-card-title>
        CRUD Table - Donatarios
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="agregarDonatarioDefault">Agregar</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <!-- Slot para los botones de acciones para cada fila -->
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.RFC }}</td>
              <td>{{ item.Nombre }}</td>
              <td>{{ item.ProyectoAsociado }}</td>
              <td>{{ item.ImagenDonatario }}</td>
              <td>
                <v-btn icon @click="abrirDialog(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="eliminarDonatario(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Dialogo de Agregar Donatario -->
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>
          {{ modoEdicion ? 'Editar Donatario' : 'Agregar Nuevo Donatario' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="editarDonatario($event)">
          <v-text-field v-model="nuevoDonatario.RFC" label="RFC"></v-text-field>
            <v-text-field v-model="nuevoDonatario.Nombre" label="Nombre"></v-text-field>
            <v-textarea v-model="nuevoDonatario.ProyectoAsociado" label="Proyecto asociado"></v-textarea>
            <v-text-field v-model="nuevoDonatario.ImagenDonatario" label="Imagen donatario"></v-text-field>
            <v-btn type="submit" color="primary">{{ modoEdicion ? 'Editar' : 'Agregar' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import DonatarioService from '../DonatarioService.js';
import {
  VContainer,
  VCard,
  VCardTitle,
  VCardText,
  VDataTable,
  VIcon,
  VBtn,
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
    VImg,
    VDialog,
    VForm,
    VTextField
  },
  setup() {
    const headers = [
      { text: 'Imagen Donatario', value: 'ImagenDonatario' },
      { text: 'RFC', value: 'RFC' },
      { text: 'Nombre', value: 'Nombre' },
      { text: 'Proyecto Asociado', value: 'ProyectoAsociado' },
    ];

    const donatarioActual = ref(null);

    const items = ref([]);
    const donatarioSeleccionado = ref(null);

    const cargarDonatarios = () => {
      DonatarioService.getDonatarios()
        .then(data => {
          // Excluir createdAt de los datos antes de mostrarlos
          items.value = data.map(({ createdAt, ...rest }, index) => ({ id: index + 1, ...rest }));
        })
        .catch(error => {
          console.error('Error al cargar donatarios:', error);
        });
    };

    // Estado y métodos para el diálogo de agregar donatario
    const showDialog = ref(false);
    const nuevoDonatario = ref({
      RFC: '',
      Nombre: '',
      ProyectoAsociado: '',
      ImagenDonatario: ''
    });

    const agregarDonatario = () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Manejar caso en el que el token no está presente
        console.error('Token no encontrado o inválido');
        return;
      }

      // Validar que los campos requeridos tengan valores antes de agregar el donatario
      if (!nuevoDonatario.value.RFC || !nuevoDonatario.value.Nombre || !nuevoDonatario.value.ProyectoAsociado) {
        console.error('Error: RFC, Nombre o ProyectoAsociado no pueden ser nulos.');
        return;
      }

      DonatarioService.addDonatario(nuevoDonatario.value, token)
        .then(() => {
          cargarDonatarios();
          cerrarDialog();
        })
        .catch(error => {
          console.error('Error al agregar donatario:', error);
        });
    };

    const agregarDonatarioDefault = () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Manejar caso en el que el token no está presente
        console.error('Token no encontrado o inválido');
        return;
      }

      const donatarioDefault = {
        RFC: 'DefaultRFC',
        Nombre: 'DefaultNombre',
        ProyectoAsociado: 'DefaultProyecto',
        ImagenDonatario: 'DefaultImagenURL'
      };

      DonatarioService.addDonatario(donatarioDefault, token)
        .then(() => {
          cargarDonatarios();
        })
        .catch(error => {
          console.error('Error al agregar donatario:', error);
        });
    };

    const editarDonatario = () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        console.error('Token no encontrado o inválido');
        return;
      }

      // Obtén el ID del donatario seleccionado
      const id = donatarioSeleccionado.value ? donatarioSeleccionado.value.id : null;

      if (id === null) {
        console.error('ID de donatario no encontrado');
        return;
      }

      DonatarioService.editDonatario(id, nuevoDonatario.value, token)
        .then(() => {
          cargarDonatarios();
          cerrarDialog();
        })
        .catch(error => {
          console.error('Error al editar donatario:', error);
        });
    };



    const eliminarDonatario = (id) => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        // Manejar caso en el que el token no está presente
        console.error('Token no encontrado o inválido');
        return;
      }

      DonatarioService.deleteDonatario(id,token)
        .then(() => {
          cargarDonatarios();
        })
        .catch(error => {
          console.error('Error al eliminar donatario:', error);
        });
    };

    const modoEdicion = ref(false); // Agrega esta línea
    const abrirDialog = (donatario = null) => {
      modoEdicion.value = donatario !== null;

      if (modoEdicion.value) {
        // Si estás en modo de edición, guarda el donatario seleccionado
        donatarioSeleccionado.value = donatario;
        console.log('Donatario seleccionado:', donatarioSeleccionado.value);
        // Asigna los valores del donatario a nuevoDonatario
        nuevoDonatario.value = { ...donatario };
      } else {
        // Si no estás en modo de edición, reinicia nuevoDonatario
        nuevoDonatario.value = {
          RFC: '',
          Nombre: '',
          ProyectoAsociado: '',
          ImagenDonatario: ''
        };
      }
      showDialog.value = true;
    };



    const cerrarDialog = () => {
      showDialog.value = false;
      nuevoDonatario.value.RFC = '';
      nuevoDonatario.value.Nombre = '';
      nuevoDonatario.value.ProyectoAsociado = '';
      nuevoDonatario.value.ImagenDonatario = '';
    };

    const actualizarCampo = (campo) => {
      nuevoDonatario.value[campo] = event.target.value;
    };

    onMounted(() => {
      cargarDonatarios();
    });

    return {
      items,
      headers,
      modoEdicion,
      showDialog,
      nuevoDonatario,
      agregarDonatario,
      agregarDonatarioDefault,
      editarDonatario,
      eliminarDonatario,
      abrirDialog,
      cerrarDialog,
      actualizarCampo
    };
  }
};
</script>
