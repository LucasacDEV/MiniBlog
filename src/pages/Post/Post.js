import styles from "./Post.module.css"

import {useParams} from "react-router-dom"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Post = () => {

    const { id} = useParams();
    const {documents: post , loading} = useFetchDocuments('posts' , id)
  return (
    <div className={styles.post_container}>
        {loading && <p>carregando o post ...</p>}
        {post && (
          <div className={styles.Post}>
            <h1>{post.title} </h1>
            <img  src={post.image} alt={post.title}/>
            <p>{post.body}</p>
            <h3>Este post trata sobre:</h3>
            {post.tagsArray.map((tag) => (
                <p key={tag}> <span>#</span> {tag}</p>
            ))}
          </div>
        )}

    </div>
  )
}

export default Post