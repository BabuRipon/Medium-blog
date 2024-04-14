import { Link } from 'react-router-dom';

export const AuthTitle = ({type}:{type:'signin'|'signup'}) => {
  return (
    <div className='px-10'>
      <div className='text-2xl font-bold'>Create an account</div>
      {
        type === 'signup' ? 
        <div className='text-slate-400 text-sm'>
        Already have an account?
          <Link className='underline pl-1' to="/signin">Login</Link>
        </div> :
        <div className='text-slate-400 text-sm'>
        Don't have an account?
        <Link className='underline pl-1' to="/signup">account</Link>
      </div>
      }
    </div>
  )
}