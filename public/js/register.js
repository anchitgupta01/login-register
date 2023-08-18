// register.js

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

firebase.initializeApp(firebaseConfig);

const registrationForm = document.getElementById("registrationForm");

const formDb  = firebase.database().ref("formDb");

registrationForm.addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  var  username = registrationForm.querySelector('input[name="username"]').value;
  var email = registrationForm.querySelector('input[name="email"]').value;
  var  password = registrationForm.querySelector('input[name="password"]').value;
console.log("hello");
  // Register the user with email and password

  newUser(username, email, password);
});

const newUser = (username, email, password) => {
  var newform = formDb.push();
  newform.set({
    username:username,
    email:email,
    password:password
  })
}
