import { useNavigate } from 'react-router-dom';
import { Avatar } from "./Avatar"
import { Dot } from "./Dot"
import { BlogType } from '../hooks';

export const BlogCard = ({id, content, title, author}: BlogType) => {
  const navigate = useNavigate();
  return (
    <div className="border-b w-4/6 px-1 py-2 mb-2 cursor-pointer hover:shadow-xl hover:shadow-slate-400  hover:transition-transform hover:scale-110" key={id} onClick={()=>{
      navigate(`/blog/${id}`)
    }}>
        <div className="flex items-center">
          <div className="pl-0.5">
            <Avatar name={author.name} size="small"/>
          </div>
          <div className="pl-2 text-lg font-medium">{author.name}</div>
          <div className="pl-1 flex items-center pt-1"><Dot /></div>
          <div className="pl-1 text-lg text-slate-500 font-thin">{'Feb 22, 2022'}</div>
        </div>
        <div className="font-bold text-3xl">{title}</div>
        <div>{`${content.substring(0,200)}...`}</div>
        <div className="pt-2 text-sm text-slate-500 font-thin">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
    </div>
  )
}