<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Use Camera for Patta.AI</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-grid>
          <ion-row>
            <ion-col size="12" :key="photo.filepath" v-for="photo in photos">
              <ion-card>
                <ion-img :src="photo.webviewPath" @click="showProgress(photo)"></ion-img>
                <div class="example-content">
                  <ion-card-content>
                  <ion-button v-if="!photo.processing" shape="round" @click="sendPhotoToServer(photo)">
                    Run Inference 
                  </ion-button>
                  <ion-spinner v-if="photo.processing" color="success"></ion-spinner>
                  <div v-if="photo.prediction">
                  <p><strong>Predicted Class:</strong> {{ photo.prediction.predicted_class }}</p>
                  <p><strong>Class Probabilities:</strong></p>
                  <ul>
                    <li v-for="(probability, index) in photo.prediction.class_probabilities[0]" :key="index">
                      Class {{ index }}: {{ probability }}
                    </li>
                  </ul>
                </div>
                  <ion-select v-if="photo.details" :value="photo.selectedDetail" @ionChange="selectDetail(photo)">
                    <ion-select-option v-for="detail in photo.details" :key="detail.id" :disabled="photo.processing" :value="detail.id" class="center-button">{{ detail.name }}</ion-select-option>
                  </ion-select>
                </ion-card-content>
                </div>
                
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
    <ion-content>
      <div class="example-content">
       
        <!-- Add a button to trigger the camera -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="takePhoto">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </ion-content>
  </ion-page>
</template>
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
  IonSpinner,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import { ref, reactive } from 'vue';
import { camera } from 'ionicons/icons';
import { useCamera, UserPhoto } from '@/composables/useCamera';
import { Filesystem, Directory } from '@capacitor/filesystem';

const BASE_URL = 'http://localhost:8000/predict/'; 


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
    IonSpinner,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const { takePhoto, photos } = useCamera();
    photos.value = photos.value.map(photo => reactive(photo));

    const base64ToBlob = (base64: string, mimeType: string) => {
  // Debugging: log the base64 string
  console.log(base64);

  // Ensure there are no spaces or line breaks
  const cleanedBase64 = base64.replace(/\s/g, '');

  // Decode the cleaned string
  const bytes = atob(cleanedBase64);
  const arrayBuffer = new ArrayBuffer(bytes.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < bytes.length; i++) {
    uint8Array[i] = bytes.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mimeType });
};



    const showProgress = (photo: UserPhoto) => {
      // Handle showing progress here, e.g., navigate to a progress page
      console.log(`Showing progress for photo: ${photo.filepath}`);
    };
    

   

    
    const sendPhotoToServer = async (photo: UserPhoto) => {
      photo.processing = true; 
      const base64Data = photo.webviewPath.split(',')[1];
      const blobData = base64ToBlob(base64Data, 'image/jpeg');

      const formData = new FormData();
      formData.append('file', blobData, photo.filepath);

      try {
        const response = await axios.post(BASE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        });

        photo.prediction = response.data;
        photo.processing = false; 
      } catch (error) {
        console.error("Error sending photo:", error);
        photo.processing = false;
      }
    };

const savePicture = async (photo, fileName) => {
  const base64Data = photo.webviewPath.split(',')[1]; // Extract base64 data from the webviewPath

  try {
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filepath: savedFile.uri,
      webviewPath: photo.webviewPath,
    };
  } catch (error) {
    console.error('Error saving picture:', error);
    throw error; // You may want to handle this error more gracefully
  }
};


    const selectDetail = (photo: UserPhoto) => {
      // Handle selecting a detail here
      console.log(`Selected detail for photo: ${photo.filepath}`, photo.selectedDetail);
    };

    return {
      camera,
      takePhoto,
      photos,
      showProgress,
      sendPhotoToServer,
      selectDetail,
    };
  },
};
</script>

<!-- <script lang="ts">
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
  IonSpinner,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
// import { ref } from 'vue';
import { ref, onMounted, watch } from 'vue';
import { camera } from 'ionicons/icons';
import { useCamera, UserPhoto } from '@/composables/useCamera';

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
    IonSpinner,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const { takePhoto, photos } = useCamera();

    const showProgress = (photo) => {
      // Handle showing progress here, e.g., navigate to a progress page
      console.log(`Showing progress for photo: ${photo.filepath}`);
    };

    const processPhoto = async (photo) => {
      // Simulate processing with a timeout (replace with actual processing logic)
      photo.processing = true;

      // Create a FormData object to send the image as multipart/form-data
      const formData = new FormData();
      formData.append('file', photo.webviewPath, 'test_pata.jpeg');

      try {
        // Make the POST request using Axios
        const response = await axios.post('http://localhost:8000/predict/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
          },
        });

        // Handle the response here, e.g., update the UI with the results
        console.log('Response:', response.data);

        // Simulate receiving details after processing
        photo.details = [
          { id: 1, name: 'Detail 1' },
          { id: 2, name: 'Detail 2' },
          { id: 3, name: 'Detail 3' },
        ];
        photo.selectedDetail = null; // Clear the selected detail
        photo.processing = false;
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here, e.g., show an error message to the user
        photo.processing = false; // Ensure processing is stopped
      }
    };

    const selectDetail = (photo) => {
      // Handle selecting a detail here
      console.log(`Selected detail for photo: ${photo.filepath}`, photo.selectedDetail);
    };

    return {
      camera,
      takePhoto,
      photos,
      showProgress,
      processPhoto,
      selectDetail,
    };
  },
};
</script> -->

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
