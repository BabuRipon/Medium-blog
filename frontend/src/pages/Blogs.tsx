import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogType, useBlogs } from "../hooks";

export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if(loading){
    return <p>loading...</p>
  }
  
  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center my-2">
        {
          blogs.map((blog: BlogType)=>(
            <BlogCard
              id={blog.id}
              content={blog.content}
              title={blog.title}
              author = {blog.author}
            />
          ))
        }
      </div>
    </div>
  )
}
