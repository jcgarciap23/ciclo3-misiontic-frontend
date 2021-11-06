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
      label="Tipo de usuario"
      required
    ></v-select>

    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="nameRules01"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Contraseña"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      v-model="confirmacion"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="nameRules02"
      :type="show2 ? 'text' : 'password'"
      name="input-10-2"
      label="Confirmacion de contraseña"
      @click:append="show2 = !show2"
    ></v-text-field>



    <v-btn
      color="success"
      class="mr-4"
      @click="registro"
    >
          Registro de usuario    
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
    name: "SignUp",
    data: () => ({

      role: 0,
      items: [
        'Cliente',
        'Proveedor',
      ],

      name: '',
      nameRules: [
        v => !!v || 'Se requiere un Nombre',
      ],

      email: '',
      emailRules: [
        v => !!v || 'Se requiere E-mail',
        v => /.+@.+\..+/.test(v) || 'Por favor, ingrese un e-mail válido',
      ],

      show1: false,
      valid: true,
      password: '',
      nameRules01: [
        v => !!v || 'Se requiere contraseña',
        v => (v && v.length >= 6) || 'La contraseña debe ser mínimo de 6 caracteres',
      ],

      show2: false,
      valid: true,
      confirmacion: '',
      nameRules02: [
        v => !!v || 'Se requiere confirmación de contraseña',
        
      ],

    }),

    methods: {
      registro () {
        if(this.password==this.confirmacion){
          if(this.role=='Cliente'){
            this.role=0
          }else if(this.role=='Proveedor'){
            this.role=1
          }
          axios.post("http://127.0.0.1:8000/api/users/user/", { 
            email: this.email,
            password: this.password,
            name: this.name,
            role: this.role,
            account: {
              lastChangeDate: (new Date()).toJSON().toString(),
            }
          })
          .then((result) => {
              let dataSignUp = {
                name: this.name,
                role: this.role,
                tokenAccess: result.data.access,
              }
              this.$emit('completedSignUp', dataSignUp)
              this.result = result.data;
              console.log(result.data)
              alert("Usuario Creado Correctamente")
              this.reset();
          });

        }else{
          alert('Contraseña no coincide con la confirmación de contraseña')
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      volver () {
        
      },
    },
  }
</script>
