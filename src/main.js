import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'
const app = createApp(App);

const vuetify = createVuetify(); // Opciones de Vuetify si las hay
app.use(vuetify);
app.use(router); // Asegúrate de usar el router después de vuetify

app.mount('#app');
