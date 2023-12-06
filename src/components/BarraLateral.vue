<template>
      <v-navigation-drawer
        expand-on-hover
        rail
        width="300"
      >
        <v-list>
          <v-list-item
            title="DONA"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="navigate('Donatarios')" prepend-icon="mdi-account-group" title="Donatarios"></v-list-item>
          <v-list-item @click="navigate('Donadores')" prepend-icon="mdi-account-multiple-plus" title="Donadores" value="shared"></v-list-item>
          <v-list-item @click="navigate('Proyectos')" prepend-icon="mdi-folder" title="Proyectos" value="starred"></v-list-item>
          <v-list-item @click="navigate('Home')" prepend-icon="mdi-home" title="Pagina Principal" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

  <v-main>
    <!-- Contenido principal -->
    <router-view></router-view>
  </v-main>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Modelo para controlar el estado de la barra lateral
const drawer = ref(true)

// Observador para cerrar la barra lateral cuando cambia la ruta
watch(
() => router.currentRoute.value,
() => {
drawer.value = false
}
)

// Ejemplo de función para navegar
function navigate(routeName) {
router.push({ name: routeName })
}
</script>
