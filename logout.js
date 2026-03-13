import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDs06guUm1JtMwlESrgaW9GiU7BG80wfNo",
  authDomain: "telemed-30991.firebaseapp.com",
  projectId: "telemed-30991"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const uid = localStorage.getItem("loggedInUserId");
  if (!uid) return;

  const snap = await getDoc(doc(db, "users", uid));
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("loggedUserFName").innerText = data.firstName;
    document.getElementById("loggedUserLName").innerText = data.lastName;
    document.getElementById("loggedUserEmail").innerText = data.email;
  }
});

document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  localStorage.removeItem("loggedInUserId");
  window.location.href = "login.html";
});
