import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import { 
  getAuth, 
  onAuthStateChanged, 
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ✅ USE YOUR NEW PROJECT ONLY
const firebaseConfig = {
  apiKey: "AIzaSyCiEvlgpEHo2YG-swUgsQzUM3RwYXXM8Jo",
  authDomain: "farmio-30e87.firebaseapp.com",
  projectId: "farmio-30e87",
  storageBucket: "farmio-30e87.appspot.com"
  messagingSenderId: "619990775055",
  appId: "1:619990775055:web:e3a1e661e8e696cd4c7a7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ KEEP USER LOGGED IN
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Persistence enabled"))
  .catch((error) => console.error(error));

// ✅ CHECK LOGIN STATE
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      const data = snap.data();

      document.getElementById("loggedUserFName").innerText = data.firstName || "";
      document.getElementById("loggedUserLName").innerText = data.lastName || "";
      document.getElementById("loggedUserEmail").innerText = data.email || "";
    }

  } catch (error) {
    console.error(error);
  }
});

// ✅ LOGOUT FUNCTION
window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
