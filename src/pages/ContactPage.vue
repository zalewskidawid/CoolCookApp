<template>
  <div >

    <v-container fluid class="fill-height">
      <v-card
        class="mx-auto pa-8"
        max-width="344"
        title="Contact Us"
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

          <v-textarea  variant="outlined"
                      v-model="description"
                      color="primary"
                      label="Description"

          ></v-textarea>

          <v-btn type="submit" block class="mt-2" color="success" @click="validate">Send
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-form>
      </v-card>
    </v-container>

    <div class="usercards">
    <v-container
      fluid
      style="height: 300px"
    >
      <v-row justify="center">
        <v-menu
          min-width="200px"
          rounded
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
            >
              <v-avatar
                color="brown"
                size="large"
              >
                <span class="text-h5">{{ michal.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar
                  color="brown"
                >
                  <span class="text-h5">{{ michal.initials }}</span>
                </v-avatar>
                <h3>{{ michal.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ michal.email }}
                </p>
                <p class="text-caption mt-1">
                  Web Developer
                </p>


                <v-divider class="my-3"></v-divider>

                <v-divider class="my-3"></v-divider>

              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </v-container>


      <v-container
        fluid
        style="height: 300px"
      >
        <v-row justify="center">
          <v-menu
            min-width="200px"
            rounded
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
              >
                <v-avatar
                  color="pink"
                  size="large"
                >
                  <span class="text-h5">{{ dawidw.initials }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar
                    color="pink"
                  >
                    <span class="text-h5">{{ dawidw.initials }}</span>
                  </v-avatar>
                  <h3>{{ dawidw.fullName }}</h3>
                  <p class="text-caption mt-1">
                    {{ dawidw.email }}
                  </p>
                  <p class="text-caption mt-1">
                    Web Developer
                  </p>


                  <v-divider class="my-3"></v-divider>

                  <v-divider class="my-3"></v-divider>

                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>


      <v-container
        fluid
        style="height: 300px"
      >
        <v-row justify="center">
          <v-menu
            min-width="200px"
            rounded
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
              >
                <v-avatar
                  color="blue"
                  size="large"
                >
                  <span class="text-h5">{{ dawidz.initials }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar
                    color="blue"
                  >
                    <span class="text-h5">{{ dawidz.initials }}</span>
                  </v-avatar>
                  <h3>{{ dawidz.fullName }}</h3>
                  <p class="text-caption mt-1">
                    {{ dawidz.email }}
                  </p>
                  <p class="text-caption mt-1">
                    Web Developer
                  </p>


                  <v-divider class="my-3"></v-divider>

                  <v-divider class="my-3"></v-divider>

                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>


    </div>




  </div>





</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    description: '',
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
    dawidw: {
      initials: 'DW',
      fullName: 'Dawid Wymoczylo',
      email: 'dawid.doe@doe.com',
    },
    michal: {
      initials: 'MW',
      fullName: 'Michał Wnorowski',
      email: 'test.doe@doe.com',
    },
    dawidz: {
      initials: 'DW',
      fullName: 'Dawid Zalewski',
      email: 'test.doe@doe.com',
    },

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
          alert(err.message || 'Failed to login. Check your data.');
        }
      } else {
        return true;
      }
    }
  }
}

</script>


<style lang="scss" scoped >

.usercards{
  display: flex;
}

div{
  margin: auto;
  display: block;
  text-align: center;
  align-items: center;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.form-fields {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 0.9rem;
}
input[type="text"], input[type="email"], textarea {
  border: 1px solid #ccc;
  font-size: 1rem;
  padding: 6px 10px;
  border-radius: 4px;
}
body { display: block }
button[type="submit"] {
  background-color: rgb(67 56 202);
  color: white;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-weight: 500;
}

.text-h5 {
  font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 2.7rem;
  letter-spacing: normal !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: none !important;
}
</style>
