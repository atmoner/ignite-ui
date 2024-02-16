<template>  <v-container>
 
    <v-row class="mt-4" justify="center"> 
      <v-card class="mt-4" min-width="600">
        <v-card-title>
          <span class="text-h5">Chain source</span>
        </v-card-title>
        <v-card-text>
          <v-container> 
 
            <v-select
              v-model="select1" 
              :items="allChains"
              item-title="name" 
              label="Select"
              variant="outlined"
            ></v-select>                      
          
          <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.account"
                  label="source-account" 
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.clientid"
                  label="source-client-id"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.faucet"
                  label="source-faucet"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.gaslimit"
                  label="source-gaslimit"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.gasprice"
                  label="source-gasprice"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.port"
                  label="source-port"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.prefix"
                  label="source-prefix"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.source.rpc"
                  label="source-rpc"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col> 
 
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card class="mt-4" min-width="730">
        <v-col
                          align-center
                          class="text-center"
                        >
                          <v-icon
                            size="40"
                          >
                            mdi-swap-vertical-bold
                          </v-icon>
                        </v-col>   
      </v-card>
      <v-card class="mt-4" min-width="600">
        <v-card-title>
          <span class="text-h5">Chain destination</span>
        </v-card-title>
        <v-card-text>
          <v-container> 
 
            <v-select
              v-model="select2" 
              :items="allChains"
              item-title="name" 
              label="Select"
              variant="outlined"
            ></v-select>                      
          
          <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.account"
                  label="source-account" 
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.clientid"
                  label="source-client-id"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.faucet"
                  label="source-faucet"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.gaslimit"
                  label="source-gaslimit"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.gasprice"
                  label="source-gasprice"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.port"
                  label="source-port"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.prefix"
                  label="source-prefix"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="relayerInfo.destination.rpc"
                  label="source-rpc"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col> 
 
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card class="mt-4" min-width="600">
        <v-btn block @click="generateConfig()">
          Create relayer
        </v-btn>
      </v-card>
  </v-row>

  
</v-container>
</template>

<script>
 import { useAppStore } from '../stores/data'

  export default {
    data: () => ({
      select1: '',
      select2: '',
      allChains: '', 
      relayerInfo: {
        source: {
          account: 'default',
          clientid: '',
          faucet: 'http://localhost:4500',
          gaslimit: '300000',
          gasprice: '0.00025stake',
          port: 'transfer',
          prefix: '',
          rpc: 'http://localhost:26657'
        },
        destination: {
          account: 'default',
          clientid: '',
          faucet: 'http://localhost:4501',
          gaslimit: '300000',
          gasprice: '0.00025stake',
          port: 'transfer',
          prefix: '',
          rpc: 'http://localhost:26659'
        }
      },
      rules: [
        value => {
          if (value) return true

          return 'You must enter a first name.'
        },
      ],
    }),
    setup() {
      const store = useAppStore()
      return {
        store
      }
    },
    watch: {

    },
    mounted() {  
      this.folderWork = localStorage.folderWork
      console.log(JSON.parse(localStorage.chains))
      this.allChains = JSON.parse(localStorage.chains)

      this.select1 = this.allChains[0]
      this.select2 = this.allChains[1]

      this.relayerInfo.source.clientid = this.allChains[0].name
      this.relayerInfo.source.prefix = this.allChains[0].name

      this.relayerInfo.destination.clientid = this.allChains[1].name
      this.relayerInfo.destination.prefix = this.allChains[1].name

      console.log(this.store.chainsList)
    },
    methods: {
      generateConfig() {
        console.log(this.relayerInfo)
        //this.loadingGenerate.tsclient = true
        window.electronAPI.generateRelayerConfig( 
          JSON.stringify(this.relayerInfo)
        )
        .then((res) => {
          console.log(res)
          this.returnGenerate = res.replace(/\n/g, '<br />')
          //this.loadingGenerate.tsclient = false
          this.dialog = true
        })
        .catch(error => {
        // do something with error
          console.log(error)
          this.returnGenerate = error
          //this.loadingGenerate.tsclient = false
          this.dialog = true
        })        
      },
      reset () {
        this.$refs.form.reset()
      } 
    },
  }
</script>