<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { initializeApp } from "firebase/app";
import { getMessaging, getToken,onMessage } from "firebase/messaging";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAioDcfPFsv6d4UNMuRxHYj4fu9gjU5zAo",
  authDomain: "sac-captial.firebaseapp.com",
  projectId: "sac-captial",
  storageBucket: "sac-captial.appspot.com",
  messagingSenderId: "582559542428",
  appId: "1:582559542428:web:1922dbdedc2c9e79acd159",
  measurementId: "G-943EDERDXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);



const messaging = getMessaging();
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
// Add the public key generated from the console here.
//const firebase_token = getToken(messaging, {vapidKey: "BLnp1baFiSaftBRufKXO3jLuNLhq4LA4bIryrGAE6gr5W2EmuW1xsW4rhG8TgCFqn6MJf_L_rH71TiPcGS37pyA"});

export default {
  name: 'App',
  created() {
  console.log(app);
  var loginstatus = this.checkloginstatus();
  if(loginstatus){
    
  getToken(messaging, { vapidKey: "BLnp1baFiSaftBRufKXO3jLuNLhq4LA4bIryrGAE6gr5W2EmuW1xsW4rhG8TgCFqn6MJf_L_rH71TiPcGS37pyA" }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    if(this.getkeyexistsession('pushtoken_value') == null){
    sessionStorage.setItem('pushtoken', true);
    sessionStorage.setItem('pushtoken_value', currentToken);
    // ...
    //call push api
    var postdata = {
      platformId:3,
      pushRegId:currentToken,
      imei:null
    };
    this.globalpostauth('notification/user/push/device',postdata).then((result) =>{
            const responsedata = result.data;
			console.log(responsedata);
             
        }).catch((error) => {
					if (error.response) {
						//do something					
					}
					else if (error.request) {
						//do something else						
					} else if (error.message) {
						//do something other than the other two
					}
				});
  }
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
}
}
}

</script>

<style>
@import './assets/css/style.css';
@import './assets/css/responsive.css';

</style>
