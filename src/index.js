import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOKSxkAuBuUFWbt6fsSXE6I6R6CXeWBN4",
  authDomain: "exactspace-chat-app.firebaseapp.com",
  projectId: "exactspace-chat-app",
  storageBucket: "exactspace-chat-app.appspot.com",
  messagingSenderId: "338330033013",
  appId: "1:338330033013:web:9b93b556a5ffac4637113c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

