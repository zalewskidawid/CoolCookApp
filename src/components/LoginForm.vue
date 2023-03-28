

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
          :rules="emailRules"
        ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules='passwordRules'
        :type="show1 ? 'text' : 'password'"
        label="Password"
        placeholder="Enter your password."
        variant="underlined"
        @click:append="show1 = !show1"

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
    data: () => ({
      email: '',
      password: '',
      show1: false,
      emailRules: [
        value => {
          if (value === '') {
            return 'You must enter email'
          }
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true
          } else {
            return 'E-mail must contain @'
          }

        },
      ],
      passwordRules: [
        value => {
          if (value === '') {
            return 'You must enter a password.'
          }
          if (value.length < 8) {
            return 'Password length must be greater than 7.'
          }
        },
      ],

    })
  }


</script>

<style lang="scss" scoped >


</style>
