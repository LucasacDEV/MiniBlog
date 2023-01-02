import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Search.module.css"

//hooks
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useQuery } from '../../hooks/useQuery'

// components

import PostsDetail from '../../components/PostsDetail'


const Search = () => {
    const query = useQuery()
    const search = query.get("q")
    const {documents : posts} = useFetchDocument("posts", search)



  return (
    <div className={styles.search_container}>
       <h2>Search</h2>
       <div>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts atraves da sua busca!</p>
                    <Link to="/" className= "btn btn-dark">
                        Voltar
                    </Link>
               </div>
            )}
            {posts && posts.map((post) => 
                <PostsDetail key={post.id} post={post} />)}
            

        </div>  
    </div>
  )
}

export default Search