 <template>
  <v-container  fluid class="fill-height">
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
          id="password"
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
        <v-text-field
          id="confirmPassword"
          v-model="confirmPassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[ () => this.passwordsMatch() || 'Passwords do not match']"
          :type="show1 ? 'text' : 'password'"
          label="Confirm password"
          placeholder="Enter your password again."
          variant="underlined"
          @click:append="show1 = !show1"
          class="pb-2"
        ></v-text-field>

        <v-checkbox
        id="robot"
      v-model="checkbox"
      @change="handleVerification($event)"
      :label=information
      ></v-checkbox>
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

    <Popup :dialog="dialog" :errorText="errorText"/>

  </v-container>
</template>





<script>

import Popup from '@/components/Popup.vue';

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
            web.information = `I'm not a robot`
            const robot = document.querySelector('#robot');
            robot.ariaDisabled = true;
            robot.disabled = true;
          })

          .onFail(function() {
            web.information = `I'm a robot`
            // robot.checked = false;
            // robot.value = false;
            // robot.ariaChecked = false;
            robot.ariaDisabled = true;
            robot.disabled = true;
          })
          .onError(function () {
            console.error('error')
            //your code

          });

      }
    );
  },

  data: () => ({
    information: `I'm not a robot`,
    errorText: '',
    first: '',
    last: '',
    email: '',
    password: '',
    confirmPassword: '',
    show1: false,
    geetest: '',
    checkbox: false,
    dialog: false,
    firstNameRules: [
      value => {
        if (!value) {
          return 'You must enter a firstname.';
        } else if (value.length < 2) {
          return 'First name length must be greater than one.'
        } else if (value.length > 40) {
          return 'First name length must be lower than fourty.'
        }
        else if (!(/^[a-zA-Z]'?([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]|\.| |-)+$/.test(value))) {
          return 'First name cannot contain any number and special chars.'
        }
      },
    ],
    lastNameRules: [
      value => {
        if (!value) {
          return 'You must enter a lastname.'
        }  else if (value.length < 2) {
          return 'Last name length must be greater than one.'
        }
        else if (value.length > 40) {
          return 'Last name length must be lower than fourty.'
        }
        else if  (!(/^[a-zA-Z]'?([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]|\.| |-)+$/.test(value))) {
          return 'Last name cannot contain any numbers and special chars.'
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

    passwordsMatch() {
      return this.password === this.confirmPassword;
    },

    handleVerification(e){
      this.geetest.showBox();
    },

    handleSubmit(){
      this.submitted = true;
    },

    async validate() {
      this.dialog = false;

      const {valid} = await this.$refs.myForm.validate()

      if (valid && this.submitted) {
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
          this.dialog = true;
          this.errorText = (err.message || 'Failed to register. Check your data');
        }
      } else {
        const invalidForm = 'Fill form to complete register';
        const invalidCaptcha = `Robot's can't use our page`;
        this.dialog = true;
        // !valid?(!this.submitted?(alert(invalidForm)):(alert(invalidCaptcha))):(!this.submitted?(alert(invalidCaptcha)):(alert(invalidForm)));
        !valid?(!this.submitted?(this.errorText = invalidForm):(this.errorText =invalidCaptcha)):(!this.submitted?(this.errorText =invalidCaptcha):(this.errorText =invalidForm));
      }
    }},
    components: {Popup: Popup}
  }

</script>

<style>
input {
  min-width: 300px !important;
}
</style>
