// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAioDcfPFsv6d4UNMuRxHYj4fu9gjU5zAo",
    authDomain: "sac-captial.firebaseapp.com",
    projectId: "sac-captial",
    storageBucket: "sac-captial.appspot.com",
    messagingSenderId: "582559542428",
    appId: "1:582559542428:web:1922dbdedc2c9e79acd159",
    measurementId: "G-943EDERDXQ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
      'Sac Received background message ',
      payload
    );
    const myElement = document.getElementById("notification-number");
    let text = myElement.innerText
    var text_number = parseInt(text)+1;
    text = text_number;
    if(text == '0'){
      myElement.classList.add('d-none');
    }else{
      myElement.classList.remove('d-none');
      myElement.innerText = text;
      set_notification_number(text);
    }
    // Customize notification here
    const notificationTitle = 'Sac background Message notification';
    const notificationOptions = {
      body: 'Sac background Message.',
      icon: '/fav.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }