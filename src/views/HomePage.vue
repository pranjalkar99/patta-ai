<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Use Camera</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-scroll style="height: 100%;">
              <ion-row v-for="photo in photos" :key="photo.filepath">
                <ion-col size="12">
                  <ion-card>
                    <ion-img :src="photo.webviewPath" @click="showProgress(photo)"></ion-img>
                    <ion-card-content>
                      <ion-button v-if="!photo.prediction && !photo.processing" shape="round" @click="getInference(photo)">
                        Get Inference
                      </ion-button>
                      
                      <!-- Loading Spinner -->
                      <ion-spinner v-if="photo.processing" color="success"></ion-spinner>
                      
                      <div v-if="photo.prediction">
                        <ion-card-title>
                          <span class="predicted-class-key">Predicted Class:</span> 
                          {{ photo.prediction.predicted_class }}
                          <ion-badge color="danger">
                            {{ (Math.max(...photo.prediction.class_probabilities[0].map(value => value * 100))).toFixed(2) }}%

                          </ion-badge>
                        </ion-card-title>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-scroll>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    
    <ion-footer>
      <div class="example-content">
        <!-- Add a button to trigger the camera -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="takePhoto">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </ion-footer>
  </ion-page>
</template>

<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .predicted-class-key {
    font-weight: bold;
    font-size: 1.2em;
    text-decoration: underline;
  }
</style>


<script lang="ts">
import axios from 'axios';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/vue';
import { ref } from 'vue';
import { camera } from 'ionicons/icons';
import { useCamera } from '@/composables/useCamera';

const BACKEND_URL = 'https://pranjalkar9-patta-ai.hf.space/predict/';

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    IonCard,
    IonCardContent,
  },
  setup() {
    const { takePhoto, photos } = useCamera();
    function base64ToBlob(base64: string): Blob {
     
    const binaryString = window.atob(base64.split(',')[1]);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], {type: 'image/jpeg'});
}


const getInference = async (photo: UserPhoto) => {
  try {
    photo.processing = true;
    // Fetch the blob from the blob URL
    const response = await fetch(photo.webviewPath);
    const blob = await response.blob();

    // Convert the blob to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async function() {
      const base64data = reader.result as string;
      const base64Content = base64data.split(',')[1];

      const formData = new FormData();
      formData.append('file', blob, photo.filepath);

      // Make the POST request
      const response = await axios.post('https://pranjalkar9-patta-ai.hf.space/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      });
      console.log(response.data)

      photo.prediction = response.data;
      photo.processing = false;
    }
  } catch (error) {
    console.error("Error sending photo:", error);
    photo.processing = false;
  }
};



    return {
      camera,
      takePhoto,
      photos,
      getInference,
    };
  },
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
