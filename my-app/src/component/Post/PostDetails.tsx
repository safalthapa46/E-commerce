import React, { useEffect, useState } from 'react'
import { Ipost } from '../../interface/post';
interface props {
    id:number
}
const PostDetails = ({id}:props) => {
    const [post, setPost]=useState<Ipost>();

    useEffect(()=>{
        const postDetail=async ()=>{
            try{
                const res= await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                const post1=await res.json();
                console.log(post1)
                setPost(post1);
            }catch(err:any){
                console.log(err)
            }
        }
        postDetail();
    },[id])
  return (
    <div className="border p-5 rounded-lg space-y-5 max-w-screen-xl mx-auto">
    <div className="flex items-center justify-center">
    </div>
    <div className="border-t mt-2">
        <p className="font-bold capitalize">{post?.userId}</p>
        <p className="line-clamp-1 ">{post?.title}</p>
        <p className="">{post?.body}</p>
    </div>
    <div>

    </div>
</div>
  )
}

export default PostDetails
