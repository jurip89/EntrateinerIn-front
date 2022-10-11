import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { logOut } from "../app/user/slice";
const NavBar = () => {
  const dispatch = useAppDispatch();
  const token =useAppSelector(state=>state.auth.token)
  return (
    <div className="w-full bg-indigo-400 p-2.5 flex flex-row">
      <div className="basis-1/4">
        <Link to='/'><h2 className="text-3xl font-mono text-white font-bold">
          Entratein<span className="font-thin">In</span>
        </h2></Link>
      </div>

      <div className="flex flex-row basis-3/4 justify-around text-white">
        <Link to='/jobs'>Jobs</Link>
        <Link to='/talents'>Talents</Link>
        <Link to='/login'>Login</Link>
        <Link to='/login'>Login</Link>
        {!token && <Link to='/login'>Login</Link>}
        {token&&<button onClick={()=>dispatch(logOut())}>LogOut</button>}
      </div>
    </div>
  );
};

export default NavBar;
