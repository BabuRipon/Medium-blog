import { Link } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-8 py-2 shadow-md">
      <div className='font-semibold text-lg'>
          Medium
      </div>
      <div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full text-sm px-3 py-1 text-center mr-4">
          <Link to={'/blog/posted'}>New Blog</Link>
        </button>
        <Avatar name={"Ripon"} size="big"/>
      </div>
    </div>
  )
}