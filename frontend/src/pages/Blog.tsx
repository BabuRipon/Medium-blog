import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Avatar } from "../components/Avatar";
import { useNavigate } from "react-router-dom";


export const Blog = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { blog, loading} = useBlog({id: id || ""});
  
  if(loading){
    return <p>Loading...</p>
  }
  // if no blog find then redirect to blogs page;
  if(!blog){
    navigate('/blogs');
    return;
  }
  console.log(blog);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 w-full px-10 pt-12">
        <div className="col-span-9 px-10 flex flex-col items-center">
           <div className="text-3xl font-bold w-full">{blog?.title}</div>
           <div className="text-xs font-thin text-slate-500 w-full pb-4 pt-2">posted on Aug 20, 2023</div>
           <div className="w-full">{blog?.content}</div>
        </div>
        <div className="col-span-3 pl-2">
          <div className="font-thin text-sm">Author</div>
          <div className="flex pt-2">
            <div className="flex items-center">
              <Avatar name={blog ? blog.author.name : "U"}/>
            </div>
            <div className="pl-2 text-lg font-medium flex items-center">{blog?.author.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}