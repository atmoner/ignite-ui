<template>
 
 <v-card-text> 
  
                    <v-container>
                      <v-alert
                        class="mb-4"
                        icon="mdi-information-slab-circle-outline"
                        title="Scaffold message"
                        text="Message scaffolding is useful for quickly adding functionality to your blockchain to handle specific Cosmos SDK messages."
                      ></v-alert>
                      <v-row>
                        <v-col cols="12">
                          
                          <v-text-field
                            v-model="scafoldMessageName"
                            label="Message name"
                            required
                            variant="outlined"
                          ></v-text-field>
                          <v-text-field
                            v-if="descNameBool"
                            v-model="descName"
                            label="Commande description"
                            required
                            variant="outlined"
                          ></v-text-field>
                          <v-text-field
                            v-if="responseNameBool"
                            v-model="responseName"
                            label="Response field (commat separated)"
                            required
                            variant="outlined"
                          ></v-text-field>
                          <v-text-field
                            v-if="moduleNameBool"
                            v-model="moduleName"
                            label="Module name"
                            required
                            variant="outlined"
                          ></v-text-field>
                          
                        </v-col> 
                        <v-col
                          cols="12"
                          sm="6"
                          md="3"
                        >
                          <v-checkbox v-model="descNameBool" label="--desc"></v-checkbox>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="3"
                        >
                          <v-checkbox v-model="responseNameBool" label="--response"></v-checkbox>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="3"
                        >
                          <v-checkbox v-model="moduleNameBool" label="--module"></v-checkbox>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="3"
                        >
                          <v-checkbox v-model="noMessage" label="--no-message"></v-checkbox>
                        </v-col>
 
                      </v-row>
                      <v-row
                        v-for="(textField, i) in textFields"
                        :key="i"
                        class="text-fields-row"
                        >
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field
                            prepend-icon="mdi-close-box-outline" 
                            :label="textField.label1"
                            v-model="textField.value1"
                            variant="outlined"
                            @click:prepend="remove(i)"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
 
                          <v-select
                            v-model="textField.value2"
                            :label="textField.label2"
                            :items="fieldType"
                            variant="outlined"
                          ></v-select>
                        </v-col>
 
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="scaffoldNow()"
                    >
                      Save
                    </v-btn>
                    <v-btn @click="add" variant="text" color="blue-darken-1">add</v-btn>
                  </v-card-actions>
                  <span v-html="returnScaffold"></span> 

</template>
<script>
export default {
  name: 'App',
  props: ['chainFolder', 'query'],
  data: () => ({
    textFields: [{ 
      label1: "Key", 
      value1: "",
      label2: "Type",
      value2: ""
    }],
    fieldType: ['string', 'array.string', 'array.int', 'array.uint', 'bool', 'int', 'uint', 'coin', 'array.coin'], 
    scafoldMessageName: '',
    moduleNameBool: false,
    descNameBool: false,
    responseNameBool: false,
    moduleName: '',
    descName: '',
    responseName: '',
    noMessage: false,
    noSimulation: false,
    returnScaffold: ''
  }), 
  methods: {
    async scaffoldNow() {
      console.log(this.textFields, this.scafoldMessageName)
      let finalField = ''
      for (let i = 0; i < this.textFields.length; i++) {        
        finalField += this.textFields[i].value1 + ':' + this.textFields[i].value2 + ' '
      }
      console.log(this.noMessage, this.noSimulation)
      let returnScaffold = await window.electronAPI.scaffoldMessage(
        this.query, 
        this.scafoldMessageName, 
        finalField, 
        this.chainFolder,
        this.moduleName,
        this.descName, 
        this.responseName,
        this.noSimulation, 
      )
      console.log(returnScaffold)
      this.returnScaffold = returnScaffold.replace(/\n/g, '<br />')
      console.log(this.returnScaffold)
    },
    add() {
      this.textFields.push({ 
        label1: "Key", 
        value1: "",
        label2: "Type",
        value2: ""
      })
    },
    remove(index) {
      this.textFields.splice(index, 1)
    }
  } 
}
</script>