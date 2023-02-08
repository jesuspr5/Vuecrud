<template>
    <v-container
      id="data-tables"
      tag="section"
    >
      <base-material-card
        color="indigo"
        icon="mdi-vuetify"
        inline
        class="px-5 py-3"
      >
        <template v-slot:after-heading>
          <div class="display-2 font-weight-light">
        Sucursal
          </div>
        </template>
  
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="ml-auto"
          label="Buscar"
          hide-details
          single-line
          style="max-width: 250px;"
        />
  
        <v-divider class="mt-3" />
  
        <v-data-table
          :headers="headers"
          :items="items"
          :search.sync="search"
          :sort-by="['id', 'nombre']"
          :sort-desc="[false, true]"
          multi-sort
          class="elevation-1"
        >
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn
  
              :key="1"
              color="blue"
              fab
              class="px-1 ml-1"
              x-small
              @click="show(item)"
            >
              <v-icon
                small
                v-text="'mdi-eye'"
              />
            </v-btn>
            <v-btn
  
              :key="2"
              color="primary"
              fab
              class="px-1 ml-1"
              x-small
              @click="edit(item)"
            >
              <v-icon
                small
                v-text="'mdi-pencil'"
              />
            </v-btn>
            <v-btn
  
              :key="3"
              color="secondary"
              fab
              class="px-1 ml-1"
              x-small
              @click=" deletesucursal(item)"
            >
              <v-icon
                small
                v-text="'mdi-delete'"
              />
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-center">
    <v-snackbar   
      v-model="snackbar"
      color="#75B768"
    >
    {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
      <v-dialog v-model="dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Estas seguro que deseas eliminar esta medicina?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn
              fab
              dark
              large
              color="primary"
              fixed
              right
              bottom
              @click="create"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
      </base-material-card>
    </v-container>
  </template>
  
  <script>
  import {   sucursalGetList ,deletesucursal } from "../../../api/modules/sucursal";
  
    export default {
      name: 'DashboardDataTables',
  
      data: () => ({
        hidden: false,
        headers: [
          {
            text: 'Rif',
            value: 'rif',
            align: 'center'
          },
          {
            text:'Nombre',
            value: 'nombre',
            align: 'center'
          },
          {
            text:'Direccion',
            value: 'direccion',
            align : 'center'
          },
          {
            text:'Estatus',
            value: 'estatus',
            align : 'center'
          },
  
  
          {
            sortable: false,
            text: 'Actions',
            value: 'actions',
          },
        ],
        items: [],
        id:0,
        snackbar:false,
        dialogDelete:false,
        message:'',
        search: undefined,
      }),
      async mounted () {
        // window.getApp.$emit("SHOW_ERROR", "34534535")
        this.data()
      },
      methods: {
        data: async function() {
      let result;
      result = await sucursalGetList();
      this.items = result;
    },
        create () {
          console.log('create')
          this.$router.push({
            name: 'SucursalForm',
            params: {
              option: 1, // option 1 to create
            },
          })
        },
        show (item) {
          console.log(item)
          this.$router.push({
            name: 'SucursalForm',
            params: {
              option: 2, // option 2 to show
             sucursalData: item,
            },
          })
        },
        edit (item) {
          console.log(item)
          this.$router.push({
            name: 'SucursalForm',
            params: {
              option: 3, // option 3 to edit
              sucursalData: item,
            },
          })
        },
        deletesucursal (item) {
          this.id = item.idsucursal
          this.dialogDelete = true;
        },

        closeDelete() {
        this.dialogDelete = false;
        },

        
        async   deleteItemConfirm() {
            let result;
            result = await deletesucursal(this.id);
            console.log("respuesta", result)
         if(result === "Eliminado Exitosamente")
            {
              this.snackbar = true;
                this.message = "Eliminación exitosa";
              this.data();
              this.dialogDelete = false;
              // setTimeout(() => {this.$router.push({ name: "Sucursal"});}, 1000);
            }
            else{
            
            this.snackbar = true;
              this.message = "ocurrio un error al eliminar la sucursal";
                setTimeout(() => { this.snackbar = false;}, 1000);
            }
          }
      },
    }
  </script>
  