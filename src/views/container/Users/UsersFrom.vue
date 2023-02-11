<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <base-material-card class="max-full-width" icon="mdi-account-outline" inline width="100%">
        <template v-slot:heading>
          <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
            <v-tab class="mr-3">
              <v-icon class="mr-2">mdi-account</v-icon>
              {{ getTitleButton +" "+"Usuario"}}
            </v-tab>
            <!-- <v-tab class="mr-3">
              <v-icon class="mr-2">mdi-code-tags</v-icon>
              {{ $t('users.role') }}
            </v-tab> -->
          </v-tabs>
        </template>

        <v-card-text style="height: 100px; position: relative">
          <v-fab-transition>
            <v-btn fab dark small color="secondary" absolute right top @click="$router.go(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
        <v-tabs-items v-model="tabs" class="transparent">
          <v-tab-item :kei="0">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container class="py-0">
                <v-row>
                 
                   <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="userData.nombre"
                      label="nombre"
                      class="purple-input"
                      type="text"
                      :rules="[rules.required]"
                      :disabled="option===2?true:false"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                    v-model="userData.email"
                      :rules="[rules.required,rules.emailRules]"
                      label="correo"
                      type="email"
                      class="purple-input"
                      :disabled="option===2?true:false"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :hidden="option===2?true:false || option===3?true:false "
                  >
                  <v-text-field
                    v-model="newpassword"
                    :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                   
                    label="Contraseña"
                    :disabled="option===2?true:false"
                    hint="minimo 8 caracteres"
                    counter
                    @click:append="show1 = !show1"
                  />
                 
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :hidden="option===2?true:false || option===3?true:false"
                  >
                  <v-text-field
                    v-model="confirmpassword"
                    :append-icon="show2 ? 'mdi-eye' : ' mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                  
                    label="Confirmar contraseña"
                    :disabled="option===2?true:false"
                    hint="minimo 8 caracteres"
                    counter
                    @click:append="show2 = !show2"
                  />
                    
                  </v-col>
                  
                
                 
                  <v-col cols="12" sm="4" >
                  
                      <v-select
                        v-model="userData.idrol"
                        color="secondary"
                        item-color="secondary"
                        label="Rol"
                        :items="roles"
                        item-text="nombre"
                        item-value="idrol"
                        :disabled="option===2?true:false"
                      >
                      
                      </v-select>
                    </v-col> 

                  <v-col cols="12" sm="4" >
                  
                      <v-select
                        v-model="userData.idsucursal"
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
                    <v-col cols="12" sm="3"   :hidden="option===1?true:false">
                      <v-select
                        v-model="userData.estatus"
                        :items="items"
                        label="Estatus"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      ></v-select>
                    </v-col>

                </v-row>
                <v-col cols="12" class="text-right">
                  <v-btn
                    v-if="option!==2"
                    color="success"
                    class="mr-0"
                    @click="submit"
                  >{{ getTitleButton }}</v-btn>
                </v-col>
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
 import {   createUser, updateUser } from "../../../api/modules/user";
 import {   RolGetList } from "../../../api/modules/role";
import {  sucursalGetList } from "../../../api/modules/sucursal";

export default {
  data: () => ({

    tabs: 0,
    option: 0,
    show1: false,
    show2:false,
    snackbar:'',
    message:'',
    valid:true,
    title: "",
    newpassword:'',
    confirmpassword:'',
    rules: {
        required: value => !!value || 'Requiredo.',
        min: v => v.length >= 5 || 'minimo de caracteres',
        alfa: v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'La contraseña debe contener al menos una letra minúscula, un número, un carácter especial y una letra mayúscula',
       emailRules: v => /.+@.+\..+/.test(v) || "el correo deber ser valido. Ejemplo@gmail.com"
       
      },
    userData:{
            idUser: '',
            nombre: '',
            email:'',
            idrol: '',
            idsucursal:'',
            estatus: '',
           

    },
    sucursales:[],
   roles:[],
   json:{},
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
          if (this.option === 1) return 'crear'
          else if (this.option === 2) return 'Mostrar '
          else if (this.option === 3) return 'editar '
          else return this.title
        },
  },
  mounted() {
   
    this.initialize();
    this.sucursal();
    this.rol();
    
  },
  methods: {


    sucursal: async function() {
      let result;
      result = await sucursalGetList();
      this.sucursales = result;

    },
    rol: async function() {
      let result;
      result = await RolGetList();
      this.roles = result;
   
    },
   
    initialize() {
      this.option = this.$route.params.option;
      if (this.option === 3 || this.option === 2) {
        this.userData = this.$route.params.userData;
      }
    },
    async submit () {
          if (this.option === 1) {
            if (this.$refs.form.validate()) {
            
              if(this.newpassword !=this.confirmpassword){
                this.snackbar = true;
                this.message = "las contraseñas no coinciden";
                setTimeout(() => {this.snackbar = false; }, 3000);
                } else {
                    
                let user ={
                 
                 nombre: this.userData.nombre,
                 email: this.userData.email,
                 password: this.newpassword,
                 idrol: this.userData.idrol,
                 idsucursal: this.userData.idsucursal,
                estatus:"Activo",
               
                
                }
                
               user = await  createUser(user)
                if (user != null) {
          
                 this.snackbar = true;
                this.message = "Registro exitoso";
                 setTimeout(()=>{this.$router.push({ name: "Users" })},2000);
                   }else {
                      this.snackbar = true;
                      this.message = "Hubo un error durante el registro";
                      setTimeout(() => {this.snackbar = false; }, 1000);
                         }

                         }

            }else{ 
                this.snackbar = true;
                this.message = "Debe llenar todos los campos requeridos";
                setTimeout(() => { this.snackbar = false;}, 1000);
              }

           
          } else if (this.option === 3) {
           

              let user ={
                 iduser: this.userData.idUser,
                 nombre: this.userData.nombre,
                 email: this.userData.email,
                 idrol: this.userData.idrol,
                 idsucursal: this.userData.idsucursal,
                estatus:this.userData.estatus,
               
                
                }
              console.log("update user", user)
                user = await  updateUser(user)
                if (user != null) {
          
                 this.snackbar = true;
                this.message = "Actualizacion exitosa";
                 setTimeout(()=>{this.$router.push({ name: "Users" })},2000);
                   }else {
                      this.snackbar = true;
                      this.message = "Hubo un error durante la Actualizacion";
                      setTimeout(() => {this.snackbar = false; }, 1000);
                         }



             
           
          }
        }

  } //
};
</script>
