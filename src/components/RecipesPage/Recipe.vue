<template>
  <v-container fluid>
    <v-card
    :loading="loading"
    class="mx-auto my-12"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-item>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ categories }} dziala</span>
        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
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
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-actions>
      <router-link :to="`/Recipes/${id}`">
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="reserve"
      >
        Show more
      </v-btn>
    </router-link>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>

export default {
  props: ['title', 'categories', 'description', 'ingredients' , 'steps' , 'id'],
    data() {
      return {
      title: this.title,
      categories: this.categories,
      description: this.description,
        ingredients: this.ingredients,
        steps: this.steps


    }},
    setup(props) {
  },

    methods: {
      async reserve () {
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
        console.log(data);
        this.$router.push({
          path: `/Recipes/${this.id}`,
          name: 'showRecipe',
          params: {data}
      });
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>
