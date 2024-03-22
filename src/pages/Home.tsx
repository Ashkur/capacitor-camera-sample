import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './Home.css'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

const Home: React.FC = () => {
  const onGetPhoto = async () => {
    try {
      const photoResult = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      })

      console.log(photoResult)
    } catch (error) {
      console.log(error) // no logs are printed
    }
  }

  const OpenCamera = async () => {
    try {
      const { camera: cameraPermission } = await Camera.checkPermissions()

      if (cameraPermission === 'granted') {
        onGetPhoto()
      } else {
        const { camera: NewCameraPermission } = await Camera.requestPermissions(
          { permissions: ['camera'] }
        )

        if (NewCameraPermission === 'granted') {
          onGetPhoto()
        }
      }
    } catch (error) {
      console.log(error) // no logs are printed
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CAMERA SAMPLE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={OpenCamera}>
          <IonText>OPEN CAMERA</IonText>
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Home
