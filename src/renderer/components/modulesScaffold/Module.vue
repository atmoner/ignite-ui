<template>
 
  <v-card-text> 
                     <v-container>
                      <v-alert
                        class="mb-4"
                        icon="mdi-information-slab-circle-outline"
                        title="Scaffold module"
                        text="Cosmos SDK is a modular framework and each independent piece of functionality is implemented in a separate module. By default your blockchain imports a set of standard Cosmos SDK modules. To implement custom functionality of your blockchain, scaffold a module and implement the logic of your application."
                      ></v-alert>
                       <v-row>
                         <v-col cols="12">
                           <v-text-field
                             v-model="scafoldModuleName"
                             label="Module name"
                             required
                             variant="outlined"
                           ></v-text-field>
                           <v-text-field
                             v-if="moduleDepBool"
                             v-model="moduleName"
                             label="Dep name"
                             required
                             variant="outlined"
                           ></v-text-field>
                           <v-select
                            v-if="ibcMod"
                            label="Ibc Ordering"
                            variant="outlined"
                            :items="['none', 'ordered', 'unordered']"
                          ></v-select>
                         </v-col> 
                         <v-col
                           cols="12"
                           sm="6"
                           md="4"
                         >
                           <v-checkbox v-model="moduleDepBool" label="--dep"></v-checkbox>
                         </v-col>
                         <v-col
                           cols="12"
                           sm="6"
                           md="4"
                         >
                           <v-checkbox v-model="ibcMod" label="--ibc"></v-checkbox>
                         </v-col>
                         <v-col
                           cols="12"
                           sm="6"
                           md="4"
                         >
                           <v-checkbox v-model="params" label="--params"></v-checkbox>
                         </v-col>
                       </v-row>
                       <v-row
                         v-if="params"
                         v-for="(textField, i) in textFieldsParamaters"
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
     textFieldsParamaters: [{ 
       label1: "Key", 
       value1: "",
       label2: "Type",
       value2: ""
     }],
     fieldType: ['string', 'array.string', 'array.int', 'array.uint', 'bool', 'int', 'uint', 'coin', 'array.coin'], 
     scafoldModuleName: '',
     moduleDepBool: false,
     moduleName: '',
     ibcMod: false,
     noSimulation: false,
     params: false,
     returnScaffold: ''
   }), 
   methods: {
     async scaffoldNow() {
       console.log(this.textFieldsParamaters, this.scafoldModuleName)
       let finalField = ''
       for (let i = 0; i < this.textFieldsParamaters.length; i++) {        
         finalField += this.textFieldsParamaters[i].value1 + ':' + this.textFieldsParamaters[i].value2 + ' '
       }
       console.log(this.noMessage, this.noSimulation)
       let returnScaffold = await window.electronAPI.scaffoldAny(
         this.query, 
         this.scafoldModuleName, 
         finalField, 
         this.chainFolder,
         this.moduleName,
         this.noMessage, 
         this.noSimulation
       )
       console.log(returnScaffold)
       this.returnScaffold = returnScaffold.replace(/\n/g, '<br />')
       console.log(this.returnScaffold)
     },
     add() {
       this.textFieldsParamaters.push({ 
         label1: "Key", 
         value1: "",
         label2: "Type",
         value2: ""
       })
     },
     remove(index) {
       this.textFieldsParamaters.splice(index, 1)
     }
   } 
 }
 </script>