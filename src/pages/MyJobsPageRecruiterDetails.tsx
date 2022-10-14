import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMyJobDetailRecruiter } from "../app/jobs/thunks";
import { Spin, MapDetail } from "../components";
const MyJobsPageRecruiterDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const loading = useAppSelector((state) => state.jobs.isLoading);
  useEffect(() => {
    dispatch(getMyJobDetailRecruiter(id));
  }, [dispatch, id]);

  const job = useAppSelector((state) => state.jobs.job);
  console.log(job);
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
          {job?.applicantsJob?.map((el) => (
            <div key={el.id}>
              <Link to={`/talents/${el.id}`}>
                <div className="w-20 h-20 rounded-full" />
                <h3>{el.name}</h3>
                <div
                  className="rounded-full w-16 h-16 mx-4"
                  style={{
                    backgroundImage: `url(${el?.profilePic})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <p>{el.applicants.status}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsPageRecruiterDetails;
