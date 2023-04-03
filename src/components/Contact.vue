<template>
  <div>
    <h1>{{ this.tittle }}</h1>


  </div>
</template>

<script>
  export default{
    data() {
        return {
            tittle: ''
        }
    }}
</script>

<style lang="scss" scoped >


div {
  display: grid;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  background: no-repeat;

}

</style>
