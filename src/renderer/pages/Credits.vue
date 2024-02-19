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
                      src="https://raw.githubusercontent.com/atmoner/ignite-ui/next/src/renderer/public/logo.png?token=GHSAT0AAAAAACIRM3WCWC4HFEGW6ZTZF24SZOTXSIQ"
                      alt="John"
                    ></v-img>
                  </v-avatar>
                  <v-avatar v-else>
                    <v-img
                      src="https://raw.githubusercontent.com/atmoner/ignite-ui/next/src/renderer/public/atmon3r.jpg?token=GHSAT0AAAAAACIRM3WCB3J6JRR4HJU6AXAUZOTXUDQ"
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

    mounted() {

    },
    methods: {
      openUrl(url) {
        console.log(url)
        window.electronAPI.openUrl(url)
      }
    },
  }
</script>