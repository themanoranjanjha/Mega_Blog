import { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import './Home.css';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full  py-8 text-center bg-blue-300">
                <Container>
                    <div className="flex  gap-5 ">
                        <div className="p-2 w-2/4  flex flex-col">
                            <h1 className="text-3xl p-1 font-bold text-white sm:text-xl">
                            Create a blog
                            </h1>
                            <p className=' font-bold text-xl sm:text-xs md:text-xl lg:text-2xl italic text-white '>
                            Share your story with the world. Stand out with a professionally-designed blog website that can be customized to fit your brand. Build, manage, and promote your blog with Squarespace’s built-in suite of design and marketing tools. 
                            </p>
                        </div>
                        <div className="w-2/4 max-h-96   overflow-hidden ">
                            <img className="w-full  animate-scroll" src="https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/foreground-desktop-750w.jpg" alt="images" />
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
