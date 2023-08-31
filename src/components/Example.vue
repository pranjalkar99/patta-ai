<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="camera" />
            <ion-label>Use Camera for Patta.AI</ion-label>
          </ion-tab-button>

          
        
  
          <ion-tab-button tab="Contact Developer" href="/developer">
            <ion-icon :icon="settings" />
            <ion-label>Contact Developer</ion-label>
          </ion-tab-button>
  
  
          
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script lang="ts">
    import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
  
    import { playCircle, camera, library, search,leaf,settings } from 'ionicons/icons';
  
    export default {
      components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
      data() {
        return {
          playCircle,
          camera,
          library,
          search,
          leaf,
          settings
        };
      },
    };
  </script>