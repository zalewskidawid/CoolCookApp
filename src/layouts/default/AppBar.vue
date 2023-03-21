<template>
  <div flat >
    <div class="d-flex justify-space-between">
      <v-icon icon="mdi-circle-slice-4" />

      <router-link to="/"><v-btn variant="outlined">HomePage</v-btn></router-link>
      <router-link to="/Recipes"><v-btn variant="tonal">Recipes</v-btn></router-link>
      <router-link to="/Login"><v-btn variant="tonal">Login</v-btn></router-link>
      <router-link to="/Contact"><v-btn variant="tonal">Contact</v-btn></router-link>
    
    </div>
  </div>
</template>

<script >
  export default{}
</script>

<style scoped >
a{color: black;
text-decoration: none;}
    a:link {text-decoration: none}
    a:visited {text-decoration: none}
    a:active {text-decoration: none}
    a:hover {text-decoration: none}

    
</style>
