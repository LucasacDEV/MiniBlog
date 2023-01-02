import React from 'react'
import styles from "./Dashboard.module.css"

import {Link} from "react-router-dom"

//hooks 

import {useAuthValue} from "../../context/AuthContext"
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
//import {useFetchDocuments} from "../.../hooks/useFetchDocuments"

const Dashboard = () => {
  const {user}= useAuthValue()
  const uid= user.uid

 const {documents: posts, loading} = useFetchDocument("posts", null, uid )
  const {deleteDocument} = useDeleteDocument("posts")
 
 


  return (
    <div className={styles.dashboard}>
     <h2>Dashboard</h2>
     <p>Gerencie seus posts</p>  
     {posts && posts.length === 0 ? (
      <div>
        <p>Nao foram entrotados posts</p>  
        <Link to="/posts/create" className='btn'>
          Criar primeiro post
        </Link>
       </div>
     ) : (
      <div className={styles.post_header}>
          <span >Titulo</span>
          <span>Ações</span>
       </div>
     )}

     {posts && posts.map((post)=> 
     <div key={post.id} className={styles.post_row}>
      <p>{post.title}</p>
      <Link to={`/posts/${post.id}`} className= "btn btn-outline">
      Ver
      </Link>
      <Link to={`/posts/edit/${post.id}`} className= "btn btn-outline">
      Editar
      </Link>
      <button onClick={()=> deleteDocument(post.id)} className= "btn btn-outline btn-btn-danger">Excluir</button>
     </div>
    )}
    </div>
  )
}

export default Dashboard