<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><router-link to="/Contact">Kontakt</router-link></li>
          <li><router-link to="/">Strona główna</router-link></li>
          <li><router-link to="/Recipes">Przepisy</router-link></li>
        </ul>
        <button >Dodaj przepis</button>
        <div> Zaloguj się</div>

      </nav>
    </header>
    <body>

    </body>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>© 2023 STOPKA</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePages",
  components: {}

}
</script>

<style scoped>

</style>
