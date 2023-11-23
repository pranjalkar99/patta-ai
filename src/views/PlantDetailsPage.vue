<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Plant Details</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="showDetails">

        <!-- Plant name -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Details</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>Scientific Name : </ion-label>
                ABCD
                <!-- <ion-badge>ABCD</ion-badge> -->
              </ion-item>
              <ion-item>
                <ion-label>Common Names : </ion-label>
                <ion-badge slot="end">xyz</ion-badge>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Details -->

        <!-- Medical Uses -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Medical Uses</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <p>Contrary to popular belief,</p>
          </ion-card-content>
        </ion-card>

        <!-- Diseases Treated -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Diseases Treated</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <p>Contrary to popular belief.</p>
          </ion-card-content>
        </ion-card>

        <!-- Health Benefits -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Health Benefits</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <p>Contrary to popular belief.</p>
          </ion-card-content>
        </ion-card>

        <!-- Important Facts -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Important Facts</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <p>Contrary to popular belief.</p>
          </ion-card-content>
        </ion-card>

      </div>

      <div v-else>
        <p>Upload image to get details</p>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { leaf, call, person } from 'ionicons/icons';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonItemGroup,
  IonItemDivider
} from '@ionic/vue';

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonItemGroup,
    IonItemDivider
  },
  data() {
    return {
      leaf, call, person
    }
  }
};
</script>
  
<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
  