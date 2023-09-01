<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>PlantVillage Dataset</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
  
        <!-- Dataset Description -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Description</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            The PlantVillage dataset consists of 54303 healthy and unhealthy leaf images divided into 38 categories by species and disease.
            <p>Note: The original dataset is not available from the original source (plantvillage.org), therefore we get the unaugmented dataset from a paper that used that dataset and republished it. Moreover, we dropped images with Background_without_leaves label, because these were not present in the original dataset.</p>
            <p><strong>Original paper URL:</strong> <a href="https://arxiv.org/abs/1511.08060">https://arxiv.org/abs/1511.08060</a></p>
            <p><strong>Dataset URL:</strong> <a href="https://data.mendeley.com/datasets/tywbtsjrjv/1">https://data.mendeley.com/datasets/tywbtsjrjv/1</a></p>
          </ion-card-content>
        </ion-card>
  
        <!-- Dataset Details -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Details</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>Download Size</ion-label>
                <ion-badge slot="end">827.82 MiB</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Dataset Size</ion-label>
                <ion-badge slot="end">815.37 MiB</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Auto-cached</ion-label>
                <ion-badge slot="end">No</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Split</ion-label>
                <ion-badge slot="end">54,303</ion-badge>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
  
        <!-- Feature Structure -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Feature Structure</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            FeaturesDict({
              'image': Image(shape=(None, None, 3), dtype=uint8),
              'image/filename': Text(shape=(), dtype=string),
              'label': ClassLabel(shape=(), dtype=int64, num_classes=38),
            })
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Dataset Image</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-img src="https://storage.googleapis.com/tfds-data/visualization/fig/plant_village-1.0.2.png" alt="PlantVillage Dataset Image"></ion-img>
            </ion-card-content>
        </ion-card>
        
  
      </ion-content>
    </ion-page>
  </template>
  
  <style scoped>
    /* You can add custom styles here */
  </style>
  