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
            <ion-list v-if="details">
              <ion-item v-if="details['Full Scientific Name']">
                <ion-label>Scientific Name : </ion-label>
                {{ details["Full Scientific Name"] }}
              </ion-item>
              <ion-item v-if="details['Common Names in India']">
                <ion-label>Common Names : </ion-label>
                {{ details["Common Names in India"] }}
              </ion-item>
            </ion-list>
            <p v-else>No details available</p>
          </ion-card-content>
        </ion-card>

        <!-- Details -->

        <!-- Medical Uses -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Medical Uses</ion-card-title>
          </ion-card-header>
          <template
            v-if="
              details && details['Medicinal Uses'] && details['Medicinal Uses'].length
            "
          >
            <ul>
              <li v-for="use in details['Medicinal Uses']" :key="use">{{ use }}</li>
            </ul>
          </template>
          <template v-else>
            <p>Lorem Ipsum</p>
          </template>
        </ion-card>

        <!-- Diseases Treated -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Diseases Treated</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <template
              v-if="
                details &&
                details['Diseases Treated'] &&
                details['Diseases Treated'].length
              "
            >
              <ul>
                <li v-for="disease in details['Diseases Treated']" :key="disease">
                  {{ disease }}
                </li>
              </ul>
            </template>
            <template v-else>
              <p>Lorem Ipsum</p>
            </template>
          </ion-card-content>
        </ion-card>

        <!-- Health Benefits -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Health Benefits</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <template
              v-if="
                details && details['Health Benefits'] && details['Health Benefits'].length
              "
            >
              <ul>
                <li v-for="benefit in details['Health Benefits']" :key="benefit">
                  {{ benefit }}
                </li>
              </ul>
            </template>
            <template v-else>
              <p>Lorem Ipsum</p>
            </template>
          </ion-card-content>
        </ion-card>

        <!-- Important Facts -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Important Facts</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <template
              v-if="
                details && details['Important Facts'] && details['Important Facts'].length
              "
            >
              <ul>
                <li v-for="fact in details['Important Facts']" :key="fact">{{ fact }}</li>
              </ul>
            </template>
            <template v-else>
              <p>Lorem Ipsum</p>
            </template>
          </ion-card-content>
        </ion-card>

        <!-- Sources -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Sources</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <template v-if="details && details['Sources'] && details['Sources'].length">
              <ul>
                <li v-for="source in details['Sources']" :key="source">
                  <a :href="source" target="_blank">{{ source }}</a>
                </li>
              </ul>
            </template>
            <template v-else>
              <p>No sources available</p>
            </template>
          </ion-card-content>
        </ion-card>
      </div>

      <div v-else>
        <ion-row class="ion-justify-content-center">
          <div class="center-content">
            <h1>Upload an image to get details</h1>
            <ion-icon :icon="warning" style="color: red; font-size: 4em"></ion-icon>
          </div>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
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
  IonItemDivider,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { leaf, call, person, warning, alert, camera } from "ionicons/icons";

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
    IonItemDivider,
  },
  setup() {
    const route = useRoute();
    const details = ref(null);
    const showDetails = ref(false);

    // Access the details from the route parameters
    onMounted(() => {
      details.value = route.params.details;
      showDetails.value = details.value !== null;

      console.log("Received route parameters:", route.params);

      if (showDetails.value) {
        console.log("Received details:", details.value);
      } else {
        console.log("No details received");
      }
    });

    return {
      details,
      showDetails,
      leaf,
      call,
      warning,
      camera,
      person,
      alert,
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
