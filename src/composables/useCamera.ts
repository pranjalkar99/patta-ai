import { ref, onMounted } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const photos = ref<UserPhoto[]>([]);

const PHOTO_STORAGE = 'photos';

const savePhotoToStorage = () => {
  Preferences.set({
    key: PHOTO_STORAGE,
    value: JSON.stringify(photos.value),
  });
};

const loadSaved = async () => {
  const photoList = await Preferences.get({ key: PHOTO_STORAGE });
  photos.value = photoList.value ? JSON.parse(photoList.value) : [];
};

onMounted(loadSaved);

export const useCamera = () => {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = `${Date.now()}.jpeg`;

    photos.value = [{ filepath: fileName, webviewPath: photo.webPath }, ...photos.value];
    savePhotoToStorage();
  };

  return {
    takePhoto,
    photos,
  };
};
