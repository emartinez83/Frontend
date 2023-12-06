<template>

  <MyCrudTable></MyCrudTable>
  <barra-lateral></barra-lateral>
</template>

<script>
import MyCrudTable from '@/components/CrudDonatarios.vue';
import BarraLateral from "@/components/BarraLateral.vue"; // Asegúrate de que la ruta sea correcta

export default {
  components: {
    BarraLateral,
    MyCrudTable
  }
}
</script>
