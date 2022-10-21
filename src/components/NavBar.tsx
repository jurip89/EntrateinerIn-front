import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logOut } from "../app/user/slice";
const NavBar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.profile);

  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize ">
        <Link
          to="/"
          className="text-gray-800 active:border-blue-500 transition-colors duration-300 transform  border-b-2 border-transparent mx-1.5 sm:mx-6 hover:border-blue-500"
        >
          home
        </Link>

        <Link
          to="/jobs"
          className="border-b-2 border-transparent active:border-blue-500 hover:text-gray-800 transition-colors duration-300 transform hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          jobs
        </Link>

        <Link
          to="/talents"
          className="border-b-2 border-transparent active:border-blue-500 hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          talents
        </Link>

        {user && (
          <Link
            to={`/talents/${user?.id}`}
            className="border-b-2 border-transparent active:border-blue-500 hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            my Profile
          </Link>
        )}

        {user && user?.isRecruiter && (
          <Link
            to="/jobs/myjobs/recruiter"
            className="border-b-2 border-transparent active:border-blue-500 hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            My Jobs
          </Link>
        )}

        {user && !user?.isRecruiter && (
          <Link
            to="/jobs/myjobs/star"
            className="border-b-2 border-transparent hover:text-gray-800 active:border-blue-500 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            My Jobs
          </Link>
        )}
        {!token && (
          <Link
            to="/login"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors active:border-blue-500 duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Login
          </Link>
        )}
        {token && (
          <button
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
            onClick={() => dispatch(logOut())}
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
