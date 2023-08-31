<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Contact</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- Developer Details -->
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Developer Details</ion-label>
          </ion-item-divider>

          <!-- Emails -->
          <ion-item>
            <ion-icon slot="start" name="mail" color="primary"></ion-icon>
            <ion-label>pranjalkar99.work@gmail.com</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="mail" color="primary"></ion-icon>
            <ion-label>samunder268@gmail.com</ion-label>
          </ion-item>

          <!-- Name -->
          <ion-item>
            <ion-icon :icon="person" slot="start" name="person" color="primary" />
            <ion-label>rohandeep</ion-label>
          </ion-item>

          <!-- WhatsApp -->
          <ion-item>
            <ion-icon :icon="leaf" slot="start" name="call" color="secondary" />
            <ion-label>7002027146</ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { leaf,call, person } from 'ionicons/icons';

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
  data(){
    return {
      leaf,call,person
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
