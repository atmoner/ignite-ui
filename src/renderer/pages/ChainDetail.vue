<template>
  <v-container>
    <v-card>
    <v-tabs
      v-model="tab" 
    >
      <v-tab value="one">Chain Info</v-tab>
      <v-tab value="config">Config</v-tab>
      <v-tab value="two">Scaffold</v-tab>
      <v-tab value="three">Generate</v-tab>
      <v-tab value="four">Console</v-tab>
      
      <!-- <v-tab value="five">Relayer</v-tab> -->
      
    </v-tabs>

      <v-card-text >
        <v-window v-model="tab" >
          <v-window-item value="one" >
            <v-row no-gutters >
              <v-col
                cols="12"
                sm="6"
              >
                <v-card class="ma-6 pa-6"  min-height="300" min-width="400">
                  Chain name: {{ chainInfo.name }} <br>
                  Chain path: {{ chainInfo.path }} <br> 
                  <v-table  >
                  <tbody>
                    <tr>
                      <td>Lcd</td>
                      <td v-if="!chainConfig.config?.loadedYaml.validators[0].app">http://localhost:1317</td>
                      <td v-else>http://localhost{{ chainConfig.config?.loadedYaml.validators[0].app.api.address }}</td>
                    </tr>
                    <tr>
                      <td>Rpc</td>
                      <td v-if="!chainConfig.config?.loadedYaml.validators[0].config">http://localhost:26657</td>
                      <td  v-else>http://localhost{{ chainConfig.config?.loadedYaml.validators[0].config.rpc.laddr }}</td> 
                    </tr>
                    <tr>
                      <td>Grpc</td>
                      <td v-if="!chainConfig.config?.loadedYaml.validators[0].app">http://localhost:26657</td>
                      <td  v-else>http://localhost{{ chainConfig.config?.loadedYaml.validators[0].app.grpc.address }}</td> 
                    </tr>
                  </tbody>
                </v-table>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-card class="ma-6 pa-6" min-height="300" min-width="400">
 
          <v-list lines="two"> 

              <v-list-item
                title="Start"
                subtitle="Start the chain"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white">mdi-folder</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-information"
                    variant="text"
                  ></v-btn>
                </template>
              </v-list-item>
              <v-list-item
                title="Stop"
                subtitle="Stop the chain"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white">mdi-folder</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-information"
                    variant="text"
                  ></v-btn>
                </template>
              </v-list-item>
              </v-list>
                </v-card>
              </v-col>
            </v-row>
 
          </v-window-item>
          <v-window-item value="config">
            <v-sheet>
 
            <v-textarea 
              v-model="yamlFile"
              class="mt-4"
              label="Edit config"  
              auto-grow           
              variant="outlined"
            ></v-textarea>   
 
              <v-btn block @click="saveConfig">Save config</v-btn> 
            </v-sheet>
          </v-window-item>
          <v-window-item value="two">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="i in itemsScaffold"
                :key="i"
              >
              <v-expansion-panel-title>
                {{ i.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text> 
                <ScaffoldList v-if="i.title === 'scaffold list'" :chainFolder="chainInfo.path" :query="i.title" /> 
                <ScaffoldMap v-if="i.title === 'scaffold map'" :chainFolder="chainInfo.path" :query="i.title" />   
                <ScaffoldMessage v-if="i.title === 'scaffold message'" :chainFolder="chainInfo.path" :query="i.title" />
                <ScaffoldModule v-if="i.title === 'scaffold module'" :chainFolder="chainInfo.path" :query="i.title" />
                <ScaffoldPacket v-if="i.title === 'scaffold packet'" :chainFolder="chainInfo.path" :query="i.title" />  
                <ScaffoldQuery v-if="i.title === 'scaffold query'" :chainFolder="chainInfo.path" :query="i.title" />  
                
              </v-expansion-panel-text>            
            
              </v-expansion-panel>
            </v-expansion-panels>
 
 

          </v-window-item>

          <v-window-item value="three">
 
            <v-list lines="two">
              <v-list-subheader inset>Generate</v-list-subheader>

              <v-list-item >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon>mdi-file-code</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Composables</v-list-item-title>
                <v-list-item-subtitle>
                  TypeScript frontend client and Vue 3 composables.
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    :loading="loadingGenerate.composable"
                    class="flex-grow-1"
                    height="32"
                    variant="tonal"
                    @click="generateComposable()"
                  >
                    Generate
                  </v-btn>
                </template>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon>mdi-webhook</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Hooks</v-list-item-title>
                <v-list-item-subtitle>
                  TypeScript frontend client and React hooks.
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    :loading="loadingGenerate.hooks"
                    class="flex-grow-1"
                    height="32"
                    variant="tonal"
                    @click="generateHooks()"
                  >
                    Generate
                  </v-btn>
                </template>
              </v-list-item>    
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon>mdi-api</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Openapi</v-list-item-title>
                <v-list-item-subtitle>
                  OpenAPI spec for your chain.
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    :loading="loadingGenerate.openapi"
                    class="flex-grow-1"
                    height="32"
                    variant="tonal"
                    @click="generateOpenApi()"
                  >
                    Generate
                  </v-btn>
                </template>
              </v-list-item>                    
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon>mdi-language-go</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Proto-go</v-list-item-title>
                <v-list-item-subtitle>
                  Compile protocol buffer files to Go source code required by Cosmos SDK.
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    :loading="loadingGenerate.protogo"
                    class="flex-grow-1"
                    height="32"
                    variant="tonal"
                    @click="generateProtoGo()"
                  >
                    Generate
                  </v-btn>
                </template>
              </v-list-item> 
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon >mdi-language-typescript</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>Ts-client</v-list-item-title>
                <v-list-item-subtitle>
                  Generate a framework agnostic TypeScript client for your blockchain project.
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    :loading="loadingGenerate.tsclient"
                    class="flex-grow-1"
                    height="32"
                    variant="tonal"
                    @click="generateTsClient()"
                  >
                    Generate
                  </v-btn>
                </template>
              </v-list-item> 
            </v-list>
            

          </v-window-item>

          <v-window-item value="four"> 
            <br />
            <span>q {{ chainInfo.name }} list-blog </span>
            <br />
            <span>tx {{ chainInfo.name }} create-blog test testdesc --chain-id {{ chainInfo.name }} --from alice</span>
            <br /><br /><br />
            <v-text-field  
              v-model="cliQuery"
              label="Module name"
              required
              variant="outlined"
            ></v-text-field>
            <v-textarea 
              v-model="outputBinary"
              label="Output Binary"  
              auto-grow           
              variant="outlined"
            ></v-textarea>   
            <v-btn block variant="tonal" @click="runBinaryFunc">Run</v-btn>          
          </v-window-item>
         <!--  <v-window-item value="five">
            network
          </v-window-item> -->

        </v-window>
      </v-card-text>    
    </v-card>
  </v-container>
  <v-dialog
      v-model="dialog"
      width="500"
    >
 
      <v-card
        v-if="dialog"
        append-icon="$close" 
        elevation="16"
        max-width="500"
        title="Generate finished"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>
 
          
        </div>
        <span class="ml-6 text-left" v-html="returnGenerate"></span> 
        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            rounded
            variant="outlined"
            @click="dialog = false"
          >
            Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

<!--     <v-dialog
      v-model="dialog"
      width="auto"
    >
    <v-card>
        <v-card-title>
          <span class="text-h5">Scaffold list</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div style="height: 60vh; width: 70vw">
              <hint-overlay :prompt="prompt" />
              <baklava-editor :plugin="viewPlugin" />
            </div>
 
          </v-container> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
</template>
<script>
 
import { Editor, NodeBuilder } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue3";
import { OptionPlugin } from "@baklavajs/plugin-options-vue3";
import { Engine } from "@baklavajs/plugin-engine";
import ScaffoldList from '../components/modulesScaffold/List.vue'
import ScaffoldMap from '../components/modulesScaffold/Map.vue'
import ScaffoldMessage from '../components/modulesScaffold/Message.vue'
import ScaffoldModule from '../components/modulesScaffold/Module.vue'
import ScaffoldPacket from '../components/modulesScaffold/Packet.vue'
import ScaffoldQuery from '../components/modulesScaffold/Query.vue'

export default {
  name: 'App',
  components: {
    ScaffoldList: ScaffoldList,
    ScaffoldModule: ScaffoldModule,
    ScaffoldMap: ScaffoldMap,
    ScaffoldMessage: ScaffoldMessage,
    ScaffoldPacket: ScaffoldPacket,
    ScaffoldQuery: ScaffoldQuery,
  },
  data: () => ({
    chainInfo: '',
    chainConfig: '',
    dialog: false,
    yamlFile: '',
    editor: new Editor(),
      viewPlugin: new ViewPlugin(),
      engine: new Engine(true),
      prompt: undefined,
      nodes: [],
      tab: null,
      cliQuery: '',
      outputBinary: '',
      loadingGenerate: {
        composable: false,
        hooks: false,
        openapi: false,
        protogo: false,
        tsclient: false
      },
      returnGenerate: '',
      itemsScaffold: [
        { title: 'scaffold list' },
        { title: 'scaffold map' },
        { title: 'scaffold message' },
        { title: 'scaffold module' },
        { title: 'scaffold packet' },
        { title: 'scaffold query' },
        { title: 'scaffold single' },
        
      ],
 
  }), 
  async created() { 
    // Register the plugins
    // The view plugin is used for rendering the nodes
    this.editor.use(this.viewPlugin);
    // The option plugin provides some default option UI elements
    this.editor.use(new OptionPlugin());
    // The engine plugin calculates the nodes in the graph in the
    // correct order using the "calculate" methods of the nodes
    this.editor.use(this.engine);
    // Show a minimap in the top right corner
    this.viewPlugin.enableMinimap = false;
    //this.viewPlugin.registerOption("TextAreaOption", TextAreaOption);

    const TextNode = new NodeBuilder("Ignite list")
      .addOption("text2", "TextAreaOption", "cas")
      .addOption("text", "InputOption")
      .addOutputInterface("Fields")
      .onCalculate((n) => {})
      .build();

      const fieldNode = new NodeBuilder("Field") 
      .addOption("Variable", "SelectOption",  'string', undefined, {
        items: ['string', 'array.string', 'array.int', 'array.uint', 'bool', 'int', 'uint', 'coin', 'array.coin'],
      })
      .addOption("Type", "InputOption")
      .addInputInterface("Fields")
      .onCalculate((n) => {})
      .build();      

    const OutputNode = new NodeBuilder("Fields")
      .addOption("Variable", "SelectOption",  'string', undefined, {
        items: ['string', 'array.string', 'array.int', 'array.uint', 'bool', 'int', 'uint', 'coin', 'array.coin'],
      })
      .addOption("Type", "InputOption")
      .addOutputInterface("Output", "InputOption")
      .addInputInterface("Input", "InputOption")
      

      .onCalculate((n) => {
        // let val = n.getInterface("Input").value;
      })
      .build();

    // add node to editor
    // this.editor.registerNodeType("Ignite list", TextNode);
    this.editor.registerNodeType("Field", fieldNode);

    // add some nodes so the screen is not empty on startup
   // const node2 = this.addNodeWithCoordinates(OutputNode, 400, 40);
    const node7 = this.addNodeWithCoordinates(TextNode, 100, 40);

/*     this.editor.addConnection(
      node7.getInterface("Fields"),
      node2.getInterface("Input")
    );
     */
    const getChains = JSON.parse(localStorage.chains)
    getChains.filter( async (chain) => {
      if (chain.name === this.$route.params.name) {
        console.log(chain)
        this.chainInfo = chain
        this.chainConfig = await window.electronAPI.getChainConfig(chain.path)
        this.yamlFile = this.chainConfig.yamlFile
      }
    }) 

  },
  methods: {
    saveConfig() {    
      console.log(this.chainConfig)
      let copyData = this.yamlFile
      window.electronAPI.saveConfig(this.chainInfo.path, this.yamlFile)
    },
    runBinaryFunc () {
      // console.log(localStorage.folderGo +  this.chainInfo.name + 'd', this.cliQuery)
      window.electronAPI.runBinary(localStorage.folderGo + '/' +  this.chainInfo.name + 'd', this.cliQuery + ' --node http://localhost:26657')
      .then((res) => {
        console.log(res)
        this.outputBinary = res.stdout
      })
      .catch(error => {
      // do something with error
        console.log(error)
        this.outputBinary = error
      })
    },
    addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      this.editor.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    },
    async generateComposable() {
      this.loadingGenerate.composable = true
      let returnGenerate = await window.electronAPI.generateComposable( 
        this.chainInfo.path
      )
      this.returnGenerate = returnGenerate.replace(/\n/g, '<br />')
      this.loadingGenerate.composable = false
      this.dialog = true
    },
    async generateHooks() {
      this.loadingGenerate.hooks = true
      let returnGenerate = await window.electronAPI.generateHooks( 
        this.chainInfo.path
      )
      this.returnGenerate = returnGenerate.replace(/\n/g, '<br />')
      this.loadingGenerate.hooks = false
      this.dialog = true
    },
    generateOpenApi() {
      this.loadingGenerate.openapi = true
      window.electronAPI.generateOpenApi( 
        this.chainInfo.path
      )
      .then((res) => {
        console.log(res)
        this.returnGenerate = res.replace(/\n/g, '<br />')
        this.loadingGenerate.openapi = false
        this.dialog = true
      })
      .catch(error => {
      // do something with error
        console.log(error)
        this.returnGenerate = error
        this.loadingGenerate.openapi = false
        this.dialog = true
      })
    },
    generateProtoGo() {
      this.loadingGenerate.protogo = true
      window.electronAPI.generateProtoGo( 
        this.chainInfo.path
      )
      .then((res) => {
        console.log(res)
        this.returnGenerate = res.replace(/\n/g, '<br />')
        this.loadingGenerate.protogo = false
        this.dialog = true
      })
      .catch(error => {
      // do something with error
        console.log(error)
        this.returnGenerate = error
        this.loadingGenerate.protogo = false
        this.dialog = true
      })
    },
    generateTsClient() {
      this.loadingGenerate.tsclient = true
      window.electronAPI.generateTsClient( 
        this.chainInfo.path
      )
      .then((res) => {
        console.log(res)
        this.returnGenerate = res.replace(/\n/g, '<br />')
        this.loadingGenerate.tsclient = false
        this.dialog = true
      })
      .catch(error => {
      // do something with error
        console.log(error)
        this.returnGenerate = error
        this.loadingGenerate.tsclient = false
        this.dialog = true
      })
    },
  },

}
</script>
<style scoped>
.table {
  background-color: grey;
}
</style> 