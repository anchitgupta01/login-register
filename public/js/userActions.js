// userActions.js
import { firestore, database } from "./firebaseConfig";

export const getUserData = (uid) => {
  return firestore.collection("users").doc(uid).get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error("User data not found");
      }
    });
};

export const verifySubscription = (uid) => {
  return database.ref("users/" + uid).once("value")
    .then(snapshot => {
      const user = snapshot.val();
      if (user && user.subscriptionStatus === "active") {
        return true;
      } else {
        return false;
      }
    });
};
