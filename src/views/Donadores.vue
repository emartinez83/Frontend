<template>
  <Donadores></Donadores>
  <barra-lateral></barra-lateral>

</template>

<script>
import Donadores from '@/components/CrudDonadores.vue';
import BarraLateral from "@/components/BarraLateral.vue"; // Asegúrate de que la ruta sea correcta

export default {
  components: {
    BarraLateral,
    Donadores
  }
}
</script>
