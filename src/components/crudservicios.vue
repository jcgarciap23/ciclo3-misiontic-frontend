<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="idservice"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><strong>Mis Servicios</strong></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar Servicio
            </v-btn>
          </template>
         
          <v-card> 
            <v-form ref="form"
                  v-model="valid"
                  lazy-validation>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                 
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="Rules"
                      v-model="editedItem.name"
                      label="Nombre del servicio"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="Rules"
                      v-model="editedItem.description"
                      label="Descripción"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="Rules"
                      v-model="editedItem.price_hour"
                      label="Precio por hora"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-file-input
                      type="file"
                      :rules="Rules"
                      label="Imagen"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="image"
                    ></v-file-input>
                  </v-col>
                </v-row>
               
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                :disabled="!valid"
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-form>
          </v-card>
          
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estás seguro que quieres eliminar?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';
  export default {
    name: 'Crudservicio',
    data: () => ({
      valid: true,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id del Servicio',
          align: 'start',
          sortable: false,
          value: 'idservice',
        },
        { text: 'Nombre del Servicio', value: 'name' },
        { text: 'Descripción', value: 'description' },
        { text: 'Precio por Hora', value: 'price_hour' },
        { text: 'Imagen', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        idservice: 0,
        name: '',
        description: '',
        price_hour: 0,
      },
      defaultItem: {
        idservice: 0,
        name: '',
        description: '',
        price_hour: 0,
      },
      Rules: [
        v => !!v || 'Campo requerido',
      ],
      image: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Servicio' : 'Editar Servicio'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize() {
        let token  = localStorage.getItem("tokenAccess");
        let userId = jwt_decode(token).user_id.toString();
        axios.get(`http://127.0.0.1:8000/api/services/listByProveedor/${userId}/`,
        {headers: {'Authorization': `Bearer ${token}`}}) 
        .then((result) => {
            result = result.data.servicios;
            this.desserts = result
        });
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.delete(`http://127.0.0.1:8000/api/services/delete/${this.editedItem.idservice}/`)
          .then((result) => {
              alert("Registro Eliminado Correctamente") 
          });
        this.desserts.splice(this.editedIndex, 1) 
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.$refs.form.validate()
        if(this.$refs.form.validate()){
          const formData = new FormData(); //tipo de dato para guadar información y archivos juntos.
          let token  = localStorage.getItem("tokenAccess");
          let userId = jwt_decode(token).user_id.toString();
          const idproveedor = userId
          formData.append("name", this.editedItem.name);
          formData.append("description", this.editedItem.description);
          formData.append("price_hour", this.editedItem.price_hour);
          formData.append("idproveedor", idproveedor);
          formData.append("image", this.image);
          axios.post("http://127.0.0.1:8000/api/services/create/", formData)
          .then((result) => {
              this.result = result.data;
              console.log(result)
              alert("Creado nuevo servicio")
          });       
           this.$router.push({name: "perfilProveedor"})
          this.close()
        }
      },
    },
  }
</script>