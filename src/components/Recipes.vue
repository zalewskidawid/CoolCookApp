<template>
  <div>
    <h1>{{ this.tittle }}</h1>
  </div>
</template>

<script>
  export default{
    data() {
        return {
            tittle: 'Recipes works'
        }
    }}
</script>

<style lang="scss" scoped >

// a.active-link{
//   color: black  !important;
// }

div {
  display: grid;
  margin-top: 80px;
  justify-content: center;
  align-items: center;

}

</style>
