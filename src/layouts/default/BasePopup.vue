<template>
  <div class="text-center">

    <v-dialog :modelValue="baseDialog"
              @update:modelValue="baseDialog = $event" activator="parent" width="auto">
      <v-card>
        <v-card-item><slot></slot></v-card-item>
        <v-card-actions>
          <v-btn color="primary" block @click="closePopup">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  props: ['baseDialog' ],
  emits: ['closePopup'],
  methods: {
    closePopup() {
      this.$emit('closePopup');
    }
  }
};
</script>
