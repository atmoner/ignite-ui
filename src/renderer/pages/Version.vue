<template>
 
    <v-row class="mt-4" justify="center">
      <v-card min-width="900" class="pa-4 ma-4">
        <v-card-title>
          Ignite-ui version
        </v-card-title>
        <v-card-text>
          Ignite UI version: v0.1.3
        </v-card-text>
 
    <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn>
          check version
          <v-tooltip
            activator="parent"
            location="top"
          >Soon</v-tooltip>
        </v-btn>
 
      </v-card-actions>
      </v-card>
      <v-card max-width="900" class="pa-4 ma-4">
        <v-card-title>
          Ignite-cli version
        </v-card-title>
        <v-card-text>
          <span v-html="version"></span>
        </v-card-text>
        <v-divider></v-divider>

<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn>
    check version
    <v-tooltip
      activator="parent"
      location="top"
    >Soon</v-tooltip>
  </v-btn>

</v-card-actions>
      </v-card>
    </v-row>     
</template> 
<script>
 
export default {
  name: 'App',
  data: () => ({
    version: '',
  }), 
  async created() {

      let getVersion = await window.electronAPI.version() 
      //console.log(getVersion)
      this.version = getVersion.replace(/\n/g, '<br />')
  } 
}
</script>