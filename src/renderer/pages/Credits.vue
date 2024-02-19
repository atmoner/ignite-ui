<template>  <v-container>


    <v-row class="mt-4" justify="center">
 
      <v-card min-width="600">
        <v-card-title>
          <span class="text-h5">Credits</span>
        </v-card-title>
        <v-card-text> 
          <v-container> 

            <v-list >
 

              <v-list-item
                v-for="folder in folders"
                :key="folder.title"
                :title="folder.title"
                :subtitle="folder.subtitle"
              >
              
                <template v-slot:prepend>
 
                  <v-avatar v-if="folder.title === 'Ignite-cli'">
                    <v-img
                      src="../logo.png"
                      alt="John"
                    ></v-img>
                  </v-avatar>
                  <v-avatar v-else>
                    <v-img
                      src="../atmon3r.jpg"
                      alt="John"
                    ></v-img>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn
                    v-if="folder.title === 'Ignite-cli'"
                    color="grey-lighten-1"
                    icon="mdi-web"
                    variant="text"
                    @click="openUrl(folder.website)"
                  ></v-btn>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-github"
                    variant="text"
                    @click="openUrl(folder.github)"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-container> 
        </v-card-text> 
      </v-card> 
  </v-row>

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
      folders: [
        {
          subtitle: 'Ignite team',
          title: 'Ignite-cli',
          github: 'https://github.com/ignite/cli',
          website: 'https://ignite.com'
        },
        {
          subtitle: 'atmon3r',
          title: 'Ignite-ui',
          github: 'https://github.com/atmoner/ignite-ui',
        }
      ],
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
      openUrl(url) {
        console.log(url)
        window.electronAPI.openUrl(url)
      },
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