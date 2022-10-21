import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return <section
  className="relative bg-[url(https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)] bg-cover bg-center bg-no-repeat"
>
  <div
    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/50 sm:to-white/25"
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center sm:text-left">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Your next experience

        <strong className="block font-extrabold text-indigo-600">
          in the entrateinment industry.
        </strong>
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
        Find here the perfect job for you or the best talents
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <Link
          to="/talents"
          className="block w-full rounded bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white px-12 py-3 text-sm font-medium   sm:w-auto"
        >
          Browse for Talents
        </Link>

        <Link
            to='/jobs'
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto"
        >
          Brose for Jobs
        </Link>
      </div>
    </div>
  </div>
</section>
};

export default HomePage;
