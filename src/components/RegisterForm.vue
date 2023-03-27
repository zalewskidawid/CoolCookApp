<template>
  <v-container class="fill-height">
    <v-card
      class="mx-auto pa-6"
      max-width="344"
      title="User Registration"
    >
        <v-form @submit.prevent>
        <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
          :rules="firstNameRules"
        ></v-text-field>

        <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>

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

        <v-checkbox
          v-model="boolValue"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
        <v-btn type="submit" block class="mt-2" color="success" @click="getUserData">Submit
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        </v-form>
      <h3>Already have account?</h3>
      <router-link to="/Login"><v-btn variant="tonal">Login</v-btn></router-link>
    </v-card>
  </v-container>
  </template>

<script>
export default {
  data: () => ({
    first: '',
    last: '',
    email: '',
    password: '',
    boolValue: false,
    firstNameRules: [
      value => {
        console.log(value);
        if (value) return true
        return 'You must enter a first name.'
      },
    ],
  }),
  methods: {
    getUserData() {
      const data = {
        firstName: this.first,
        lastName: this.last,
        email: this.email,
        password: this.password,
        boolValue: this.boolValue
      }
      this.$store.dispatch('userRegistration', data);
      console.log(this.$store.state.userRegData);
    }
  }
}

</script>

<style>

</style>
