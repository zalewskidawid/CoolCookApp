<template>
    <div class="text-center">

        <v-dialog :modelValue="dialog"
        @update:modelValue="dialog = $event" activator="parent" width="auto">
            <v-card>
                <v-card-text>
                    {{ errorText }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
  
<script>
export default {
    props: ['errorText', 'dialog' ]

};
</script>
  
  