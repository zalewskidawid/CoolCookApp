

<template>
  <v-container class="fill-height">
    <v-card
      class="mx-auto pa-8"
      max-width="344"
      title="User Login"
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
  </v-container>
  </template>

<script>
  export default{

  }

</script>

