import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../app/hooks";
import { signUp } from "../app/user/thunks";


 const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const token = useAppSelector(state=>state.auth.token)

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp({name, email, password}));
  };

  return (
   <div className="w-full h-screen font-sans bg-cover bg-[url(https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2656&q=80)]">
    <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
            <div className="leading-loose">
                <form className="max-w-sm p-10 m-auto bg-white bg-opacity-25 rounded shadow-xl" onSubmit={submitForm}>
                    <p className="mb-8 text-2xl font-light text-center text-white">
                        Sign Up
                    </p>
                    <div className="mb-2">
                        <div className=" relative ">
                            <input type="email" id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"
                             value={name}
            onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                    <div className="mb-2">
                        <div className=" relative ">
                            <input type="email" id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"
                             value={email}
            onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className=" relative ">
                                <input type="password" id="login-with-bg-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="password"
                                value={password}
            onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Create
                                </button>
                            </div>
                            <div className="text-center">
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
 };

 export default SignUp
