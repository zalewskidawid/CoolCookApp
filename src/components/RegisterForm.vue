<template>
  <v-container class="fill-height">
    <v-card
      class="mx-auto pa-8"
      max-width="344"
      title="User Registration"
    >
      <v-form ref="myForm" @submit.prevent class="pb-4">
        <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
          :rules="firstNameRules"
          class="pb-2"
        ></v-text-field>

        <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
          :rules="lastNameRules"
          class="pb-2"
        ></v-text-field>

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
        <v-btn type="submit" block class="mt-2" color="success" @click="validate">Register
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-form>
      <h3 class="pb-4">Already have account?</h3>
      <router-link to="/Login">
        <v-btn variant="tonal">Login</v-btn>
      </router-link>
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
    show1: false,
    firstNameRules: [
      value => {
        if (!value) {
          return 'You must enter a firstname.';
        } else if (/\d/.test(value)) {
          return 'Firstname cannot contain any numbers.'
        } else if (value.length < 2) {
          return 'Firstname length must be greather than one.'
        }
      },
    ],
    lastNameRules: [
      value => {
        if (!value) {
          return 'You must enter a lastname.'
        } else if (/\d/.test(value)) {
          return 'Lastname cannot contain any numbers.'
        } else if (value.length < 2) {
          return 'Lastname length must be greather than one.'
        }
      },
    ],
    emailRules: [
      value => {
        if (!value) {
          return 'You must enter email'
        } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
          return 'Email must contain @'
        }
      },
    ],
    passwordRules: [
      value => {
        if (!value) {
          return 'You must enter a password.'
        } else if (value.length < 8) {
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
          firstName: this.first,
          lastName: this.last,
          email: this.email,
          password: this.password,
        }
        try {
          await this.$store.dispatch('userRegistration', data);
          this.$router.replace('/');
        } catch (err) {
          alert(err.message || 'Failed to register. Check your data');
        }
      } else {
        return true;
      }
    },
  }
}

</script>

<style>
input {
  min-width: 300px !important;
}
</style>
