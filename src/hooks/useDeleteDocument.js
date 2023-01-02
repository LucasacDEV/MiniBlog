import {useState , useEffect , useReducer } from "react";
import {db} from "../firebase/config"
import {doc, deleteDoc} from "firebase/firestore"


const initialState= {
    loading: null ,
    error: null
}

const deleteReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return{loading: true , error: null}
        case "DELETE":
            return{loading: false , error: null}
        case "ERROR":
            return{loading: false , error: action.payload}
        default:
        return state;
        
    }
}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState)

    // deal with memory leak

    const [cancelled, setCancelled] = useState(false)
    const checkCancelBeforeDispactch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument = async(id)=> {

    try{
        const deleteDocument = await deleteDoc(doc(db,docCollection, id))
        
        checkCancelBeforeDispactch({
            type: "DELETED_DOC",
            payload: deleteDocument,
        })
       
       

    }catch(error){
        checkCancelBeforeDispactch({
            type: "ERROR",
            payload:    error.mensage,
        })

    }

}

useEffect(()=>{
    return() => setCancelled(true)
},[])

return { deleteDocument, response}
}