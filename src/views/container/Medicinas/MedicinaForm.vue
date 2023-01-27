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
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="articuloData.cantidad"
                        label="Cantidad"
                        :rules="[rules.required]"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                    <v-col
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
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-select
                        v-model="articuloData.functions"
                        color="secondary"
                        item-color="secondary"
                        label="funciones"
                        multiple
                        :items="functions"
                        :disabled="option===2?true:false"
                      >
                        <template v-slot:item="{ attrs, item, on }">
                          <v-list-item
                            v-bind="attrs"
                            active-class="secondary elevation-4 white--text"
                            class="mx-3 mb-2 v-sheet"
                            elevation="0"
                            v-on="on"
                          >
                            <v-list-item-content>
                              <v-list-item-title v-text="item" />
                            </v-list-item-content>
  
                            <v-scale-transition>
                              <v-list-item-icon
                                v-if="attrs.inputValue"
                                class="my-3"
                              >
                                <v-icon>mdi-check</v-icon>
                              </v-list-item-icon>
                            </v-scale-transition>
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-col> -->
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
    export default {
      data: () => ({
        tabs: 0,
        option: 0,
        title: '',
        snackbar:false,
        valid:true,
        message:"",
        id:'',
        articuloData: {
         codigo:'',
         nombre:'', 
         cantidad:'',
         estatus: true,
        },
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
        this.initialize()
      },
      methods: {
       async    initialize () {
          this.option = this.$route.params.option
          if (this.option === 3 || this.option === 2) {
            this.articuloData = this.$route.params.articuloData
       
          }
        },
        async submit () {
          if (this.option === 1) {
            if (this.$refs.form.validate()) {
            
                let medicina ={
                  codigo:this.articuloData.codigo,
                  nombre:this.articuloData.nombre, 
                  cantidad: parseInt(this.articuloData.cantidad),
                  estatus: this.articuloData.estatus,
                
                }
                console.log("antes", medicina)
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
                  cantidad: parseInt(this.articuloData.cantidad),
                  estatus: this.articuloData.estatus,
                
                }
                console.log("antes", medicina)
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
  