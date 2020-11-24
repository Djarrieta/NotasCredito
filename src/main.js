import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/tailwind.css"

import  firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBt6I9Eksn15hNQS5bQU0Uj96DmFzD3vpA",
  authDomain: "notas-credito.firebaseapp.com",
  databaseURL: "https://notas-credito.firebaseio.com",
  projectId: "notas-credito",
  storageBucket: "notas-credito.appspot.com",
  messagingSenderId: "118191727473",
  appId: "1:118191727473:web:f1fedb2c1e7a75c2514cd0"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false

export { db, firebaseApp};