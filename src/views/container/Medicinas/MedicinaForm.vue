<template>
    <v-container
      id="role-profile"
      fluid
      tag="section"
    >
      <v-row justify="center">
        <base-material-card icon="mdi-account-outline">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-account-key
                </v-icon>
                {{ getTitleButton }}
              </v-tab>
            </v-tabs>
          </template>
  
          <v-card-text style="height: 100px; position: relative">
            <v-fab-transition>
              <v-btn
                fab
                dark
                small
                color="secondary"
                absolute
                right
                top
                @click="$router.go(-1)"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item :kei="0">
              <v-form  ref="form" v-model="valid" lazy-validation>
                <v-container class="py-0">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="articuloData.codigo"
                        class="purple-input"
                        label="Codigo"
                        :disabled="option===2?true:false"
                        :rules="[rules.required]"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="articuloData.nombre"
                        class="purple-input"
                        label="Nombre"
                        :rules="[rules.required]"
                        :disabled="option===2?true:false"
                      />
                    </v-col>

                    <!-- <v-col
                      cols="12"
                      sm="4"
                      :hidden="option===1?true:false || option===3?true:false"
                    >
                      <v-text-field
                        v-model="articuloData.tipo"
                        label="Presentacion"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col> -->
                    <v-col
                      cols="12"
                      sm="4"
                    
                    >
                  
                      <v-select
                        v-model="articuloData.idp"
                        color="secondary"
                        item-color="secondary"
                        label="Presentacion"
                        :items="presentacion"
                        item-text="nombre"
                        item-value="id"
                        :disabled="option===2?true:false"
                      >
                      
                      </v-select>
                    </v-col> 
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="articuloData.stock"
                        label="Stock"
                        :rules="[rules.required]"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                     <!-- <v-col
                      cols="12"
                      sm="4"
                      :hidden="option===1?true:false || option===3?true:false"
                    >
                      <v-text-field
                        v-model="articuloData.sucursal"
                        label="Sucursal"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col> -->
                    <v-col
                      cols="12"
                      sm="4"
                      

                    >
                  
                      <v-select
                        v-model="articuloData.idsucursal"
                        color="secondary"
                        item-color="secondary"
                        label="sucursal"
                        :items="sucursales"
                        item-text="nombre"
                        item-value="idsucursal"
                        :disabled="option===2?true:false"
                      >
                      
                      </v-select>
                    </v-col> 
                    <!-- <v-col
                      cols="12"
                      sm="4"
                      :hidden="option===2?true:false || option===1?true:false"
                    >
                      <v-text-field
                        v-model="articuloData.estatus"
                        label="estatus"
                        class="purple-input"
                        :disabled="option===2?true:false"
                        
                      />
                    </v-col> -->
                    <v-col
                      cols="12"
                      sm="4"
                      :hidden="option===1?true:false"
                    >
                      <v-select
                        v-model="articuloData.estatus"
                        color="secondary"
                        item-color="secondary"
                        label="estatus"
                        :items="status"
                        :disabled="option===2?true:false"
                      >
                    
                      </v-select>
                    </v-col> 
                  
                    <v-col
                      cols="12"
                      class="text-right"
                    >
                      <v-btn
                        v-if="option!==2"
                        color="success"
                        class="mr-0"
                        @click="submit"
                      >
                        {{ getTitleButton }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-row>

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
    </v-container>
  </template>
  
  <script>

import { updatemedicina, createmedicina, medicinaGet } from "../../../api/modules/Medicina";
import {  sucursalGetList,sucursalGet } from "../../../api/modules/sucursal";
import {presentacionGetList, presentacionGet  } from "../../../api/modules/presentacion";

    export default {
      data: () => ({
        tabs: 0,
        option: 0,
        title: '',
        snackbar:false,
        valid:true,
        message:' ',
        articuloData: {
         codigo:'',
         nombre:'', 
         stock:'',
         idsucursal:'',
         idp:'',
         estatus: '',
        },
        sucursales:[],
        presentacion:[],
        status:[
        { 
            text:'activo',
            value:'Activo'

           },
           {
            text:'inactivo',
            value:'Inactivo'

           }
          ],
        
        rules: {
        sise: value=> !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      required: value => !!value || "Debe ingresar Texto.",
      min: v => v.length >= 5 || "Mínimo 5 caracteres",
    },
      }),
      computed: {
        getTitle () {
          if (this.option === 1) return 'crear '
          else if (this.option === 2) return 'Mostrar '
          else if (this.option === 3) return 'editar '
          else return this.title
        },
        getTitleButton () {
          if (this.option === 1) return 'crear'
          else if (this.option === 2) return 'Mostrar '
          else if (this.option === 3) return 'editar '
          else return this.title
        },
      },
      mounted () {
        // console.log($t('roles.title'))
        this.initialize();
        this.sucursal();
        this.data();
      },
      methods: {
       async    initialize () {
          this.option = this.$route.params.option
          if (this.option === 3 || this.option === 2) {
            this.articuloData = this.$route.params.articuloData
          console.log("json",this.articuloData)
            
       
          }
        },
        sucursal: async function() {
      let result;
      result = await sucursalGetList();
      this.sucursales = result;

    },
    data: async function() {
      let result;
      result = await presentacionGetList();
      this.presentacion = result;
      console.log("pr",this.presentacion)

    },
        async submit () {
          if (this.option === 1) {
            if (this.$refs.form.validate()) {
            
                let medicina ={
                  codigo:this.articuloData.codigo,
                  nombre:this.articuloData.nombre, 
                  stock: parseInt(this.articuloData.stock),
                  idsucursal: this.articuloData.idsucursal,
                  idp : this.articuloData.idp,
                  estatus: "Activo"
                
                }
                console.log("medicina", medicina)
                medicina = await  createmedicina(medicina)
                if (medicina != null) {
          
                 this.snackbar = true;
                this.message = "Registro exitoso";
                 setTimeout(()=>{this.$router.push({ name: "Medicina" })},2000);
                   }else {
                      this.snackbar = true;
                      this.message = "Hubo un error durante el registro";
                      setTimeout(() => {this.snackbar = false; }, 1000);
                         }


              

            }else{ 
                this.snackbar = true;
                this.message = "Debe llenar todos los campos requeridos";
                setTimeout(() => { this.snackbar = false;}, 1000);
              }

           
          } else if (this.option === 3) {
            if (this.$refs.form.validate()) {

              let medicina ={
                  idM : this.articuloData.id,
                  codigo:this.articuloData.codigo,
                  nombre:this.articuloData.nombre, 
                  stock: parseInt(this.articuloData.stock),
                  idsucursal : this.articuloData.idsucursal,
                  idp : this.articuloData.idp,
                  estatus: this.articuloData.estatus,
                
                }
                
                medicina = await  updatemedicina(medicina)
                if (medicina != null) {
          
                 this.snackbar = true;
                this.message = "Actualizacion exitosa";
                 setTimeout(()=>{this.$router.push({ name: "Medicina" })},2000);
                   }else {
                      this.snackbar = true;
                      this.message = "Hubo un error durante la Actualizacion";
                      setTimeout(() => {this.snackbar = false; }, 1000);
                         }



            }
           
          }
        },
      }, 
    }
  </script>
  