import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"
import { useState, useEffect } from "react"


function AllPost() {
     const [posts, setPosts] = useState([])
     useEffect(() => {},[])

        appwriteService.getPosts([]).then((posts) => {
           if (posts) {
            setPosts(posts.documents)
           }
         }     
        )

  return (
    <div className='w-full py-8 bg-blue-300'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2  w-1/4 sm:w-full md:w-2/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
        </Container>
    </div>
  )
}

export default AllPost