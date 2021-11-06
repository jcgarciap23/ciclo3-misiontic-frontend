<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><strong>Servicios Adquiridos</strong></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';
  export default {
    name: 'ServicesAdq',
    data: () => ({
      headers: [
        {
          text: 'Id del Pedido',
          align: 'start',
          sortable: false,
          value: 'idpedido',
        },
        { text: 'Fecha', value: 'date' },
        { text: 'Id del Servicio', value: 'idservicio_id' },
        { text: 'Nombre del Servicio', value: 'name' },
        { text: 'Total por Hora', value: 'totalHours' },
        { text: 'Total del Servicio', value: 'total' },
        { text: 'Estado', value: 'status' },
        { text: 'Id del Proveedor', value: 'idproveedor' },
      ],
      desserts: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize() {
        let token  = localStorage.getItem("tokenAccess");
        let userId = jwt_decode(token).user_id.toString();
        axios.get(`http://127.0.0.1:8000/api/pedido/buscarxCli/${userId}/`,
        {headers: {'Authorization': `Bearer ${token}`}}) 
        .then((result) => {
            result = result.data.Pedidos;
            console.log(result)
            this.desserts = result
            this.desserts.forEach(element => {
                if(element.status==1){
                    
                }
            });
       
        });
      },
    },
  }
</script>