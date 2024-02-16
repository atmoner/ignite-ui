<template>
  <v-container>
  <v-row justify="center">
    <v-card min-width="900">
      <v-card-title>
        <span class="text-h5">Settings</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="folderWork"
                label="Working folder"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="folderGo"
                label="Go folder"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          block
          variant="tonal"
          @click="validate"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

</v-row>



</v-container>
</template>
<script>
  export default {
    data: () => ({
      folderWork: '',
      folderGo: '',
    }),
    mounted () {
      this.folderWork = localStorage.folderWork
      this.folderGo = localStorage.folderGo
    },
    methods: {
      validate () {
        console.log(this.folderWork)
        localStorage.folderWork = this.folderWork
        localStorage.folderGo = this.folderGo 

        
      },
    }
  }
</script>