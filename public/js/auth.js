console.log("yes");

const firebaseConfig = {
  apiKey: "AIzaSyDq27DK3GNFKI7r26F4vlm2Xansix-685M",
  authDomain: "login-register-subs.firebaseapp.com",
  databaseURL: "https://login-register-subs-default-rtdb.firebaseio.com",
  projectId: "login-register-subs",
  storageBucket: "login-register-subs.appspot.com",
  messagingSenderId: "714480620553",
  appId: "1:714480620553:web:8a759789d7679588c254d8",
  measurementId: "G-8SP6DZMZFR"
};

const loginForm = document.getElementById("login-form");


firebase.initializeApp(firebaseConfig); 

const firebaseRef= firebase.database().ref("formDb");

firebaseRef.on('value', (snapshot) => {
  console.log(snapshot.val());
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
}); 







loginForm.addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  console.log("got it");

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const usernameToCheck = "anchit";
  const passwordToCheck = "https://www.gstatic.com/firebasejs/5.0.0/firebase.js";
  
  firebaseRef.orderByChild("username").equalTo(username).once("value")
    .then(snapshot => {
      const user = snapshot.val();
  
      if (!user) {
        console.log(`User with username ${username} not found.`);
      } else {
        const userKey = Object.keys(user)[0];
        if (user[userKey].password === password) {
          console.log(`User with username ${username} and password exists.`);
          window.location.href = "profile.html";
        } else {
          console.log(`User with username ${username} exists, but password is incorrect.`);
        }
      }
    })
    .catch(error => {
      console.error("Error checking credentials:", error);
    });
  
  // Sign in the user with email and password
  
  

 

 
});
