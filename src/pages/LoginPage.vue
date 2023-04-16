

<template>
  <v-container fluid class="fill-height">
    <v-card
      class="mx-auto pa-8"
      max-width="344"
      title="User Login"
    >
      <v-form ref="myForm" @submit.prevent class="pb-4">
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
          :rules="emailRules"
          class="pb-2"
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
          class="pb-2"

        ></v-text-field>
        <v-btn type="submit" block class="mt-2" color="success" @click="validate">Login
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-form>
      <h3 class="pb-2">No account?</h3>
      <router-link to="/Register">
        <v-btn variant="tonal">Register</v-btn>
      </router-link>
    </v-card>
  </v-container>
</template>
<script>
export default {
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
          return 'Please enter a valid email address.'
        }

      },
    ],
    passwordRules: [
      value => {
        if (!value) {
          return 'You must enter a password.'
        }
        if (value.length < 8) {
          return 'Password length must be greater than 7.'
        }
      },
    ],
  }),
  methods: {
    async validate() {
      const {valid} = await this.$refs.myForm.validate()
      if (valid) {
        const data = {
          email: this.email,
          password: this.password,
        }
        try {
          await this.$store.dispatch('userLogin', data);
          this.$router.replace('/');
        } catch (err) {
          //FIXME:: err.message is: Failed to register.
          alert(err.message || 'Failed to login. Check your data.');
          // alert(err.message || 'Failed to login. Check your data.');
        }
      } else {
        return true;
      }
    }
  }
}


</script>

<style lang="scss" scoped>


</style>
