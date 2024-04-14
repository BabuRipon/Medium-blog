import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const token = localStorage.getItem('medium_user_token');
  console.log(Outlet)
  return (
    token ?
    <Outlet/>:
    <Navigate to={'/signin'} />
  )
}

export default UserRoute;