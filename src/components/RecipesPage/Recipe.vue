<template>
  <v-container fluid>
    <v-card :loading="loading" class="mx-auto my-12">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

      <v-card-item>
        <v-card-title>{{ title }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ categories }} </span>
          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :model-value="reviewRate" color="amber" density="compact" half-increments readonly
            size="small"></v-rating>

          <div class="text-grey ms-4">
            {{ reviewRate }}
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Categories: • {{ categories }} •
        </div>
        <div class="my-4 text-subtitle-1 ingredients">
          Ingredients: {{ ingredients }}
        </div>
        <div class="my-4 text-subtitle-1">
          Steps: {{ steps }}
        </div>

        <div>{{ description }}</div>
        <div class="my-4 text-subtitle-1">
          <div class="review-container" v-for="(item, index) in reviews" :key="index">
            <p class="review-nickname">{{ item.reviewNick }}, Ocena : <span class="review-rate">{{ item.reviewRate }}</span>
            </p>
            <p class="review-message">{{ item.reviewMessage }}</p>
          </div>
        </div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>
      <v-form ref="myValid" class="review-form" v-if="this.reviewForm">
        <v-card-actions class="flex-column inputs-container">
          <v-text-field id="review-name" type="text" v-model="this.messageNick" label="Nick Name"
            :rules="[v => !!v || 'Nick is required']"></v-text-field>
          <v-text-field id="review-message" type="text" v-model="this.messageText" label="Write comment"
            :rules="[v => !!v || 'Comment is required']"></v-text-field>
          <!--        <v-text-field-->
          <!--          id="review-number"-->
          <!--          type="text"-->
          <!--          v-model="this.messageRate"-->
          <!--          label="Write stars"-->
          <!--          :rules="starsRules"-->

          <!--        ></v-text-field>-->
          <p class="ps-3 font-weight-bold">Choose your rating</p>
          <v-rating v-model="this.messageRate" :max="5"></v-rating>
          <p class="ps-3 error" v-if="messageRateValidation === false">Rating cannot be empty</p>
          <v-btn color="deep-purple-lighten-2" variant="text" @click="addReview">
            Add review
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-btn color="deep-purple-lighten-2" variant="text" @click="showReviewForm">{{ reviewFormBtnText }}</v-btn>
      <v-divider class="mx-4 mb-1"></v-divider>
      <v-card-actions>
        <router-link :to="`/Recipes/${id}`">
          <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
            Show more
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

export default {
  props: {
    title: String,
    categories: String,
    description: String,
    ingredients: String,
    steps: String,
    id: String,
    reviews: Array,
    reviewRate: Number
  },
  data() {
    return {
      messageNick: '',
      messageText: '',
      messageRate: null,
      messageRateValidation: true,
      reviewForm: false,
      starsRules: [value => {
        if (!value) {
          return 'You must enter a stars.';
        } else if (!/^[1-5]$/.test(value)) {
          return 'Stars must be a number between 1 and 5.'
        }
      },
      ],
    }
  },

  methods: {
    async reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
      let data = {
        title: this.title,
        categories: this.categories,
        description: this.description,
        ingredients: this.ingredients,
        steps: this.steps,
        id: this.id
      }
      this.$router.push({
        path: `/Recipes/${this.id}`,
        name: 'showRecipe',
        params: { data }
      });
    },
    showReviewForm() {
      let loginStatus = this.$store.getters['getUserLoginStatus'];
      loginStatus?this.reviewForm = !this.reviewForm:this.$router.replace('/Login');
    },
    async addReview() {

      this.dialog = false;
      this.messageRate === null ? this.messageRateValidation = false : this.messageRateValidation = true;
      const { valid } = await this.$refs.myValid.validate()
      if (valid && this.messageRateValidation) {
        let data = {
          messageNick: this.messageNick,
          messageText: this.messageText,
          messageRate: this.messageRate,
          recipeId: this.id
        }

        try {
          await this.$store.dispatch('recipeStore/addReview', data);
          this.messageNick = '';
          this.messageText = '';
          this.messageRate = '';
          this.reviewForm = !this.reviewForm;

        } catch (err) {
          this.dialog = true;
          this.errorText = err.message || 'Failed to add Review';
        }
      }
    }
  },
  computed: {
    reviewFormBtnText() {
      if (this.reviewForm) {
        return 'Hide add review form'
      } else {
        return 'Show add review form'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
input {
  border: 1px solid black;
  margin: 8px;
  padding: 10px;
}

.inputs-container {
  display: flex;
  align-items: flex-start;
}

.review-container {
  display: flex;
  flex-direction: column;
  margin: 8px 0;

  .review-nickname {
    font-size: 24px;
  }
}

.error {
  color: rgb(176, 0, 32);
  font-size: 13px;
}
</style>
