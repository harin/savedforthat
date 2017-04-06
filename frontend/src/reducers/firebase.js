import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyC-k8mlUBzhqpZ2EsTZYDt5Ifo4sbOK5Dk",
  authDomain: "savedforthat-83a18.firebaseapp.com",
  databaseURL: "https://savedforthat-83a18.firebaseio.com",
  projectId: "savedforthat-83a18",
  storageBucket: "savedforthat-83a18.appspot.com",
  messagingSenderId: "154959288927"
}

const firebaseApp = firebase.initializeApp(config)
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/plus.login')

window.fb = firebaseApp
export const providers = {
  google: googleProvider
}

const app = () => {
  return firebaseApp
}

export default app
