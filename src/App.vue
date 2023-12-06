<template>
  <v-app>

    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  mounted() {
    // Agrega un listener para el evento beforeunload o unload
    window.addEventListener('beforeunload', this.limpiarToken);
    // Otra opción: window.addEventListener('unload', this.limpiarToken);
  },
  beforeDestroy() {
    // Elimina el listener antes de destruir el componente
    window.removeEventListener('beforeunload', this.limpiarToken);
    // Otra opción: window.removeEventListener('unload', this.limpiarToken);
  },
  methods: {
    limpiarToken() {
      // Elimina el token del localStorage
      localStorage.removeItem('token');
    },

  },
};
</script>
