import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyALReP5xajo4_xVJciNa1VdCKicVMD_ino",
  authDomain: "dendalion-crud.firebaseapp.com",
  projectId: "dendalion-crud",
  storageBucket: "dendalion-crud.appspot.com",
  messagingSenderId: "343865287053",
  appId: "1:343865287053:web:8ea40d55f2d75006171dc4"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);