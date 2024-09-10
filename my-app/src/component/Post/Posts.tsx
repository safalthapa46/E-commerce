import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
interface Ipost{
    userId:number,
    id:number,
    title:string,
    body:string
}
const Posts = () => {
    const [post, setPost]= useState<Ipost[]>([]);

    useEffect (()=>{
        const getPost= async ()=>{
            try{
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const post1 = await res.json()
                setPost(post1)
            }catch (error:any){
                console.log(error)
            }
        }
        getPost();
    },[])
    console.log(post)
  return (
    <div className='grid grid-cols-4 gap-10 p-10'>
    {
        post.map((post) => (
            <div key={post.id} className="border p-5 rounded-lg space-y-5">
                <div className="flex items-center justify-center">
                </div>
                <div className="border-t mt-2">
                    <p className="font-bold capitalize">{post.userId}</p>
                    <p className="line-clamp-1">{post.title}</p>
                    <p className="line-clamp-2">{post.body}</p>
                </div>
                <div>
                    <Link className="bg-red-500 text-white px-4 py-2 rounded-lg " to={`/post/${post.id}`}>
                        View Details
                    </Link>
                </div>
            </div>
        ))
    }
</div>
  )
}

export default Posts
