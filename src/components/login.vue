<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

        <v-select
        v-model="role"
        :items="items"
        :rules="[v => !!v || 'Por favor, ingrese el tipo de usuario']"
        label="Tipo de asuario"
        required
        ></v-select>

        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        ></v-text-field>


        <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="nameRules"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Contraseña"
        @click:append="show1 = !show1"
        ></v-text-field>




        <v-btn
        color="success"
        class="mr-4"
        @click="login"
        >
            Iniciar sesión    
        </v-btn>

        <v-btn
        color="error"
        class="mr-4"
        @click="reset"
        >
        Limpiar formulario
        </v-btn>

        <v-btn
        color="warning"
        @click="volver"
        >
        Volver a la página principal
        </v-btn>
    </v-form>
</template>

<script>
import axios from "axios";
  export default {
    name: "LogIn",
    data: () => ({
      show1: false,
      valid: true,
      password: '',
      nameRules: [
        v => !!v || 'Se requiere contraseña',
        v => (v && v.length >= 6) || 'La contraseña debe ser mínimo de 6 caracteres',
      ],

      email: '',
      emailRules: [
        v => !!v || 'Se requiere E-mail',
        v => /.+@.+\..+/.test(v) || 'Por favor, ingrese un e-mail válido',
      ],

      role: 0,
      items: [
        'Cliente',
        'Proveedor',
      ],

    }),

    methods: {
      login () {
        if(this.role=='Cliente'){
            this.role=0
        }else if(this.role=='Proveedor'){
          this.role=1
        }
        axios.post("http://127.0.0.1:8000/api/users/login/", { 
            email: this.email,
            password: this.password,
          })
          .then((result) => {
              let dataLogIn = {
                name: this.name,
                role: this.role,
                tokenAccess: result.data.access,
              }
              this.$emit('completedLogIn', dataLogIn)
              this.result = result.data;
              console.log(result.data)
              alert("Usuario Logueado Correctamente")
              this.reset();
          });
      },
      reset () {
        this.$refs.form.reset()
      },
      volver () {
        
      },
    },
  }
</script>

<style>
form {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
}
</style>