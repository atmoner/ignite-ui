<template>
 
    <v-layout>
      
      <v-navigation-drawer
        v-model="drawer" 
        permanent 
        expand-on-hover 
        temporary
      >
        <v-list-item
          prepend-avatar="../logo.png" 
          nav
        >
        <v-list-item-title>Ignite-ui

          <v-chip 
            color="success"
            variant="outlined"
            x-small
            class="ml-2"
            label
          > 
            Beta
          </v-chip>
        </v-list-item-title>
          
          <!-- <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template> -->
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-lan" title="Relayer" value="Relayer" to="/relayer"></v-list-item>     -->    
          <v-list-item prepend-icon="mdi-atom" title="Scaffold" value="Scaffold" to="/scaffold"></v-list-item>           
          <v-list-item prepend-icon="mdi-alpha-v-box-outline" title="Version" value="Version" to="/version"></v-list-item>
          <v-list-item prepend-icon="mdi-cog" title="Settings" value="Settings" to="/settings"></v-list-item>
          <v-list-item prepend-icon="mdi-star-shooting" title="Credits" value="Credits" to="/credits"></v-list-item>
          
        </v-list>
      </v-navigation-drawer>
      <!-- <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Title</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar> -->
      <v-main>
 
         
        <router-view></router-view>
      </v-main>
    </v-layout>
 
</template>
<script>
 
export default {
  name: 'App',
  data: () => ({ 
    drawer: true,
    rail: true,
  }), 
  watch: {
    rail(to) {
      console.log(to)
    },
  },
  async created() {
    if (typeof localStorage.chains === 'undefined') {
      localStorage.setItem("chains", JSON.stringify([]))
    } 
  } 
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  border-radius: 50%; 
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  border-radius: 50%;
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
 
</style>
