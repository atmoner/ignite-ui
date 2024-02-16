<template>
 
    <v-layout>
      <v-navigation-drawer
        v-model="drawer" 
        permanent 
        expand-on-hover 
        temporary
      >
        <v-list-item
          prepend-avatar="https://uploads-ssl.webflow.com/61d0960dc36814254b73e5ba/63ab212f5f0e596e7edf9bca_1645620665618.jpg"
          title="Ignite"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-lan" title="Relayer" value="Relayer" to="/relayer"></v-list-item>     -->    
          <v-list-item prepend-icon="mdi-atom" title="Scaffold" value="Scaffold" to="/scaffold"></v-list-item>           
          <v-list-item prepend-icon="mdi-alpha-v-box-outline" title="Version" value="Version" to="/version"></v-list-item>
          <v-list-item prepend-icon="mdi-cog" title="Settings" value="Settings" to="/settings"></v-list-item>
        </v-list>
      </v-navigation-drawer>
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
