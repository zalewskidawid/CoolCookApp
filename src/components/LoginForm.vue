

<template>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-spacer></v-spacer>
  
        <v-btn color="success">
          Complete Registration
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <h3>No account?</h3>
    <router-link to="/Register"><v-btn variant="tonal">Register</v-btn></router-link>
    </v-card>
  </template>

<script>
  export default{

  }

</script>

<style>
.container{
    width: 300px;
    background-color: rgb(255, 0, 255);
    border-radius: 20px;
}

</style>