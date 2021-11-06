<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm3 v-for="(dato,i) in datos" :key="i">
        <v-card :loading="loading" class="mx-auto my-12" max-width="274">

          <template slot="progress">
            <v-progress-linear
              color="orange lighten-1"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            v-bind:src="`https://res.cloudinary.com/dgtwrzhim/image/upload/v1/${datos[i].image}`"
          ></v-img>

          <v-card-title>{{datos[i].name}}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text ms-2">
                ~Precio por hora
              </div>
            </v-row>
            <div class="my-2 text-subtitle-1 ms-2">
              <strong>${{datos[i].price_hour}}</strong>
            </div>
            <div class="grey--text ms-2">
              Horas: 
              <input v-model="horas" type="number">
            </div>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-layout column align-center>
              <v-flex>
                <v-icon color="light-blue darken-2">{{ iconCarrito }}</v-icon>
                <v-btn color="light-blue darken-2" text @click="agregar(i)">
                  Agregar al carrito
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn color="orange lighten-1" text>
                  Ver detalles
                </v-btn>
                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                {{datos[i].description}}
              </v-card-text>
            </div>
          </v-expand-transition>

        </v-card> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: 'Catalogo',
  data: () => ({
    loading: false,
    show: false,
    iconCarrito: 'mdi-cart',
    datos: [],
    horas: 0,
  }),

  mounted() {
    this.init();
  },

  methods: {
    agregar(i) {
      this.loading = true
      setTimeout(() => (this.loading = false), 1000)
      if(this.horas==0){
        alert("No puede ser 0 horas")
      }else{
        this.carrito(this.datos[i])
      }
    },
    init(){
      axios.get("http://127.0.0.1:8000/api/services/list/")
        .then((result) => {
            this.datos = result.data.servicios;
        });
    },
    carrito(data){
      axios.post("http://127.0.0.1:8000/api/carrito/metodos/", {
        idservicio: data.idservice,
        horas: this.horas
      })
        .then((result) => {
            this.result = result.data;
            console.log(result.data)
            alert("Agregado al carrito")
        });
      this.horas = 0
    }
  },
}
</script>
