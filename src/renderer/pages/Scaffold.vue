<template>  <v-container>


    <v-row class="mt-4" justify="center">
 
      <v-card min-width="600">
        <v-card-title>
          <span class="text-h5">Scaffold new chain</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="formSend" 
            v-model="formSend"
          > 
          <v-container> 
            <v-row> 
              <v-col cols="12">
                <v-text-field
                  v-model="folderWork"       
                  label="Folder Work"                  
                  variant="outlined"
                  readonly
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="name" 
                  label="Chain name"  
                  :rules="[rules.required]"
                  variant="outlined"               
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="prefix" 
                  label="Address prefix" 
                  :rules="[rules.required]" 
                  variant="outlined"               
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-checkbox v-model="noModules" label="--no-module"></v-checkbox>
            <v-btn 
              variant="tonal"
              block
              :disabled="!formSend"
              @click="validate()"
            >
            Scaffold
          </v-btn>
          </v-container>
          </v-form>
        </v-card-text> 
      </v-card>
 
  </v-row>






<!--   <v-sheet width="600" class="mx-auto">

<v-form ref="form">
  <v-text-field
    v-model="name"
    :counter="10"
    :rules="nameRules"
    label="Name"
    required
  ></v-text-field>


  <div class="d-flex flex-column">
    <v-btn
      color="success"
      class="mt-4"
      block
      @click="validate"
    >
      Scaffold
    </v-btn>

    <v-btn
      color="warning"
      class="mt-4"
      block
      @click="startChain"
    >
      Start chain
    </v-btn>
    <v-btn
      color="error"
      class="mt-4"
      block
      @click="stopChain"
    >
      Stop chain
    </v-btn>
    <v-btn
      color="error"
      class="mt-4"
      block
      @click="listAccount"
    >
      List account
    </v-btn>
  </div>
</v-form>
</v-sheet> -->
</v-container>
</template>

<script>

  export default {
    data: () => ({
      formSend: false,
      name: '',
      folderWork: '',
      prefix: '',
      noModules: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      select: null,
      checkbox: false, 
      rules: {
        required: value => !!value || 'Required.',
      },
    }),
    watch: {
      name (val) {
        this.folderWork = localStorage.folderWork + '/' + val
      } 
    },
    mounted() {
  
      this.folderWork = localStorage.folderWork
      console.log(JSON.parse(localStorage.chains))
    },
    methods: {
      async validate () {
 
          let scaffoldChain = await window.electronAPI.scaffoldChain(this.name, this.prefix, this.folderWork, this.noModules)
          const getChains = localStorage.getItem('chains')
          const chains = JSON.parse(getChains)
          chains.push({
            name: this.name,
            path: this.folderWork,
            noModule: this.noModules
          })
          localStorage.chains = JSON.stringify(chains)
          console.log(localStorage.chains); 
 
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async startChain () {
        let scaffoldChain = await window.electronAPI.startChain()
        console.log(scaffoldChain)
      },
      async stopChain () {
        let stopChain = await window.electronAPI.stopChain('testd')
        console.log(stopChain)
      },
      async listAccount () {
        let listAccount = await window.electronAPI.listAccount()
        console.log(listAccount)
      }
    },
  }
</script>