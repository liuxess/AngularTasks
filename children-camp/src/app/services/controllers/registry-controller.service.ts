import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';


interface CampRegistryDocument {
  firstName: string,
  lastName: string,
  dateOfBirth: number,
  email: string,
  phone: string,
  grade: number,}

export interface CampRegistryDTO extends CampRegistryDocument{
  id: string,
}


const firebaseConfig = {
  apiKey: "AIzaSyDY3itvHurkcm84mErrgq5kJFfH2jpvJ04",
  authDomain: "children-s-camp.firebaseapp.com",
  databaseURL: "https://children-s-camp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "children-s-camp",
  storageBucket: "children-s-camp.appspot.com",
  messagingSenderId: "152982471517",
  appId: "1:152982471517:web:646a3a75f5c39b50951eb4",
  measurementId: "G-QJBX78ZTFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class RegistryController {
  private campRegistryCollection = collection(firestore, 'campRegistry');

  constructor() { }

  // Create a new registry entry
  async createRegistryEntry(registryData: CampRegistryDTO): Promise<void> {
    await addDoc(this.campRegistryCollection, registryData);
  }

  // Read all registry entries
  async getAllRegistryEntries(): Promise<CampRegistryDTO[]> {
    const snapshot = await getDocs(this.campRegistryCollection);
    //debugger;
    return snapshot.docs.map(doc => {
      return {...doc.data(), id: doc.id} as CampRegistryDTO
    } );
  }

  // Update an existing registry entry
  async updateRegistryEntry(registryData: CampRegistryDTO): Promise<void> {
    const registryDoc = doc(firestore, 'campRegistry', registryData.id.toString());
    await updateDoc(registryDoc, {...registryData});
  }

  // Delete a registry entry
  async deleteRegistryEntry(id: string): Promise<void> {
    const registryDoc = doc(firestore, 'campRegistry', id);
    await deleteDoc(registryDoc);
  }
}
