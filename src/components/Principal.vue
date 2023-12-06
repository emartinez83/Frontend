<template>
  <v-container class="align-center">
    <v-responsive class="align-center text-center fill-height">
      <v-img
        src="@/assets/donacion.png"
      height="400"
      contain
      ></v-img>

      <h1 class="text-h2 font-weight-bold mb-6">Hola de nuevo</h1>

      <v-row class="d-flex align-center justify-center flex-column">
        <v-col cols="auto">
          <router-link to="/donadores" tag="v-btn" min-width="200" rel="noopener noreferrer" variant="outlined">
            <v-icon size="large" class="mr-2">mdi-account-group</v-icon>
            Donadores
          </router-link>
        </v-col>
        <div class="py-2" />
        <v-col cols="auto">
          <router-link to="/proyectos" tag="v-btn" min-width="200" rel="noopener noreferrer" variant="outlined">
            <v-icon size="large" class="mr-2">mdi-account-group</v-icon>
            Proyectos
          </router-link>
        </v-col>
        <div class="py-2" />
        <v-col cols="auto">
          <router-link to="/donatarios" tag="v-btn" min-width="200" rel="noopener noreferrer" variant="outlined">
            <v-icon size="large" class="mr-2">mdi-account-group</v-icon>
            Donatarios
          </router-link>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
//
</script>

<style scoped>
/* Estilos adicionales para hacerlo más llamativo */
.v-btn {
  background-color: #3f51b5; /* Cambia el color de fondo según tu preferencia */
  color: white;
  font-weight: bold;
}

.v-btn:hover {
  background-color: #2f3a80; /* Cambia el color de fondo al pasar el mouse */
}
</style>
