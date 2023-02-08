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
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container class="py-0">
                  <v-row>
                   
                    <v-col cols="12" sm="3" >
                      <v-text-field
                        v-model="presentacionData.nombre"
                        class="purple-input"
                        label="Nombre"
                        :rules="[rules.required]"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                 
                    <v-col cols="12" sm="3"   :hidden="option===1?true:false">
                      <v-select
                        v-model="presentacionData.estatus"
                        :items="items"
                        label="Estatus"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" class="text-right">
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
    import {  createpresentacion,updatepresentacion } from "../../../api/modules/presentacion";

  
    export default {
      data: () => ({
        tabs: 0,
        option: 0,
        title: '',
        snackbar:false,
        message:'',
        valid:true,
        rules: {
      required: value => !!value || "Debe ingresar Texto.",
      min: v => v.length >= 5 || "Mínimo 5 caracteres",
    },
        presentacionData: {
          id:'',
          nombre: '', 
          estatus:'',
        },
        items: [
          { 
            text:'activo',
            value:'Activo'

           },
           {
            text:'inactivo',
            value:'Inactivo'

           }
      ],
      }),
      computed: {
        getTitle () {
          if (this.option === 1) return 'crear '
          else if (this.option === 2) return 'Mostrar '
          else if (this.option === 3) return 'editar '
          else return this.title
        },
        getTitleButton () {
          if (this.option === 1) return 'create'
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
        initialize () {
          this.option = this.$route.params.option
          if (this.option === 3 || this.option === 2) {
            this.presentacionData = this.$route.params.presentacionData
           
          }
        },
        async submit () {
          if (this.option === 1) {
            if (this.$refs.form.validate()) {
            
                let presentacion ={
              
                  nombre: this.presentacionData.nombre,
                  estatus:"Activo",
               
                
                }
                console.log("antes", presentacion)
                presentacion = await  createpresentacion(presentacion)
                if (presentacion != null) {
          
                 this.snackbar = true;
                this.message = "Registro exitoso";
                 setTimeout(()=>{this.$router.push({ name: "Presentacion" })},2000);
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

              let presentacion ={
                  idp : this.presentacionData.id,
                  nombre: this.presentacionData.nombre, 
                  estatus:this.presentacionData.estatus,
                }
                console.log("antes", presentacion)
                presentacion = await  updatepresentacion(presentacion)
                if (presentacion != null) {
          
                 this.snackbar = true;
                this.message = "Actualizacion exitosa";
                 setTimeout(()=>{this.$router.push({ name: "Presentacion" })},2000);
                   }else {
                      this.snackbar = true;
                      this.message = "Hubo un error durante la Actualizacion";
                      setTimeout(() => {this.snackbar = false; }, 1000);
                         }



            }
           
          }
        },
      }, //
    }
  </script>
  