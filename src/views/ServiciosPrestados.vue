<template>
    <body>
      <Servicio/>
    </body>
</template>

<script>
import Servicio from '../components/ServiciosPrestados.vue';
export default {
  name: 'ServiciosPrestados',
  data: () => ({
    //
  }),
  components:{
      Servicio
  }
};
</script>

<style>
body{
  background-color: #CFD8DC;
}
</style>