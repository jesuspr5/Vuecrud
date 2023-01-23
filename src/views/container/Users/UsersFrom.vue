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
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <!-- <v-col
                    v-for="(item, index) in dataInput"
                    :key="`input-${index}`"
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-if="item.type=='text'|| item.type=='number' || item.type=='email'  || item.type=='phone'"
                      v-model="data.obj[`${item.name}`]"
                      class="purple-input"
                      :label="item.name"
                      :type="item.type"
                      :disabled="option===2?true:false"
                    />
                    <v-select
                      v-if="item.type=='select'"
                      :items="selectData"
                      filled
                      :label="item.name"
                    ></v-select>
                  </v-col> -->

                   <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="userData.nombre"
                      label="nombre"
                      class="purple-input"
                      :disabled="option===2?true:false"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                    v-model="userData.email"
                 
                      label="correo"
                      type="phone"
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
                    v-model="userData.password"
                    :append-icon="show1 ? 'mdi-eye' : ' mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    :disabled="option===2?true:false"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  />
                    <!-- <v-text-field
                     
                      label="Rol"
                      class="purple-input"
                      type="password"
                      :disabled="option===2?true:false"
                    /> -->
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
                    name="input-10-1"
                    label="Confirmar contraseña"
                    :disabled="option===2?true:false"
                 
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  />
                    <!-- <v-text-field
                     
                      label="Rol"
                      class="purple-input"
                      type="password"
                      :disabled="option===2?true:false"
                    /> -->
                  </v-col>
                  
                  <v-col
                    cols="12"
                    md="6"
                    style="padding-top: 24px"
                  >
                    <v-select
                      :disabled="option===2?true:false"
                      :items="types"
                      v-model="userData.rol"
                      label="Rol"
                      class="purple-input"
                      dense
                    />
                  </v-col>
                  <!-- <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="userData.rol"
                      label="Rol"
                      class="purple-input"
                      :disabled="option===2?true:false"
                    />
                  </v-col> -->
                  

                  <!-- <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="duserData.estatus"
                      label="estatus"
                      class="purple-input"
                      :disabled="option===2?true:false"
                    />
                  </v-col> -->

                  
                  <!-- <v-col
                    cols="12"
                    md="6"
                    style="padding-top: 24px"
                  >
                    <v-select
                      :disabled="option===2?true:false"
                      :items="types"
                      class="purple-input"
                      :label="$t('users.type')"
                      dense
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :label="$t('users.address')"
                      class="purple-input"
                      :disabled="option===2?true:false"
                    />
                  </v-col>  -->
                </v-row>
                <v-col cols="12" class="text-right">
                  <v-btn
                    v-if="option!==2"
                    color="success"
                    class="mr-0"
                    @click="printData(data.obj)"
                  >{{ getTitleButton }}</v-btn>
                </v-col>
              </v-container>
            </v-form>
          </v-tab-item>
          <!-- <v-tab-item :kei="1">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      :label="$t('users.role')"
                      multiple
                      :items="role"
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
                            <v-list-item-icon v-if="attrs.inputValue" class="my-3">
                              <v-icon>mdi-check</v-icon>
                            </v-list-item-icon>
                          </v-scale-transition>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col> 
                </v-row>
              </v-container>
            </v-form>
          </v-tab-item> -->
        </v-tabs-items>
      </base-material-card>
    </v-row>
  </v-container>
</template>

<script>
import i18n from "@/i18n";
import { editUsers, createUsers } from "@/api/modules";
import userjson from "./user.json";
export default {
  data: () => ({
    dataInput: userjson.inputs,
    tabs: 0,
    option: 0,
    show1: false,
    show2:false,
    title: "",
    confirmpassword:'',
    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min  characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
    userData:{
             id: '',
            nombre: '',
            email:'',
            password:'',
            rol: '',
            estatus: '',

    }
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
    // console.log($t('users.title'))
    this.initialize();
    console.log(this.dataInput);
  },
  methods: {
    printData(data) {
      console.log(data);
    },
    initialize() {
      this.option = this.$route.params.option;
      if (this.option === 3 || this.option === 2) {
        this.data = this.$route.params.data;
      }
    },
    async submit() {
      if (this.option === 1) {
        let serviceResponse = await createUsers(this.data);
        if (serviceResponse.ok === 1) {
          console.log(serviceResponse);
        } else {
          console.log(serviceResponse);
          const params = { text: serviceResponse.message.text };
          window.getApp.$emit("SHOW_ERROR", params);
        }
      } else if (this.option === 3) {
        let serviceResponse = await editUsers(this.data.id, this.data);
        if (serviceResponse.ok === 1) {
          console.log(serviceResponse);
        } else {
          console.log(serviceResponse);
          const params = { text: serviceResponse.message.text };
          window.getApp.$emit("SHOW_ERROR", params);
        }
      }
    }
  } //
};
</script>
