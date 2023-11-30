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
            <ion-scroll style="height: 100%">
              <ion-row v-for="photo in photos" :key="photo.filepath">
                <ion-col size="12">
                  <ion-card>
                    <ion-img :src="photo.webviewPath"></ion-img>
                    <ion-card-content>
                      <ion-button v-if="!photo.prediction && !photo.processing" shape="round"
                        @click="getInference(photo)">
                        Get Inference
                      </ion-button>

                      <div v-if="photo.prediction !== undefined">
                        <ion-card-title>
                          <span class="predicted-class-key">Predicted Class:</span>
                          {{ photo.prediction.predicted_class }}
                          <!-- <ion-badge color="danger">
                            {{
                              Math.max(
                                ...photo.prediction.class_probabilities[0].map(
                                 (value: number) => value * 100
                                )
                              ).toFixed(2)
                            }}%
                          </ion-badge> -->

                        </ion-card-title>
                        <!-- <ion-button @click="goToDetailsPage">Show Details</ion-button> -->
                        <!-- Loading Spinner -->
                        <!-- <ion-spinner v-if="photo.processing" color="success"></ion-spinner>
                      <ion-button expand="block" @click="() => setOpen(true)">Open</ion-button>

                      
                        <ion-item v-if="photo.prediction.details && photo.showDetails">
                          <ion-label>Details:</ion-label>
                          <ion-text>
                            <pre>{{
                              JSON.stringify(photo.prediction.details, null, 2)
                            }}</pre>
                          </ion-text>
                        </ion-item> -->

                        <!-- <ion-button @click="handleDetailsClick(photo)">
                          {{ photo.showDetails ? "Hide Details" : "Show Details" }}
                        </ion-button> -->
                      </div>

                      <ion-button v-if="photo.prediction" @click="() => setOpen(true)">
                        Show Details

                        <ion-content class="ion-padding">
                          <ion-modal :is-open="isOpen">
                            <ion-header>
                              <ion-toolbar>
                                <ion-title>Modal</ion-title>
                                <ion-buttons slot="end">
                                  <ion-button @click="setOpen(false)">Close</ion-button>
                                </ion-buttons>
                              </ion-toolbar>
                            </ion-header>
                            <ion-content class="ion-padding">
                              <p>
                                {{ photo.prediction.predicted_class }}
                              </p>
                              <p v-if="photo.details">
  <!-- Parse the JSON string into an object -->
  <strong>Plant Name:</strong> {{ photo.details[0]['Plant Name'] }}<br>
  <strong>Full Scientific Name:</strong> {{ photo.details[0]['Full Scientific Name'] }}<br>
  <strong>Common Names in India:</strong> {{ photo.details[0]['Common Names in India'] }}<br>

  <strong>Medicinal Uses:</strong>
  <ul>
    <li v-for="use in photo.details[0]['Medicinal Uses']">{{ use }}</li>
  </ul>

  <strong>Diseases Treated:</strong>
  <ul>
    <li v-for="disease in photo.details[0]['Diseases Treated']">{{ disease }}</li>
  </ul>

  <!-- Repeat a similar pattern for other sections -->

  <strong>Sources:</strong>
  <ul>
    <li v-for="source in photo.details[0]['Sources']">
      <a :href="source">{{ source }}</a>
    </li>
  </ul>
</p>

                            </ion-content>
                          </ion-modal>
                        </ion-content>
                      </ion-button>

                      <ion-select v-if="!photo.prediction && !photo.processing" placeholder="Select Option"
                        @ionChange="handleDropdownChange">
                        <ion-select-option value="option1">Model-1(PlantVillage Dataset){default}</ion-select-option>
                        <ion-select-option value="option2">Model-2(Own 27 classes Dataset)</ion-select-option>
                        <ion-select-option value="option3">Model-3(Plant Leaf dataset)</ion-select-option>
                        <ion-select-option value="option4">Model-4(Merged Plant dataset{25 classes})</ion-select-option>
                        <!-- Add more options as needed -->
                      </ion-select>
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
import axios from "axios";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonButtons,
  IonButton,
  IonModal,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,

} from "@ionic/vue";
import { ref } from "vue";
import { camera } from "ionicons/icons";
import { useCamera } from "@/composables/useCamera";
import { useRouter } from "vue-router";

const BACKEND_URL = ref("https://pranjalkar9-patta-ai.hf.space/predict/");




const selectedOption = ref("option1"); // Add this line to store the selected option
const details = ref(null);





export default {
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonButtons,
    IonButton,
    IonModal,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption
  },
  methods: {
    goToDetailsPage() {
      // Navigate to the details page
      this.$router.push({
        name: "plant",
        params: { details: JSON.parse(details.value) },
      });
    },
  },
  setup() {
    const { takePhoto, photos } = useCamera();
    const isOpen = ref(false);
    const setOpen = (open) => {
      console.log("Setting isOpen to:", open);
      isOpen.value = open;
    };

    const handleDropdownChange = (event) => {
      selectedOption.value = event.detail.value; // Update the selected option
      updateBackendUrl(); // Call the function to update the backend URL
    };
    // const handleDetailsClick = (photo) => {
    //   // Toggle the details visibility for the selected photo
    //   photo.showDetails = !photo.showDetails;
    // };

    // // ... (previous return values) ...
    // return {
    //   // ... (previous return values) ...
    //   handleDetailsClick,
    // };

    const updateBackendUrl = () => {
      switch (selectedOption.value) {
        case "option1":
          BACKEND_URL.value = "https://pranjalkar9-patta-ai.hf.space/predict/";
          break;
        case "option2":
          BACKEND_URL.value =
            "https://pranjalkar9-patta-ai.hf.space/predict-self-dataset-27/";
          break;
        case "option3":
          BACKEND_URL.value = "https://pranjalkar9-patta-ai.hf.space/predict-plant-dataset-22/";
          break;
        case "option4":
          BACKEND_URL.value = "https://pranjalkar9-patta-ai.hf.space/predict-demo/";
          break;
        // Add more cases if needed
      }
    };

    const getInference = async (photo) => {
      try {
        photo.processing = true;
        updateBackendUrl(); // Call the function to update the backend URL
        console.log("We are now calling this URL:", BACKEND_URL.value);

        // Convert the blob URL to a blob
        const response = await fetch(photo.webviewPath);
        const blob = await response.blob();

        // Create a FormData object and append the blob
        const formData = new FormData();
        formData.append("file", blob, photo.filepath);

        // Make the POST request
        const axiosResponse = await axios.post(BACKEND_URL.value, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        });

        console.log(axiosResponse.data);

        if (axiosResponse.data.details) {
          // Navigate to the details page
          console.log("go to /plant");
          // Use Vue Router to navigate
          details.value = axiosResponse.data.details;
          // router.push({ name: "plant", params: { details } });
        }

        console.log("This is now the details:", details.value);
        photo.prediction = axiosResponse.data;
        photo.processing = false;
        if (axiosResponse.data.details) {
          photo.details = JSON.parse(axiosResponse.data.details);
          console.log("this is inside photo.details:",photo.details);
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
      BACKEND_URL,
      handleDropdownChange,
      isOpen,
      setOpen,
    };
  },
};
</script>
