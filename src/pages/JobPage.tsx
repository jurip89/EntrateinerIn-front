import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getJobsThunk } from "../app/jobs/thunks";
import { Link } from "react-router-dom";

const JobPage = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  useEffect(() => {
    dispatch(getJobsThunk());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-6 mt-4">
      <div className=""></div>
      <div className="col-span-3 mb-6">
        {jobs.map((el) => (
          <div
            className="mb-6 border-2 border-indigo-400 p-5 rounded-lg text-gray-600"
            key={el.id}
          >
            <h3 className="text-3xl mb-2">{el.title}</h3>
            <p className="my-2">{el.description}</p>
            <p>Posted By: {el.user.name}</p>
            <div className="flex flex-row justify-between my-3 text-gray-600">
              <p className="bg-indigo-200 p-1 my-1 rounded-lg">
                {el.role.name}
              </p>
              <p className={el.paid ? "text-green-600" : `"text-red-500`}>
                {el.paid ? "Paid" : "Unpaid"}
              </p>
              <p className="oldstyle-num">
                $ {el.amount ? `${el.amount}` : "000"}
              </p>
              <p className="text-gray-600">{el.location}</p>
              
            </div>
            <Link className="text-lg text-sky-700 " to={`/jobs/${el.id}`}>
              More Details
            </Link>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default JobPage;
