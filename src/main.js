// main.js (Vite version)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveEmail(email) {
  try {
    const docRef = await addDoc(collection(db, "email_subscribers"), {
      email,
      timestamp: serverTimestamp(),
      status: 'subscribed'
    });
    return true;
  } catch (error) {
    console.error("Error saving email:", error);
    return false;
  }
}

document.getElementById('emailForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const notification = document.getElementById('notification');
  const submitBtn = document.querySelector('.btn-primary');

  const email = emailInput.value.trim();

  if (email) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    const success = await saveEmail(email);

    notification.textContent = success
      ? "Thanks! We'll keep you updated."
      : "Sorry, there was an error. Please try again.";
    notification.style.backgroundColor = success ? '#27ae60' : '#e74c3c';
    notification.classList.add('show');

    if (success) emailInput.value = '';

    submitBtn.textContent = 'Notify Me';
    submitBtn.disabled = false;

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
});

document.getElementById('demoBtn').addEventListener('click', function (e) {
  e.preventDefault();
  alert('Demo coming soon!');
});
