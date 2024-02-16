<template>
  <v-container>
    <v-row justify="center">
      <v-card min-width="900" class="pa-4 ma-4">
        <span v-html="version"></span>
      </v-card>
    </v-row>
    
  </v-container>
</template> 
<script>
 
export default {
  name: 'App',
  data: () => ({
    version: '',
    drawer: true,
    rail: true,
  }), 
  async created() {
      window.electronAPI.sendMessage('Hello from App.vue!')
      let getVersion = await window.electronAPI.version() 
      console.log(getVersion)
      this.version = getVersion.replace(/\n/g, '<br />')
  } 
}
</script>