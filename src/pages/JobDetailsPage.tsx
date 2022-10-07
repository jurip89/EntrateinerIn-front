import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../app/jobs/thunks";
import {Map} from '../components'

type JobParam = {
  id: string;
};

const JobDetailsPage = () => {
  const { id } = useParams<JobParam>();
  console.log(typeof id);
  const dispatch = useAppDispatch();
  const job = useAppSelector((state) => state.jobs.job);
  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);
  console.log(job);
  return (
    <div className="grid grid-cols-6 my-5">
      <div></div>
      <div className="col-span-3 border-2 border-indigo-400 rounded-lg">
        <div className="flex justify-between border-b-gray-400 border-b-2 p-5 w-full ">
          <h3 className="text-3xl ">{job?.title}</h3>
          <button className=" border-blue-900 max-w-md rounded-md p-2  border-2 transition ease-in duration-400 hover:bg-blue-500 hover:text-white">
            Directly Apply
          </button>
        </div>
        <div className="my-4">
          <h5 className="text-lg my-3 mx-2">Description:</h5>
          <div className="m-4 text-gray-800 space-y-5">
            <p> {job?.description}</p>
            <p>
              <span className="text-black">Location: </span>
              {job?.location}
            </p>
          </div>
              </div>
              <Map lat={job?.lat } lng={job?.lng} />
      </div>
    </div>
  );
};

export default JobDetailsPage;
