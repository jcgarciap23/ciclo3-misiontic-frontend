<template>
    <body>
      <ServiciosPedidos/>
    </body>
</template>

<script>
import ServiciosPedidos from '../components/ServiciosPedidos.vue';
export default {
  name: 'Serviciospedidos',
  data: () => ({
    //
  }),
  components:{
      ServiciosPedidos
  }
};
</script>

<style>
body{
  background-color: #CFD8DC;
}
</style>