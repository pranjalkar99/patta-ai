<template>
  <ion-modal>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Details</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre>{{ details }}</pre>
        </ion-card-content>
      </ion-card>
      <ion-button @click="closeModal">Close</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      // Emit an event to close the modal
      this.$emit("closeModal");
    },
  },
};
</script>
