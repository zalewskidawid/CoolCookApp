 <template>
  <v-container  fluid class="fill-height">
    <v-card
      class="mx-auto pa-8"
      max-width="344"
      title="User Registration"
    >
      <v-form ref="myForm" @submit.prevent="handleVerification" class="pb-4">
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
        <v-btn type="submit"
               block class="mt-2"
               color="success"
               @click="validate">Register
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

  mounted(){
    let web = this;
    initGeetest4(
      {
        // Omit required configuration parameters

        product: "bind",
        captchaId:'5b49a80c1d016178160d866e71d43fa3',
      },
      function (captchaObj) {
        web.geetest = captchaObj;
        captchaObj
          .onReady(function () {
            // please call the showCaptcha method to show the CAPTCHA when it is ready
          })
          .onSuccess(function () {
            web.handleSubmit();
            // your code, please reset the CAPTCHA based on you business
          })
          .onError(function () {
            //your code
          });



      }
    );
  },

  data: () => ({
    first: '',
    last: '',
    email: '',
    password: '',
    show1: false,
    geetest: '',
    firstNameRules: [
      value => {
        if (!value) {
          return 'You must enter a firstname.';
        } else if (!(/^[a-zA-Z]'?([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]|\.| |-)+$/.test(value))) {
          return 'First name cannot contain any number and special chars.'
        } else if (value.length < 2) {
          return 'First name length must be greater than one.'
        } else if (value.length > 40) {
          return 'First name length must be lower than fourty.'
        }
      },
    ],
    lastNameRules: [
      value => {
        if (!value) {
          return 'You must enter a lastname.'
        } else if  (!(/^[a-zA-Z]'?([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]|\.| |-)+$/.test(value))) {
          return 'Last name cannot contain any numbers and special chars.'
        } else if (value.length < 2) {
          return 'Last name length must be greater than one.'
        }
        else if (value.length > 40) {
          return 'Last name length must be lower than fourty.'
        }
      },
    ],
    emailRules: [
      value => {
        if (!value) {
          return 'You must enter email'
        } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
          return 'Please enter a valid email address.'
        }
      },
    ],
    passwordRules: [
      value => {
        if (!value) {
          return 'You must enter a password.'
        }
        else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&^()_-])[A-Za-z\d@$!#%*?&^()_-]{8,}$/.test(value))) {
          return 'Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:.'
        }

      },
    ],

  }),

  methods: {

    handleVerification(){
      this.geetest.showBox();
    },

    handleSubmit(){
      this.submitted = true;
    },

    async validate() {

      const {valid} = await this.$refs.myForm.validate()


      if(this.submitted == true){
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
    }},
  }
}

</script>

<style>
input {
  min-width: 300px !important;
}
</style>
