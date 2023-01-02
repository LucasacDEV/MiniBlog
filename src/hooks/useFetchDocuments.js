import {useState, useEffect} from "react";
import { db } from "../firebase/config";
import { doc, getDoc} from "firebase/firestore";


export const useFetchDocuments = (docCollection , id) =>{
    const [documents, setDocument] = useState(null)   
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    
    // deal with memory leak
     const [cancelled, setCancelled] = useState(false)

     useEffect(()=> {

        async function loadDocument(){
            if(cancelled) return

            

            try{
              const docRef = await doc(db, docCollection, id)  
              const docSnap = await getDoc(docRef)
                setDocument(docSnap.data())
                setLoading(false)

            }catch(error){
                console.log(error)
                setError(error.mesage)

                setLoading(true)
            }
        
        
        }
        loadDocument();


     },[docCollection,document, id])
     
     useEffect(()=>{
        return() => setCancelled(true)
     }, [])

     return {documents , loading, error}

}