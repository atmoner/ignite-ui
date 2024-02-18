<template>
 
      <v-row class="  ma-4" v-if="store.chainsList.length > 0">        
        <v-col
          v-for="chain in store.chainsList"
          :key="chain.name"  
        >        
          <v-card min-width="400">
            
            <v-img
              src="https://i.imgur.com/FavH2J1.png"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white">
                <v-icon                              
                  :class="chain.online ? 'heartOn' : ''"
                  :color="chain.online ? 'green' : 'red'"
                  small
                >
                  mdi-circle
                </v-icon>
                {{ chain.name }}
              </v-card-title>
              <v-row no-gutters>
                <v-col
                  sm="4"
                >
                <v-card class="ma-2 pa-2" flat color="transparent">
                   
                </v-card> 
                </v-col>
                <v-col
                  sm="4"
                >
          
                </v-col>
                <v-col
                  sm="4"
                >
                <v-card class="ma-2 pa-2" flat color="transparent">
                   <p cless="align-end">Block: {{ chain.block }} </p> 
                </v-card> 
                </v-col>
              </v-row>
            </v-img>
            <div class="d-flex justify-space-between mb-4 pa-4 pb-0">
              <v-btn-toggle
                v-model="formatting"
                multiple
                variant="outlined"
                divided
              >
                <v-btn 
                  :disabled="chain.online ? true : false"  
                >
                  <v-icon    
                    icon="mdi-play-circle-outline" 
                    color="green"            
                  ></v-icon>
                  
                  <v-menu activator="parent">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title @click="startChain(chain)">
                        <v-icon  
                          class="mr-2"            
                          icon="mdi-play-circle-outline"
                          color="green"            
                        ></v-icon>
                        Resume
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title @click="startChain(chain)">
                        <v-icon  
                          class="mr-2"            
                          icon="mdi-restart"
                          color="orange"            
                        ></v-icon>
                        Restart
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                </v-btn>
                
                <v-btn
                  :disabled="chain.online ? false : true"
                  @click="stopChain(chain)"
                >
                  <v-icon              
                    icon="mdi-stop-circle-outline"
                    color="red"            
                  ></v-icon>
                </v-btn>        
              </v-btn-toggle>

              <v-btn-toggle 
                variant="outlined"
                divided
              >
                <v-btn :to="'/chain/' + chain.name">
                  <v-icon icon="mdi-eye-circle"></v-icon>
                </v-btn>
                <v-btn @click="viewDetailChain(chain)">
                  <v-icon icon="mdi-cog"></v-icon>
                </v-btn>
                <v-btn
                  :disabled="chain.online ? true : false"
                  @click="deleteChain(chain)"
                >
                  <v-icon 
                    icon="mdi-delete-empty"
                    color="red" 
                  ></v-icon>
                </v-btn>
              </v-btn-toggle>
            </div> 
 
        <v-table>
          <!-- {{ store.chainsList }} -->
          <tbody>
            <tr>
              <td>Lcd</td>
              <td v-if="!chain.config?.loadedYaml.validators[0].app">http://localhost:1317</td>
              <td v-else>http://localhost{{ chain.config?.loadedYaml.validators[0].app.api.address }}</td>
              <td v-if="!chain.config?.loadedYaml.validators[0].app" class="text-right">
                <v-btn 
                  :disabled="chain.online ? false : true" 
                  append-icon="mdi-open-in-new" 
                  variant="tonal" 
                  @click="openUrl('http://localhost:1317')"
                >View lcd</v-btn>                
              </td>
              <td v-else class="text-right">
                <v-btn 
                  :disabled="chain.online ? false : true" 
                  append-icon="mdi-open-in-new" 
                  variant="tonal" 
                  @click="openUrl('http://localhost' + chain.config?.loadedYaml.validators[0].app.api.address)"
                >View lcd</v-btn>                
              </td> 
            </tr>
            <tr>
              <td>Rpc</td>
              <td v-if="!chain.config?.loadedYaml.validators[0].config">http://localhost:26657</td>
              <td v-else>http://localhost{{ chain.config?.loadedYaml.validators[0].config.rpc.laddr }}</td> 
              <td v-if="!chain.config?.loadedYaml.validators[0].config" class="text-right">
                <v-btn 
                  :disabled="chain.online ? false : true" 
                  append-icon="mdi-open-in-new" 
                  variant="tonal" 
                  @click="openUrl('http://localhost:26657')"
                >View rpc</v-btn>                
              </td>
              <td v-else class="text-right">
                <v-btn 
                  :disabled="chain.online ? false : true" 
                  append-icon="mdi-open-in-new" 
                  variant="tonal" 
                  @click="openUrl('http://localhost' + chain.config?.loadedYaml.validators[0].config.rpc.laddr)"
                >View rpc</v-btn>                
              </td> 
            </tr>
            <tr> 
              <td>Faucet</td>
              <td v-if="!chain.config?.loadedYaml.faucet.port">http://localhost:4500</td>
              <td v-else>http://localhost:{{ chain.config?.loadedYaml.faucet.port }}</td> 
              <td v-if="!chain.config?.loadedYaml.faucet.port" class="text-right">
                <v-btn 
                  :disabled="chain.online ? false : true" 
                  append-icon="mdi-open-in-new" 
                  variant="tonal" 
                  @click="openUrl('http://localhost:4500')"
                >faucet</v-btn>                
              </td>
              <td v-else class="text-right">
                <v-btn 
                  :disabled="chain.online ? false : true" 
                  append-icon="mdi-open-in-new" 
                  variant="tonal" 
                  @click="openUrl('http://localhost:' + chain.config?.loadedYaml.faucet.port)"
                >faucet</v-btn>                
              </td> 
            </tr>
          </tbody>
        </v-table>
         <!--  {{ loadedYaml }} -->
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-btn block @click="dialogDetail = false" to="/scaffold">Create new chain</v-btn>
      </v-row> 
    <v-dialog
      v-model="dialogDetail"
      width="600"
      height="600"
    >
      <v-card>
        <v-card-text> 
          <v-textarea 
            v-model="yamlFile"
            label="Edit config"  
            auto-grow           
            variant="outlined"
          ></v-textarea> 
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="saveConfig">Save config</v-btn>
          <v-btn color="primary" block @click="dialogDetail = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="firstRunModal"
      width="auto"
      persistent
    >
    <v-card
    class="mx-auto"
    elevation="1"
    max-width="500"
  >
    <v-card-title class="pa-4 font-weight-black">Welcome to the ignite-ui</v-card-title>

    <v-card-text>
      This is the first time you are launching the software and we need you to create your config.
    </v-card-text>

    <v-card-text>

      <v-table> 
    <tbody>
 
      <tr>
        <td>Go</td>
        <td v-if="goGetVersion !== 'false'">
          <v-icon icon="mdi-check-circle-outline" size="large" color="success"></v-icon> Installed
        </td>
        <td v-else>
          <v-icon icon="mdi-close-circle-outline" size="large" color="error"></v-icon> Not installed
        </td>
      </tr>
      <tr>
        <td>Ignite-cli</td>
        <td v-if="igniteGetVersion !== 'false'">
          <v-icon icon="mdi-check-circle-outline" size="large" color="success"></v-icon> Installed
        </td>
        <td v-else>
          <v-icon icon="mdi-close-circle-outline" size="large" color="error"></v-icon> Not installed
        </td>
      </tr>
    </tbody>
  </v-table>

      <div class="text-subtitle-2 font-weight-black mb-1 mt-6">Your go export folder</div>

      <v-text-field     
        v-model="folderGo"   
        label="/home/<user>/go/bin/"
        single-line
        variant="outlined"
      ></v-text-field>       
      <div class="text-subtitle-2 font-weight-black mb-1">Your workspace folder</div>

      <v-text-field
        v-model="folderWork"
        label="/home/<user>/Desktop/ignite-workspace/"
        single-line
        variant="outlined"
      ></v-text-field>

      <v-btn
        :disabled="loading"
        :loading="loading"
        block
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"         
        @click="saveIgniteConfig"
      >
        Save config
      </v-btn>
    </v-card-text>
  </v-card>
    </v-dialog>
