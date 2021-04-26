/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyDzNmeAu-CLWrpHZ5Gm4Y7mJPDBY4ojEwg",
    authDomain: "versustrade-63646.firebaseapp.com",
    databaseURL: "https://versustrade-63646-default-rtdb.firebaseio.com",
    projectId: "versustrade-63646",
    storageBucket: "versustrade-63646.appspot.com",
    messagingSenderId: "320179652216",
    appId: "1:320179652216:web:cfacb578bb8d0c087b8f8d",
    measurementId: "G-6N5RF8TCWC"
})

const messaging = firebase.messaging()


messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message in the background message handler ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/carouselImage/amazon.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
// messaging.onMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
  
  self.addEventListener("activate",evt => {
      console.log("we are listening")
  })
  self.addEventListener("install",evt => {
      console.log("successfully installed")
  })