import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../app/jobs/thunks";
import { MapDetail, Spin } from "../components";

type JobParam = {
  id: string;
};

const JobDetailsPage = () => {
  const { id } = useParams<JobParam>();

  const dispatch = useAppDispatch();
  const job = useAppSelector((state) => state.jobs.job);
  const loading = useAppSelector((state) => state.jobs.isLoading);
  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  return (
    <div className="grid grid-cols-6 my-5">
      <div></div>
      {loading ? (
        <div className="col-span-4">
          <Spin />
        </div>
      ) : (
        <div className="col-span-4 border-2 border-indigo-400 rounded-lg">
          <div className="flex justify-between border-b-gray-400 border-b-2 p-5 w-full ">
            <h3 className="text-3xl ">{job?.title}</h3>
            <button className=" border-blue-900 max-w-md rounded-md p-2  border-2 transition ease-in duration-400 hover:bg-blue-500 hover:text-white">
              Directly Apply
            </button>
          </div>
          <div className="my-4">
            <div className="flex flex-row justify-start">
              <div
                className="rounded-full w-16 h-16 mx-4"
                style={{
                  backgroundImage: `url(${job?.user?.profilePic})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <p className="mx-4 m-auto">Posted by: {job?.user?.name}</p>
            </div>

            <div className="m-4 text-gray-600 space-y-5">
              <h5 className="text-lg my-3 text-black">Description:</h5>
              <p> {job?.description}</p>
              <p>
                <span className="text-black">Location: </span>
                {job?.location}
              </p>
              <p className={job?.paid ? "text-green-500" : "text-red-500"}>
                {job?.paid ? "Paid" : "Unpaid"}{" "}
                {job?.amount ? `$${job.amount}` : 0}
              </p>
            </div>
          </div>
          <MapDetail lat={job?.lat} lng={job?.lng} />
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