</template> 
<script>
 
 import { useAppStore } from '../stores/data'


export default {
  name: 'App',
  data: () => ({
    firstRunModal: false,
    loading: false,
    folderWork: '',
    folderGo: '',
    igniteGetVersion: '',
    goGetVersion: '',
    chainsList: '', 
    dialogDetail: false,
    dialogDetailData: '',
    chainSelectedPath: '',
    yamlFile: '',
    loadedYaml: ''
  }), 
  setup() {
    const store = useAppStore()
    return {
      store
    }
  },
  async created() { 
    // Check first run app
    if (typeof localStorage.folderWork === 'undefined') {
      this.firstRunModal = true
      this.igniteGetVersion = await window.electronAPI.version() 
      this.goGetVersion = await window.electronAPI.checkGo() 
    } 

    await this.store.loadChains() 
    setInterval(async () => {
      await this.store.refreshChains() 
    }, 5000);    
  },
  methods: {
    saveIgniteConfig () {
      localStorage.folderWork = this.folderWork
      localStorage.folderGo = this.folderGo  
      this.firstRunModal = false      
    },    
    openUrl(url) {
      console.log(url)
      window.electronAPI.openUrl(url)
    },
    saveConfig() {    
      window.electronAPI.saveConfig(this.chainSelectedPath, this.yamlFile)
    },
    async viewDetailChain(data) {
      this.dialogDetail = true
      this.dialogDetailData = data.config
      this.yamlFile = data.config.yamlFile
      this.loadedYaml = data.config.loadedYaml
      this.chainSelectedPath = data.path
    },
    async deleteChain(chain) {
      let chains = JSON.parse(localStorage.chains)
      await window.electronAPI.deleteChain(chain.path)      
      let index = chains.findIndex(x => x.name === chain.name)
      chains.splice(index, 1)
      localStorage.chains = JSON.stringify(chains)
      this.store.chainsList = JSON.parse(localStorage.chains)
    },
    async startChain(chain) { 
      await this.store.startChain(chain)          
    },    
    stopChain(chain) { 
      this.store.stopChain(chain) 
    }
  }

}
</script>
<style>
.heartOn {
  height: 90%;
  margin-left: auto;
  animation: 1.5s ease 0s infinite beat;
}
@keyframes beat {
  0%, 50%, 100% { transform: scale(1, 1); }
  30%, 80% { transform: scale(0.92, 0.95); }
} 
</style>