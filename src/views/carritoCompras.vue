<template>
    <v-container grid-list-md>
        <v-card class="mx-auto" max-width="500">
            <v-layout column align-center>
                <v-flex style="margin-top:20px">

                    <v-row align="center" class="mx-0">
                        <v-data-table
                        :headers="headers"
                        :items="servicios"
                        hide-default-footer
                        class="elevation-1"
                        >
                        </v-data-table>
                    </v-row>
                </v-flex>
            </v-layout>

            <v-layout column align-center >
                <v-flex style="margin-top:15px">
                    
                    <v-row align="center" class="mx-0">
                        <v-col >
                            <v-text-field
                            v-model="saldo"
                            label="Saldo Disponible"
                            outlined
                            readonly
                            >{{ saldo }}</v-text-field>
                        </v-col>
            
                        <v-col >
                            <v-text-field
                                v-model="total"
                                label="Total a pagar"
                                outlined
                                readonly
                            >{{ total }}</v-text-field>
                        </v-col>  
                    </v-row>

     
                    
                    <v-row align="center" class="md-10">
                        <v-col >
                            <router-link to="/catalogo" style="text-decoration: none; color: inherit;">
                                <v-btn color="error" class="ma-2 white--text">
                                    Volver al Catálogo
                                    <v-icon right dark>
                                        mdi-arrow-left-circle
                                    </v-icon>
                                </v-btn>
                            </router-link>
                        </v-col>
                        <v-col >
                            <v-btn color="success" class="ma-2 white--text" @click="pagar()">
                                Pagar
                                <v-icon right dark>
                                    mdi-cash-check
                                </v-icon>
                            </v-btn>
                        </v-col>

                        <v-dialog v-model="dialogPagar" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Total a pagar: {{ total }}</v-card-title>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" text @click="closePagar()">Cancelar</v-btn>
                                <v-btn color="success" text @click="confirmPagar()">Pagar</v-btn>
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogSaldo" max-width="260px">
                            <v-card>
                                <v-card-title class="text-h5">!Saldo Insuficiente¡</v-card-title>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeSaldo()">Aceptar</v-btn>
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-row>
                 
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';
  export default {
    name: 'Carrito',
    data () {
      return {
        headers: [
          {
            text: 'Servicios',
            align: 'start',
            sortable: false,
            value: 'servicio',
          },
          
          { text: 'Precio/hora ($)', value: 'precioxhora' },
          { text: 'Horas', value: 'horas' },
          { text: 'Valor total del Servicio ($)', value: 'totalxservicio' },
          
        ],
        servicios: [
          {
            servicio: '',
            precioxhora: 0,
            horas: 0,
            totalxservicio: 0,
            idservicio: 0,
          },
        ],
        datos: '',
        iconProfile: 'mdi-account-circle',
        total: 0,
        saldo: 0,
        dialogPagar: false,
        dialogSaldo: false,
        idproveedor: 0,
      }
    },

    mounted() {
        this.init();
        this.initSaldo();
    },

    methods: {
        init(){
            axios.get("http://127.0.0.1:8000/api/carrito/metodos/")
            .then((result) => {
                this.datos = result.data.carrito;
                this.datos.forEach(element => {
                    this.total+=element.totalxservicio
                });
                this.servicios = this.datos
            });
        },

        initSaldo(){
            let token  = localStorage.getItem("tokenAccess");
            let userId = jwt_decode(token).user_id.toString();
            axios.get(`http://127.0.0.1:8000/api/users/user/versaldo/${userId}/`, 
            {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                this.saldo = result.data.saldo;
            });
        },

        pagar(){
            if(this.total>this.saldo){
                this.dialogSaldo = true
            }else{
                this.dialogPagar = true
            } 
        },

        closePagar(){
            this.dialogPagar = false
        },

        confirmPagar(){
            let token  = localStorage.getItem("tokenAccess");
            let userId = jwt_decode(token).user_id.toString();
            axios.put(`http://127.0.0.1:8000/api/users/user/restarsaldo/${userId}/`, {
                saldo: this.total
            })
            .then((result) => {
                this.saldo = result.data.saldo;
                alert("Pagado Correctamente")
            });

            this.servicios.forEach(servicio =>{
                axios.get(`http://127.0.0.1:8000/api/services/list/${servicio.idservicio}/`)
                .then((result) => {
                    axios.post("http://127.0.0.1:8000/api/pedido/create/",{
                    name: servicio.servicio,
                    total: servicio.totalxservicio,
                    totalHours: servicio.horas,
                    idproveedor: result.data.servicio.idproveedor_id,
                    idservicio: servicio.idservicio,
                    idcliente: userId
                    }).then((result) => {
                        console.log('pedido guardado')
                    });
                });
                
                axios.delete("http://127.0.0.1:8000/api/carrito/eliminarServicios/0/")
                .then((result) => {
                    this.datos = result.data.carrito;
                    this.datos.forEach(element => {
                        this.total+=element.totalxservicio
                    });
                    this.servicios = this.datos
                    this.total = 0
                });
                this.dialogPagar = false
                
            })
            
        },

        closeSaldo(){
            this.dialogSaldo = false
        }

    },
}
</script>
