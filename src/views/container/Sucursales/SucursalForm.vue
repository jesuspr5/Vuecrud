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
              <v-form>
                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" sm="3" >
                      <v-text-field
                        v-model="articuloData.rif"
                        class="purple-input"
                        label="Rif"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                    <v-col cols="12" sm="3" >
                      <v-text-field
                        v-model="articuloData.nombre"
                        class="purple-input"
                        label="Nombre"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                    <v-col cols="12" sm="3" >
                      <v-text-field
                        v-model="articuloData.direccion"
                        label="Direccion"
                        class="purple-input"
                        :disabled="option===2?true:false"
                      />
                    </v-col>
                    <v-col cols="12" sm="3" >
                      <v-select
                        v-model="articuloData.status"
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
    </v-container>
  </template>
  
  <script>

  
    export default {
      data: () => ({
        tabs: 0,
        option: 0,
        title: '',
        articuloData: {
          rif: '',
          nombre: '', 
          direccion: '',
          status: '',
        },
        items: ['Activo', 'Inactivo'],
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
            this.articuloData = this.$route.params.articuloData.articulo
            console.log(this.articuloData)
          }
        },
        async submit () {
          if (this.option === 1) {
            let serviceResponse = await create(this.roleData)
            if (serviceResponse.ok === 1) {
              console.log(serviceResponse)
            } else {
              console.log(serviceResponse)
              const params = { text: serviceResponse.message.text }
              window.getApp.$emit('SHOW_ERROR', params)
            }
          } else if (this.option === 3) {
            let serviceResponse = await edit(this.roleData.id, this.roleData)
            if (serviceResponse.ok === 1) {
              console.log(serviceResponse)
            } else {
              console.log(serviceResponse)
              const params = { text: serviceResponse.message.text }
              window.getApp.$emit('SHOW_ERROR', params)
            }
          }
        },
      }, //
    }
  </script>
  