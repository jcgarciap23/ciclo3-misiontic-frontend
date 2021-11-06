<template>
    <body>
      <Crudservicio/>
    </body>
</template>

<script>
import Crudservicio from '../components/crudservicios.vue';
export default {
  name: 'PerfilProveedor',
  data: () => ({
    //
  }),
  components:{
      Crudservicio
  }
};
</script>

<style>
body{
  background-color: #CFD8DC;
}
</style>