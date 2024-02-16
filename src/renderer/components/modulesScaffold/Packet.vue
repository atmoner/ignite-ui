<template>
 
 <v-card-text> 
  
                    <v-container>
                      <v-alert
                        class="mb-4"
                        icon="mdi-information-slab-circle-outline"
                        title="Scaffold packet"
                        text="Scaffold an IBC packet in a specific IBC-enabled Cosmos SDK module"
                      ></v-alert>
                      <v-row>
                        <v-col cols="12">
                          
                          <v-text-field
                            v-model="scafoldPacketName"
                            label="Packet name"
                            required
                            variant="outlined"
                          ></v-text-field>
                          <v-text-field
                            v-if="ackNameBool"
                            v-model="ackName"
                            label="Ack field(s) (commat separated)"
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
                          md="4"
                        >
                          <v-checkbox v-model="ackNameBool" label="--ack"></v-checkbox>
                        </v-col>
                         <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox v-model="moduleNameBool" label="--module"></v-checkbox>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
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
                          sm="12"
                        >
                          <v-text-field
                            prepend-icon="mdi-close-box-outline" 
                            :label="textField.label1"
                            v-model="textField.value1"
                            variant="outlined"
                            @click:prepend="remove(i)"
                          ></v-text-field>
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
      label1: "Field", 
      value1: ""
    }],
    scafoldPacketName: '',
    moduleNameBool: false,
    ackNameBool: false,
    moduleName: '',
    ackName: '',
    noMessage: false,
    noSimulation: false,
    returnScaffold: ''
  }), 
  methods: {
    async scaffoldNow() {
      console.log(this.textFields, this.scafoldPacketName)
      let finalField = ''
      for (let i = 0; i < this.textFields.length; i++) {        
        finalField += this.textFields[i].value1 + ' '
      }
      console.log(this.noMessage, this.noSimulation)
      let returnScaffold = await window.electronAPI.scaffoldPacket(
        this.query, 
        this.scafoldPacketName, 
        finalField, 
        this.chainFolder,
        this.moduleName,
        this.ackName,
        this.noSimulation, 
      )
      console.log(returnScaffold)
      this.returnScaffold = returnScaffold.replace(/\n/g, '<br />')
      console.log(this.returnScaffold)
    },
    add() {
      this.textFields.push({ 
        label1: "Field", 
        value1: ""
      })
    },
    remove(index) {
      this.textFields.splice(index, 1)
    }
  } 
}
</script>