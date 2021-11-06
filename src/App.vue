<template>
  <v-app>
    <!--NavBar-->
    <v-app-bar app color="light-blue darken-1">
      <v-app-bar-nav-icon @click="estadoNav=!estadoNav"></v-app-bar-nav-icon>
      <v-toolbar-title><strong>Servify</strong></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-card-actions xs12 sm3>
        <v-flex style="margin-right: 10px">
          <v-btn v-if="isAuth" color="#D50000" @click="logOut()" dark>Cerrar Sesión</v-btn>
        </v-flex>
        <router-link to="/user/login" style="text-decoration: none; color: inherit;">
        <v-flex style="margin-right: 10px">
          <v-btn v-if="!isAuth" color="black" dark>Iniciar Sesión</v-btn>
        </v-flex>
        </router-link>
        <router-link to="/user/signup" style="text-decoration: none; color: inherit;">
        <v-flex style="margin-right: 10px">
          <v-btn v-if="!isAuth" color="black" dark>Regístrate</v-btn>
        </v-flex>
        </router-link>
      </v-card-actions>
    </v-app-bar>

    <body>
    <!--SideBar-->
    <v-navigation-drawer app v-model="estadoNav" temporary dark>
      <!--SideBar del CLIENTE-->
      <!--SideBar - Identificación del Cliente-->
      <div v-if="isAuth">
      <div v-if="rolCliente">
        <v-layout mt-4 column align-center>
          <v-flex>
            <v-list-item style="margin-right:6px">
              <p class="white--text mt-3" headline><strong>CLIENTE</strong></p>
            </v-list-item>
          </v-flex>
          <v-flex>
            <v-list-item-avatar>
              <v-icon size="40px">
              {{ iconProfile }}
              </v-icon>
            </v-list-item-avatar>
          </v-flex>
          <v-flex>
            <v-list-item-content>
              <p class="white--text mt-3" headline>{{name}}</p>
            </v-list-item-content>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <!--SideBar - Items del Cliente-->
        <v-list dense>

          <v-list-item link @click="recargarSaldo()">
            <v-list-item-icon>
              <v-icon>{{ iconSaldo }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="white--text mt-1" headline>Mi saldo:</p>
            </v-list-item-content>
            <v-list-item-content>
              <p class="blue--text mt-1" headline><strong>${{ saldo }}</strong></p>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <router-link to="/catalogo">
            <v-list-item link style="margin-top:5px"> 
              <v-list-item-icon>
                <v-icon>{{ iconOfert }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p class="white--text mt-1" headline>Catálogo de Servicios</p>
              </v-list-item-content>
            </v-list-item> 
          </router-link>
          <v-divider></v-divider>
          
          <router-link to="/serviciosPedidos">
          <v-list-item link style="margin-top:5px">
            <v-list-item-icon>
              <v-icon>{{ iconServicio }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="white--text mt-1" headline>Servicios Adquiridos</p>
            </v-list-item-content>
          </v-list-item>
          </router-link>
          <v-divider></v-divider>
          

          <router-link to="/carrito">
          <v-list-item link style="margin-top:5px">
            <v-list-item-icon>
              <v-icon>{{ iconCarrito }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="white--text mt-1" headline>Carrito de Compras</p>
            </v-list-item-content>
          </v-list-item>
          </router-link>
          <v-divider></v-divider>

        </v-list>
      </div>

      <!--SideBar del PROVEEDOR-->
      <!--SideBar - Identificación del proveedor-->
      <div v-if="rolProveedor">
        <v-layout mt-4 column align-center>
          <v-flex>
            <v-list-item style="margin-right:6px">
              <p class="white--text mt-3" headline><strong>PROVEEDOR</strong></p>
            </v-list-item>
          </v-flex>
          <v-flex>
            <v-list-item-avatar>
              <v-icon size="40px">
              {{ iconProfile }}
              </v-icon>
            </v-list-item-avatar>
          </v-flex>
          <v-flex>
            <v-list-item-content>
              <p class="white--text mt-3" headline>{{name}}</p>
            </v-list-item-content>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <!--SideBar - Items del Proveedor-->
        <v-list dense>

          <router-link to="/perfilProveedor">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ iconOfert }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="white--text mt-1" headline>Servicios Ofertados</p>
            </v-list-item-content>
          </v-list-item>
          </router-link>
          <v-divider></v-divider>

          <router-link to="/serviciosPrestados">
          <v-list-item link style="margin-top:5px">
            <v-list-item-icon>
              <v-icon>{{ iconPrestados }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="white--text mt-1" headline>Servicios Prestados</p>
            </v-list-item-content>
          </v-list-item>
          </router-link>
          <v-divider></v-divider>
          

        </v-list>
      </div>
      </div>
      <div v-if="!isAuth">
        <router-link to="/user/login">
            <v-list-item link style="margin-top:300px"> 
              <v-list-item-icon>
                <v-icon>{{ iconLogin }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p class="white--text mt-1" headline>Iniciar Sesión</p>
              </v-list-item-content>
            </v-list-item> 
          </router-link>
          <v-divider></v-divider>
          <router-link to="/user/signup">
            <v-list-item link style="margin-top:5px"> 
              <v-list-item-icon>
                <v-icon>{{ iconSign }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p class="white--text mt-1" headline>Registrarse</p>
              </v-list-item-content>
            </v-list-item> 
          </router-link>
          <v-divider></v-divider>
      </div>
    </v-navigation-drawer>

    <!--Main, llamado de componentes y vistas--> 
    <v-main>
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </v-main>

    <v-dialog v-model="dialogSaldo" max-width="400px">
         <v-card>  
            <v-card-title class="text-h5">¿Quieres recargar tu saldo?</v-card-title>
             <v-card-text>
                <v-text-field label="Ingresar saldo a recargar" v-model="recarga" required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSaldo()">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="recargarConfirm()">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
           </v-card>
        </v-dialog>

    </body>
    
    <!--Footer-->
    <Footer/>

  </v-app>
</template>

<script>
import Footer from './components/footer.vue'
import axios from "axios";
import jwt_decode from 'jwt-decode';
export default {
  name: 'App',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    estadoNav: false,
    iconProfile: 'mdi-account-circle',
    iconCarrito: 'mdi-cart',
    iconSaldo: 'mdi-cash-multiple',
    iconServicio: 'mdi-briefcase-variant',
    iconPrestados: 'mdi-clipboard-list',
    iconOfert: 'mdi-hammer-wrench',
    iconLogin: 'mdi-login',
    iconSign: 'mdi-clipboard-check',
    rolCliente: true,
    rolProveedor: false,
    role: 0,
    isAuth: false,
    dialogSaldo: false,
    saldo: 0,
    recarga: 0,
    name: '',
  }),

   components:{
    Footer
  },

  mounted() {
    this.initSaldo();
    this.verifyAuth();
  },

  methods: {
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

      verifyAuth: function(){
        this.isAuth = localStorage.getItem("isAuth") || false;
        this.role = localStorage.getItem("role")
        let token  = localStorage.getItem("tokenAccess");
        let userId = jwt_decode(token).user_id.toString();
        if(this.isAuth == false){
          this.$router.push({name: "LogIn"})
        }
        else{
          if(this.role==0){
            this.name = localStorage.getItem("name")
            this.rolCliente = true
            this.rolProveedor = false
            this.$router.push({name: "VistaCatalogo"});
            
          }else{
            this.name = localStorage.getItem("name")
            this.rolCliente = false
            this.rolProveedor = true
            this.$router.push({name: "perfilProveedor"});
          }
        }
      },

      recargarSaldo() {
        this.dialogSaldo = true
      },

      closeSaldo() {
        this.dialogSaldo = false
      },

      recargarConfirm() {
        let token  = localStorage.getItem("tokenAccess");
        let userId = jwt_decode(token).user_id.toString();
        axios.put(`http://127.0.0.1:8000/api/users/user/recargarsaldo/${userId}/`, 
        {
          saldo: this.recarga 
        },{headers: {'Authorization': `Bearer ${token}`}})
        .then((result) => {
            this.saldo = result.data.saldo;
            alert("Saldo recargado")
        });
        this.dialogSaldo = false
      },

      logOut: function(){
        localStorage.clear();
        alert("Sesión terminada");
        this.verifyAuth();
      },

      completedLogIn: function(data){
        localStorage.setItem('name', data.name);
        localStorage.setItem('role', data.role);
        localStorage.setItem('tokenAccess', data.tokenAccess);
        localStorage.setItem('isAuth', true);
        alert("Autenticación exitosa");
        this.verifyAuth();
      },

      completedSignUp: function(data){
        alert("Registro exitoso");
        this.completedLogIn(data);
      },
  },

  
}
</script>

<style>
* {
  box-sizing: border-box;
}
body{
  min-height: 75%;
  background-color: #CFD8DC;
}
</style>
