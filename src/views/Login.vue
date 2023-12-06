<template>
  <div class="login-container">
    <v-card class="login-card" elevation="10">
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="iniciarSesion">
          <v-text-field v-model="correo" label="Correo" outlined dense required></v-text-field>
          <v-text-field v-model="contrasena" label="Contraseña" type="password" outlined dense required></v-text-field>
          <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>

          <!-- Botón para iniciar sesión con Google -->
          <div class="g-signin2" data-onsuccess="onGoogleSignIn"></div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AuthService from '@/AuthService';
export default {
  data() {
    return {
      correo: '',
      contrasena: '',
    };
  },
  methods: {
    iniciarSesion() {
      // Llama al método login del AuthService
      AuthService.login({ correo: this.correo, contrasena: this.contrasena })
        .then(data => {
          // Manejar la respuesta del servicio de autenticación
          const token = data.token;

          // Almacena el token de manera segura en el frontend (LocalStorage, cookies, Vuex, etc.)
          localStorage.setItem('token', token);

          // Redirige a la siguiente página o realiza otras acciones necesarias
          this.$router.push('/home'); // Ejemplo de redirección a la página de dashboard
        })
        .catch(error => {
          // Manejar el error de autenticación
          console.error('Error al iniciar sesión:', error);
        });
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.headline {
  color: #4caf50;
}

.v-btn {
  margin-top: 10px; /* Espacio entre los botones */
}
</style>
